import { Piano } from '@tonejs/piano';
import * as Tone from 'tone';
import { MIDI_MAP } from '../midiConstants';
import { pushUniq, removeItem } from '../utils';
import { IPianoSampler } from './IPianoSampler';

export class PianoSampler implements IPianoSampler {
    private piano = new Piano();
    private volume = new Tone.Volume();
    private loaded = false;
    private playingNotes: number[] = [];
    private _volume = 10;
    _pedal = false;
    constructor() {
        this.volume.toDestination();

        this.piano.connect(this.volume);

        this.piano.load().then(() => {
            this.loaded = true;
        }).catch((error : any) => {
            console.error('Piano', error);
        });
    }
    keyDown(midi: number, _velocity: number) {
        if (!this.loaded)
            return;
        pushUniq(this.playingNotes, midi);
        this.piano.keyDown({ midi });
    }
    keyUp(midi: number, _velocity: number) {
        if (!this.loaded)
            return;
        removeItem(this.playingNotes, midi);
        this.piano.keyUp({ midi });
    }
    pedalUp() {
        this._pedal = false;
        this.piano.pedalUp();
    }
    pedalDown() {
        this._pedal = true;
        this.piano.pedalDown();
    }
    reset() {
        for (const midi of this.playingNotes) {
            this.piano.keyUp({ midi });
        }
        this.playingNotes = [];
        this.piano.pedalUp();
    }
    getVolume() {
        return this._volume;
    }
    setVolume(value: number) {
        this._volume = value;
        this.volume.volume.value = -100 + value;
    }
    get readablePlayingNotes() {
        return this.playingNotes.map(n => MIDI_MAP[n]?.noteName).filter(n => n);
    }
    get pedal() {
        return this._pedal;
    }
    getPlayingNotes() {
        return this.playingNotes;
    }
}
