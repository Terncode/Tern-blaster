import { MidiObject, MIDI_MAP } from './midiConstants';
import { pushUniq, removeItem } from './utils';

export type SynthEngineOscillator = 'sawtooth' | 'sine' | 'square' | 'triangle';
interface GainedOscillator {
    oscillator: OscillatorNode;
    gain: GainNode;
}
export class SynthEngine {
    private debug = false;
    private audioContext = new AudioContext();
    private oscillatorNodes: GainedOscillator[] = [];
    private activeNotes: { [key: string]: GainedOscillator} = {};
    private _playingNotes: string[] = [];
    private map = new Map<string, number>();
    private volume = 1;

    constructor() {
        const entries = Object.entries(MIDI_MAP);
        for (const [midiNote, obj] of entries) {
            const midiKey = parseInt(midiNote, 10);
            const a = obj as MidiObject;
            if (a.noteName) {
                this.map.set(a.noteName, midiKey);
            }
        }
    }

    private createGainOscillator(type: SynthEngineOscillator, frequency: number): GainedOscillator {
	    const gain = this.audioContext.createGain();
        gain.gain.value = this.volume / 100;
	    gain.connect(this.audioContext.destination);
	    const oscillator = this.audioContext.createOscillator();
	    oscillator.type = type;
	    oscillator.frequency.value = frequency;
	    oscillator.connect(gain);
	    oscillator.start(0);
	    return { oscillator, gain};
    }
    private destroyOscillator(osc: GainedOscillator) {
        const x = 0.04;
	    osc.gain.gain.exponentialRampToValueAtTime(0.00001, this.audioContext.currentTime + x);
        setTimeout(() => {
            osc.oscillator.disconnect();
            osc.oscillator.stop();
        }, x);
    }
    get playingNotes(){
        return this._playingNotes;
    }
    keyDown(type: SynthEngineOscillator, note: string) {
        const midiKey = this.map.get(note);
        if (midiKey) {
            this.toggleNote(type, midiKey, true);
        }
    }
    keyUp(type:SynthEngineOscillator, note: string) {
        const midiKey = this.map.get(note);
        if (midiKey) {
            this.toggleNote(type, midiKey, false);
        }
    }
    playTone(type: SynthEngineOscillator, frequency: number, duration: number) {
	    const osc = this.createGainOscillator(type, frequency);

	    pushUniq(this.oscillatorNodes, osc);
	    setTimeout(() => {
	        this.destroyOscillator(osc);
	        removeItem(this.oscillatorNodes, osc);
	    }, duration);
    }
    toggleNote(type: SynthEngineOscillator, midiValue: number, value: boolean) {
	    const midi = MIDI_MAP[midiValue];
	    if (!midi) {
	        this.debug && console.error(`None existent midi value ${midiValue}`);
	    }
	    const key = `${type}-${midiValue}`;
	    if (value) {
	        if (!this.activeNotes[key]) {
	            this.activeNotes[key] = this.createGainOscillator(type, midi.frequency);
                if (midi.noteName) {
                    pushUniq(this._playingNotes, midi.noteName);
                }
            }
	    } else {
	        if (this.activeNotes[key]) {
	            this.destroyOscillator(this.activeNotes[key]);
	            delete this.activeNotes[key];
                if (midi.noteName) {
                    removeItem(this._playingNotes, midi.noteName);
                }
	        }
	    }
    }
    resetAll(){
	    const keys = Object.keys(this.activeNotes);
	    for (const key of keys) {
	        this.destroyOscillator(this.activeNotes[key]);
	        delete this.activeNotes[key];
	    }
        this._playingNotes.length = 0;
    }

    setVolume(number: number) {
        this.volume = number;
	    const keys = Object.keys(this.activeNotes);
	    for (const key of keys) {
	        this.activeNotes[key].gain.gain.value = number / 100;
	    }
    }
    getVolume() {
	   return this.volume * 100;
    }
}
