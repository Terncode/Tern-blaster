import { Howl, Howler, HowlOptions } from 'howler';
import { clamp, debounce } from 'lodash';
import { AudioPoint, Point } from './interfaces';
import { lastSplit, removeItem } from './utils';

interface Audio {
    audioId: number;
    volume: number;

    debug?: {
        name: string;
        additionalInfo?: string;
    };
}

export enum AudioType {
    Static,
    Position,
    Entity,
    Observable,
}

interface StaticAudioLocation extends Audio {
    type: AudioType.Static;
}
interface PositionAudioLocation extends Audio {
    type: AudioType.Position;
    audioPoint: AudioPoint;
}
interface EntityAudioLocation extends Audio {
    type: AudioType.Entity;
    entityId: number;
}

type AudioLocation = StaticAudioLocation | PositionAudioLocation | EntityAudioLocation;

export class SpritePlayer {
    private debug = false;
    private _init = false;
    private _volume = 0.25;
    private playing: AudioLocation[] = [];
    private entityAudio: EntityAudioLocation[] = [];
    private posAudio: PositionAudioLocation[] = [];

    private howl?: Howl;
    private audioReverseMap = new Map<number, string>();
    constructor(private listener: Point, private spritesFile: string[], private howlerOptions: HowlOptions['sprite']) {}
    init() {
        const formats = this.spritesFile.map(e => lastSplit(e, '.'));

        // Load supported format
        for (let i = 0; i < formats.length; i++) {
            if (formats[i][1] && Howler.codecs(formats[i][1])) {
                this.load(`${formats[i][0]}.${formats[i][1]}`, formats[i][1]);
                return;
            }
        }

        const noExtensionFallback = formats.find(e => !e[1]);
        if (noExtensionFallback) {
            this.load(noExtensionFallback[0]);
            return;
        }

        throw new Error(`This browser does not support any defined audio files`);
    }

    private load(path: string, format?: string) {
        if (this._volume === 0 || this._init)
            return;

        this._init = true;
        this.initHowler(path, format);
    }
    private initHowler(src: string, format?: string) {
        this.howl = new Howl({
            src: [src],
            format: format ? [format] : undefined,
            sprite: this.howlerOptions,
            volume: this._volume,
        });
        const destroy = (id: number) => {
            const audio = this.playing.find(e => e.audioId === id);
            removeItem(this.playing, audio);
            if (audio && audio.type === AudioType.Entity) {
                removeItem(this.entityAudio, audio);
            }
            if (audio && audio.type === AudioType.Position) {
                removeItem(this.posAudio, audio);
            }
        };

        this.loadHowler();
        this.howl.on('stop', destroy);
        this.howl.on('end', destroy);
    }
    loadHowler() {
        return new Promise<void>((resolve, reject) => {
            if (!this.howl) {
                return reject('Howler does not exist!');
            }
            this.howl.load();
            // Enabling stereo takes up to a minute to load it has to be enabled here
            this.howl.pos(0, 0, 0);
            this.howl.on('load', () => {
                resolve();
            });
            this.howl.on('loaderror', (id, error) => {
                this.debug && console.error(error, id);
                reject(error);
            });
        });
    }
    playStatic(soundFile: string, volume = 100) {
        const id = this.playFile(soundFile);
        if (!id)
            return false;
        const audio: StaticAudioLocation = {
            audioId: id,
            type: AudioType.Static,
            volume: volume / 100,
        };
        this.debugWrite(audio, soundFile);
        this.howl!.volume(audio.volume * this._volume, id);
        this.playing.push(audio);
        return true;
    }
    playOnPos(soundFile: string, audioPoint: AudioPoint, volume = 100) {
        const id = this.playFile(soundFile);
        if (!id)
            return undefined;

        const audio: PositionAudioLocation = {
            type: AudioType.Position,
            audioId: id,
            audioPoint,
            volume: volume / 100,
        };
        this.debugWrite(audio, soundFile);
        this.updatePositionalAudio(audio);
        this.playing.push(audio);
        this.posAudio.push(audio);
        return id;
    }
    isPlaying(trackId: number) {
        if (!this.howl)
            return false;
        return this.howl.playing(trackId);
    }
    update() {
        if (!this.howl)
            return;

        const toRemove: EntityAudioLocation[] = [];
        for (const entity of this.posAudio) {
            this.updatePositionalAudio(entity);
        }
        for (const item of toRemove) {
            this.howl.stop(item.audioId);
            removeItem(this.entityAudio, item);
        }
    }
    private playFile(soundFile: string) {
        if (!this.howl || !soundFile)
            return undefined;

        const id = this.howl.play(soundFile);
        if (!id)
            return undefined;

        return id;
    }
    private getXZY(a: Point, b: Point, volume = 1, dist: number) {
        const maxDistance = dist * volume;

        const distX = a.x - b.x;
        const distY = a.y - b.y;
        const distZ = (a.z || 0) - (a.z || 0);

        const x = clamp(distX / maxDistance, -1, 1) * -1;
        const y = clamp(distY / maxDistance, -1, 1) * -1;
        const z = clamp(distZ / maxDistance, -1, 1) * -1;
        return {x, y, z};
    }
    stopAll() {
        for (const track of this.playing) {
            this.howl!.stop(track.audioId);
        }
    }
    setVolume(volume: number) {
        const newVolume = volume / 100;
        this._volume = newVolume;
        if (this._volume) {
            this.init();
        }

        if (!this.howl)
            return;
        this.howl.volume(this._volume);
        this.updateAllSounds();
    }
    getVolume() {
        if (!this.howl)
            return Math.round(this._volume * 100);
        return this.howl.volume();
    }
    getAudioSpriteNameById(id: number): string | undefined {
        return this.audioReverseMap.get(id);
    }
    setListener(listener: Point) {
        this.listener = listener;
    }
    private updatePositionalAudio(audio: PositionAudioLocation) {
        const { x, y, z } = this.getStereoPoint(audio.audioPoint, audio.volume, audio.audioPoint.distance);
        this.howl!.volume((1 - Math.abs(z)) * this._volume, audio.audioId);
        this.howl!.pos(x, y, z, audio.audioId);
        this.debugWrite(audio, `X:${x.toFixed(2)} Y:${y.toFixed(2)} Z:${z.toFixed(2)}`);
    }
    private getStereoPoint(audioSource: Point, volume?: number, distance?: number) {
        return this.getXZY(this.listener, audioSource, volume, distance);
    }
    // lag killer
    private updateAllSounds = debounce(() => {
        this.updateVolumesOnAllPlayables();
    }, 50);

    private updateVolumesOnAllPlayables() {
        if (!this.howl)
            return;
        const currentVolume = this.howl.volume();
        for (const track of this.playing) {
            this.howl.volume(track.audioId, track.volume * currentVolume);
        }
    }
    private debugWrite(audio: Audio, fileNameOrInfo: string) {
        if (audio.debug) {
            audio.debug.additionalInfo = fileNameOrInfo;
        } else {
            audio.debug = {
                name: fileNameOrInfo,
            };
        }
    }
}
