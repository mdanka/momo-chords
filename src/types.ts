export enum Notes {
    AFlat = "Ab",
    A = "A",
    ASharp = "A#",
    BFlat = "Bb",
    B = "B",
    C = "C",
    CSharp = "C#",
    DFlat = "Db",
    D = "D",
    DSharp = "D#",
    EFlat = "Eb",
    E = "E",
    F = "F",
    FSharp = "F#",
    GFlat = "Gb",
    G = "G",
    GSharp = "G#",
}
export type Note = keyof typeof Notes;

export enum Qualities {
    Major = "Major",
    Minor = "Minor",
    Augmented = "Augmented",
    Diminished = "Diminished",
    Power = "Power",
}
export type Quality = keyof typeof Qualities;

export enum Intervals {
    Major7 = "Major7",
    Minor7 = "Minor7",
    Dominant7 = "Dominant7",
    Diminished7 = "Diminished7",
    Major9 = "Major9",
    Major11 = "Major11",
    Major13 = "Major13",
}
export type Interval = keyof typeof Intervals;

export enum Addeds {
    Add9 = "Add9",
    Add11 = "Add11",
    Add13 = "Add13",
    Major6 = "Major6",
    SixNine = "SixNine",
}
export type Added = keyof typeof Addeds;

export enum Suspendeds {
    Sus4 = "Sus4",
    Sus2 = "Sus2",
    Sus2Sus4 = "Sus2Sus4",
}
export type Suspended = keyof typeof Suspendeds;

export interface IChord {
    /**
     * The main note
     */
    rootNote: Notes;

    quality: Qualities;

    interval: Intervals | undefined;

    added: Addeds | undefined;

    suspended: Suspendeds | undefined;

    /**
     * For example: C/G
     */
    bassNote: Notes | undefined;
}

export interface INamedChord extends IChord {
    name: string;
}

// TODO(mdanka): add naming options for printing
// export interface IChordNamingOption {
//     augmented: "aug" | "+";
//     diminished: "dim" | "°";
//     majorInterval: "maj" | "M";
//     /**
//      * `undefined` uses the majorInterval
//      */
//     majorSeventh: undefined | "Δ";
// }
