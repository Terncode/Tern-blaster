
import { TernBlaster } from './audioEngine';
import { SettingsUpdatable } from './interfaces';

export class VolumeHandler {

    constructor(private audioEngine: TernBlaster, private settings: SettingsUpdatable) {
        if (!settings) {
            const storageKey = 'tern_blaster';
            this.settings = {
                settings: {
                    master: 100,
                    sprite: 50,
                    piano: 75,
                    synth: 10,
                },
                onUpdate: () => {
                    localStorage.setItem(storageKey, JSON.stringify(this.settings.settings));
                }
            };
            const data = localStorage.getItem('tern_blaster');
            if (data) {
                this.settings.settings = JSON.parse(data);

            }
        }
        this.updateAllVolumes();
    }

    updateAllVolumes() {
        this.setSpriteVolume(this.getSpriteVolume());
        this.setPianoVolume(this.getPianoVolume());
        this.setSynthVolume(this.getSynthVolume());
    }

    setMasterVolume(value: number) {
        this.settings.settings.master = value;
        this.updateAllVolumes();

        this.settings.onUpdate();
    }
    getMasterVolume() {
        return this.settings.settings!.master || 100;
    }
    setSpriteVolume(value: number) {
        this.settings.settings.sprite = value;
        const valueToSet = this.getCalculatedValue(value);
        if (this.audioEngine.spritePlayer) {
            this.audioEngine.spritePlayer.setVolume(valueToSet);
        }
    }
    getSpriteVolume() {
        return this.settings.settings.sprite;
    }
    setPianoVolume(value: number) {
        this.settings.settings.piano = value;
        const valueToSet = this.getCalculatedValue(value);
        this.audioEngine.pianoSampler.setVolume(valueToSet);
        this.settings.onUpdate();
    }
    getPianoVolume() {
        return this.settings.settings.piano || 75;
    }
    setSynthVolume(value: number) {
        this.settings.settings.synth = value;
        this.audioEngine.synthEngine.setVolume(this.getCalculatedValue(value));
        this.settings.onUpdate();
    }
    getSynthVolume() {
        return this.settings.settings.synth || 75;
    }
    getCalculatedValue(value: number) {
        return value * (this.getMasterVolume() / 100);
    }
}
