export const VERSION = '1.0.0';
export const NOTES: string[] = [];
export const HEADER_CHUNK_LENGTH = 14;
export const CIRCLE_OF_FOURTHS = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fb', 'Bbb', 'Ebb', 'Abb'];
export const CIRCLE_OF_FIFTHS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#'];
export interface MidiMap {
    [key: number]: MidiObject;
}
export interface MidiObject {
    noteName: string;
    frequency: number;
}

export type Note = 'A0' | 'A#0' | 'B0' | 'C1' | 'C#1' | 'D1' | 'D#1' | 'E1' | 'F1' | 'F#1' | 'G1' | 'G#1' |
'A1' | 'A#1' | 'B1' | 'C2' | 'C#2' | 'D2' | 'D#2' | 'E2' | 'F2' | 'F#2' | 'G2' | 'G#2' | 'A2' | 'A#2' | 'B2' | 
'C3' | 'C#3' | 'D3' | 'D#3' | 'E3' | 'F3' | 'F#3' | 'G3' | 'G#3' | 'A3' | 'A#3' | 'B3' | 'C4' | 'C#4' | 'D4' |
'D#4' | 'E4' | 'F4' | 'F#4' | 'G4' | 'G#4' | 'A4' | 'A#4' | 'B4' | 'C5' | 'C#5' | 'D5' | 'D#5' | 'E5' | 'F5' | 
'F#5' | 'G5' | 'G#5' | 'A5' | 'A#5' | 'B5' | 'C6' | 'C#6' | 'D6' | 'D#6' | 'E6' | 'F6' | 'F#6' | 'G6' | 'G#6' |
'A6' | 'A#6' | 'B6' | 'C7' | 'C#7' | 'D7' | 'D#7' | 'E7' | 'F7' | 'F#7' | 'G7' | 'G#7' | 'A7' | 'A#7' | 'B7' |
'C8' | 'C#8' | 'D8' | 'D#8' | 'E8' | 'F8' | 'F#8' | 'G8' | 'G#8' | 'A8' | 'A#8' | 'B8' | 'C9' | 'C#9' | 'D9' |
'D#9' | 'E9' | 'F9' | 'F#9' | 'G9';

