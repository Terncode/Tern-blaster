
import * as Tone from 'tone';
import { IPianoSampler } from './IPianoSampler';
import { pushUniq, removeItem } from '../utils';
import { MIDI_MAP } from '../midiConstants';

export enum PedalState {
    Dynamic,
    AlwaysOn,
    AlwaysOff
}

export class CustomPianoSampler implements IPianoSampler {
    private sampler: Tone.Sampler;
    private volume = new Tone.Volume();
    private playingNotes: number[] = [];
    private _volume = 100;
    private _pedal = false;
    constructor(samples: {[key: string]: string}, private pedal = PedalState.Dynamic) {
        this.sampler = new Tone.Sampler(samples);
        this.sampler.connect(this.volume);
        this.volume.toDestination();
    }
    pedalUp(): void {
        if (this.pedal !== PedalState.Dynamic) return;
        this._pedal = false;
    }
    pedalDown(): void {
        if (this.pedal !== PedalState.Dynamic) return;
        this._pedal = true;
    }
    keyDown(midi: number, _velocity: number) {
        if (!this.loaded)
            return;
        pushUniq(this.playingNotes, midi);
        this.sampler.triggerAttack(MIDI_MAP[midi].noteName);
    }
    keyUp(midi: number, _velocity: number) {
        if (!this.loaded)
            return;
        removeItem(this.playingNotes, midi);
        if (this.pedal === PedalState.AlwaysOn) {
            this.sampler.triggerRelease(MIDI_MAP[midi].noteName);
        } else if (this.pedal === PedalState.AlwaysOff) {
            // do nothing
        } else if (!this._pedal){
            this.sampler.triggerRelease(MIDI_MAP[midi].noteName);
        }
    }
    reset() {
        const notes = Object.keys(MIDI_MAP);
        for (const note of notes) {
            this.pedalUp();
            this.keyUp(parseInt(note, 10), 0);
        }
        this.playingNotes = [];
    }
    getVolume() {
        return this._volume;
    }
    setVolume(value: number) {
        this._volume = value;
        this.volume.volume.value = -100 + value;
    }
    getPlayingNotes() {
        return this.playingNotes;
    }
    get readablePlayingNotes() {
        return this.playingNotes.map(n => MIDI_MAP[n]?.noteName).filter(n => n);
    }
    get loaded() {
        return this.sampler.loaded;
    }
}

