import { pushUniq } from '../utils';
import { CustomPianoSampler, PedalState } from './customPianoSampler';
import { IPianoSampler} from './IPianoSampler';
import { PianoSampler } from './pianoSampler';
import { Note } from '../interfaces';

export class PianoHandler {
    private defaultPiano = new PianoSampler();
    private pianoSamplers = new Map<string, CustomPianoSampler>();
    private volume = 100;
    constructor() {
        this.setVolume(this.volume);
    }
    getPianoByType(pianoType: string) {
        return this.pianoSamplers.get(pianoType) || this.defaultPiano;
    }
    keyDown(pianoType: string, midiValue: number, velocity: number) {
        this.getPianoByType(pianoType).keyDown(midiValue, velocity);
    }
    keyUp(pianoType: string, midiValue: number, velocity: number) {
        this.getPianoByType(pianoType).keyUp(midiValue, velocity);
    }
    pedalDown(pianoType: string) {
        this.getPianoByType(pianoType).pedalDown();
    }
    pedalUp(pianoType: string) {
        this.getPianoByType(pianoType).pedalUp();
    }
    reset() {
        this.forEachPiano(p => p.reset());
    }
    setVolume(value: number) {
        this.volume = value;
        this.forEachPiano(p => p.setVolume(this.volume));
    }
    getVolume() {
        return this.volume;
    }
    getPlayingNotes() {
        const allNotes: number[] = [];
        this.forEachPiano(piano => {
            piano.getPlayingNotes().forEach(note => pushUniq(allNotes, note));
        });
        return allNotes;
    }
    addCustomPiano(name: string, data: { [key in Note]?: string}, pedalState =  PedalState.Dynamic) {
        this.pianoSamplers.set(name, new CustomPianoSampler(data, pedalState));
    }
    deleteCustomPiano(name: string) {
        const pianoSampler = this.pianoSamplers.get(name);
        if(pianoSampler) {
            pianoSampler.reset();
            this.pianoSamplers.delete(name);
        }
    }
    private forEachPiano(cbPianoSampler: (pianoSampler: IPianoSampler) => void) {
        cbPianoSampler(this.defaultPiano);
        this.pianoSamplers.forEach((pianoSampler) => {
            cbPianoSampler(pianoSampler);
        });
    }
}