export const MIDI_MAP: MidiMap = {
    127: { noteName: 'G9',      frequency: 12543.85 },
    126: { noteName: 'F#9', frequency: 11839.82 },
    125: { noteName: 'F9',      frequency: 11175.30 },
    124: { noteName: 'E9',      frequency: 10548.08 },
    123: { noteName: 'D#9', frequency: 9956.06 },
    122: { noteName: 'D9',      frequency: 9397.27 },
    121: { noteName: 'C#9', frequency: 8869.84 },
    120: { noteName: 'C9',      frequency: 8372.02 },
    119: { noteName: 'B8',      frequency: 7902.13 },
    118: { noteName: 'A#8', frequency: 7458.62 },
    117: { noteName: 'A8',      frequency: 7040.00 },
    116: { noteName: 'G#8', frequency: 6644.88 },
    115: { noteName: 'G8',      frequency: 6271.93 },
    114: { noteName: 'F#8', frequency: 5919.91 },
    113: { noteName: 'F8',      frequency: 5587.65 },
    112: { noteName: 'E8',      frequency: 5274.04 },
    111: { noteName: 'D#8', frequency: 4978.03 },
    110: { noteName: 'D8',      frequency: 4698.64 },
    109: { noteName: 'C#8', frequency: 4434.92 },
    108: { noteName: 'C8',      frequency: 4186.01 },
    107: { noteName: 'B7',      frequency: 3951.07 },
    106: { noteName: 'A#7', frequency: 3729.31 },
    105: { noteName: 'A7',        frequency: 3520.00 },
    104: { noteName: 'G#7', frequency: 3322.44 },
    103: { noteName: 'G7',      frequency: 3135.96 },
    102: { noteName: 'F#7', frequency: 2959.96 },
    101: { noteName: 'F7',      frequency: 2793.83 },
    100: { noteName: 'E7',      frequency: 2637.02 },
    99:  { noteName: 'D#7',  frequency: 2489.02 },
    98:  { noteName: 'D7',       frequency: 2349.32 },
    97:  { noteName: 'C#7',  frequency: 2217.46 },
    96:  { noteName: 'C7',       frequency: 2093.00 },
    95:  { noteName: 'B6',       frequency: 1975.53 },
    94:  { noteName: 'A#6',  frequency: 1864.66 },
    93:  { noteName: 'A6',       frequency: 1760.00 },
    92:  { noteName: 'G#6',  frequency: 1661.22 },
    91:  { noteName: 'G6',       frequency: 1567.98 },
    90:  { noteName: 'F#6',  frequency: 1479.98 },
    89:  { noteName: 'F6',       frequency: 1396.91 },
    88:  { noteName: 'E6',       frequency: 1318.51 },
    87:  { noteName: 'D#6',  frequency: 1244.51 },
    86:  { noteName: 'D6',       frequency: 1174.66 },
    85:  { noteName: 'C#6',  frequency: 1108.73 },
    84:  { noteName: 'C6',       frequency: 1046.50 },
    83:  { noteName: 'B5',       frequency: 987.77 },
    82:  { noteName: 'A#5',  frequency: 932.33 },
    81:  { noteName: 'A5',       frequency: 880.00 },
    80:  { noteName: 'G#5',  frequency: 830.61 },
    79:  { noteName: 'G5',       frequency: 783.99 },
    78:  { noteName: 'F#5',  frequency: 739.99 },
    77:  { noteName: 'F5',       frequency: 698.46 },
    76:  { noteName: 'E5',       frequency: 659.26 },
    75:  { noteName: 'D#5',  frequency: 622.25 },
    74:  { noteName: 'D5',       frequency: 587.33 },
    73:  { noteName: 'C#5',  frequency: 554.37 },
    72:  { noteName: 'C5',       frequency: 523.25 },
    71:  { noteName: 'B4',       frequency: 493.88 },
    70:  { noteName: 'A#4',  frequency: 466.16 },
    69:  { noteName: 'A4',       frequency: 440.00 },
    68:  { noteName: 'G#4',  frequency: 415.30 },
    67:  { noteName: 'G4',        frequency: 392.00 },
    66:  { noteName: 'F#4',  frequency: 369.99 },
    65:  { noteName: 'F4',       frequency: 349.23 },
    64:  { noteName: 'E4',       frequency: 329.63 },
    63:  { noteName: 'D#4',  frequency: 311.13 },
    62:  { noteName: 'D4',       frequency: 293.66 },
    61:  { noteName: 'C#4',  frequency: 277.18 },
    60:  { noteName: 'C4',       frequency: 261.63 },
    59:  { noteName: 'B3',       frequency: 246.94 },
    58:  { noteName: 'A#3',  frequency: 233.08 },
    57:  { noteName: 'A3',       frequency: 220.00 },
    56:  { noteName: 'G#3',  frequency: 207.65 },
    55:  { noteName: 'G3',       frequency: 196.00 },
    54:  { noteName: 'F#3',  frequency: 185.00 },
    53:  { noteName: 'F3',       frequency: 174.61 },
    52:  { noteName: 'E3',       frequency: 164.81 },
    51:  { noteName: 'D#3',  frequency: 155.56 },
    50:  { noteName: 'D3',        frequency: 146.83 },
    49:  { noteName: 'C#3',  frequency: 138.59 },
    48:  { noteName: 'C3',       frequency: 130.81 },
    47:  { noteName: 'B2',       frequency: 123.47 },
    46:  { noteName: 'A#2',  frequency: 116.54 },
    45:  { noteName: 'A2',        frequency: 110.00 },
    44:  { noteName: 'G#2',  frequency: 103.83 },
    43:  { noteName: 'G2',       frequency: 98.00 },
    42:  { noteName: 'F#2',  frequency: 92.50 },
    41:  { noteName: 'F2',       frequency: 87.31 },
    40:  { noteName: 'E2',       frequency: 82.41 },
    39:  { noteName: 'D#2',  frequency: 77.78 },
    38:  { noteName: 'D2',       frequency: 73.42 },
    37:  { noteName: 'C#2',  frequency: 69.30 },
    36:  { noteName: 'C2',       frequency: 65.41 },
    35:  { noteName: 'B1',       frequency: 61.74 },
    34:  { noteName: 'A#1',  frequency: 58.27 },
    33:  { noteName: 'A1',       frequency: 55.00 },
    32:  { noteName: 'G#1',  frequency: 51.91 },
    31:  { noteName: 'G1',       frequency: 49.00 },
    30:  { noteName: 'F#1',  frequency: 46.25 },
    29:  { noteName: 'F1',       frequency: 43.65 },
    28:  { noteName: 'E1',       frequency: 41.20 },
    27:  { noteName: 'D#1',  frequency: 38.89 },
    26:  { noteName: 'D1',       frequency: 36.71 },
    25:  { noteName: 'C#1',  frequency: 34.65 },
    24:  { noteName: 'C1',       frequency: 32.70 },
    23:  { noteName: 'B0',       frequency: 30.87 },
    22:  { noteName: 'A#0',  frequency: 29.14 },
    21:  { noteName: 'A0',       frequency: 27.50 },
    20:  { noteName: '',         frequency: 25.96 },
    19:  { noteName: '',         frequency: 24.50 },
    18:  { noteName: '',         frequency: 23.12 },
    17:  { noteName: '',         frequency: 21.83 },
    16:  { noteName: '',         frequency: 20.60 },
    15:  { noteName: '',         frequency: 19.45 },
    14:  { noteName: '',         frequency: 18.35 },
    13:  { noteName: '',         frequency: 17.32 },
    12:  { noteName: '',         frequency: 16.35 },
    11:  { noteName: '',         frequency: 15.43 },
    10:  { noteName: '',         frequency: 14.57 },
    9:   { noteName: '',          frequency: 13.75 },
    8:   { noteName: '',          frequency: 12.98 },
    7:   { noteName: '',          frequency: 12.25 },
    6:   { noteName: '',          frequency: 11.56 },
    5:   { noteName: '',          frequency: 10.91 },
    4:   { noteName: '',          frequency: 10.30 },
    3:   { noteName: '',          frequency: 9.72 },
    2:   { noteName: '',          frequency: 9.18 },
    1:   { noteName: '',          frequency: 8.66 },
    0:   { noteName: '',          frequency: 8.18 },
};


function init() {
    const allNotes = [['C'], ['C#', 'Db'], ['D'], ['D#', 'Eb'], ['E'], ['F'], ['F#', 'Gb'], ['G'], ['G#', 'Ab'], ['A'], ['A#', 'Bb'], ['B']];
    let counter = 0;

    // All available octaves.
    for (let i = -1; i <= 9; i++) {
        for (let j = 0; j < allNotes.length; j++) {
            for (let k = 0; k < allNotes[j].length; k++) {
                NOTES[counter] = allNotes[j][k] + i;
                counter++;
            }
        }
    }
}

init();

