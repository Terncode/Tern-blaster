import { AudioPoint, Point } from './interfaces';
import { SpritePlayer } from './spritePlayer';
import { SynthEngine } from './synthEngine';
import { SettingsUpdateable as SettingsUpdatable, VolumeHandler } from './volumeHandler';
import { PianoHandler } from './piano/pianoHandler';
import { HowlOptions } from 'howler';

interface UpdateTypeTimeout {
    type: 'timeout',
    timeout: number;
}
interface UpdateTypeAnimationFrame {
    type: 'animation-frame',
}
interface UpdateTypeCustom {
    type: 'custom',
    fn: (fn: () => void) => void;
}

interface SpritePlayerOptions {
    files: string[];
    sprites: HowlOptions['sprite'];
    listener: Point,
}

type UpdateType = UpdateTypeTimeout | UpdateTypeAnimationFrame | UpdateTypeCustom;

export interface TernBlasterOptions {
    updateOptions?: UpdateType,
    spritePlayerOptions?: SpritePlayerOptions
    settings?: SettingsUpdatable;
}

export class TernBlaster {
    private frame: NodeJS.Timeout | number;
    spritePlayer?: SpritePlayer;
    synthEngine: SynthEngine;
    volumeHandler: VolumeHandler;
    pianoSampler: PianoHandler;

    constructor(private options?: TernBlasterOptions) {
        if (options?.spritePlayerOptions) {
            this.spritePlayer = new SpritePlayer(options.spritePlayerOptions.listener, options.spritePlayerOptions.files, options.spritePlayerOptions.sprites);
        }

        this.synthEngine = new SynthEngine();
        this.pianoSampler = new PianoHandler();
        this.volumeHandler = new VolumeHandler(this, options?.settings);

        const updateOptions = options?.updateOptions;
        if  (updateOptions) {
            switch (updateOptions.type) {
                case 'animation-frame': {
                    const recursion = () => {
                        this.update();
                        this.frame = requestAnimationFrame(recursion);
                    };
                    recursion();
                }
                    break;
                case 'timeout': {
                    const recursion = () => {
                        this.update();
                        this.frame = setTimeout(recursion, updateOptions.timeout);
                    };
                    recursion();
                }
                    break;
                case 'custom': {
                    updateOptions.fn(this.update);
                }
                    break;
            }
        } else {
            const recursion = () => {
                this.update();
                this.frame = setTimeout(recursion, 1000);
            };
            recursion();
        }
    }
    destroy() {
        this.stopAll();
        if (this.frame) {
            if (this.options.updateOptions?.type === 'animation-frame') {
                cancelAnimationFrame(this.frame as number);
            } else {
                clearTimeout(this.frame as NodeJS.Timeout);
            }
        }
        this.update = () => {
            throw new Error('Audio engine has been destroyed');
        };
    }
    playStatic(soundFile: string, volume?: number) {
        return this.spritePlayer ? this.spritePlayer.playStatic(soundFile, volume) : false;
    }
    playOnPos(soundFile: string, audioPoint: AudioPoint, volume?: number) {
        return this.spritePlayer ? this.spritePlayer.playOnPos(soundFile, audioPoint, volume) : undefined;
    }
    stopAll() {
        if(this.spritePlayer) {
            this.spritePlayer.stopAll();
        }
        this.pianoSampler.reset();
        this.synthEngine.resetAll();
    }
    private update = () => {
        if (this.spritePlayer) {
            this.spritePlayer.update();
        }
    };
    setSoundListener(listener: Point) {
        if (this.spritePlayer) {
            this.spritePlayer.setListener(listener);
        }
    }
}
