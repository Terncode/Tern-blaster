export interface IPianoSampler {
    keyDown(midiNumber: number, velocity: number): void;
    keyUp(midiNumber: number, velocity: number): void;
    reset(): void;
    pedalUp(): void;
    pedalDown(): void;
    getVolume(): number;
    setVolume(value: number): void;
    getPlayingNotes(): number[]
}
