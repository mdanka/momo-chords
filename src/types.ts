export enum Note {
    Ab = "Ab",
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

// export type Quality = "Major" | "Minor" | "Augmented" | "Diminished" | "Power";
export enum Quality {
    Major = "Major",
    Minor = "Minor",
    Augmented = "Augmented",
    Diminished = "Diminished",
    Power = "Power",
}
// export type Quality = (typeof Qualities)[keyof typeof Qualities];

export enum Interval {
    Major7 = "Major7",
    Minor7 = "Minor7",
    Dominant7 = "Dominant7",
    Diminished7 = "Diminished7",
    Major9 = "Major9",
    Major11 = "Major11",
    Major13 = "Major13",
    AugmentedDominant7 = "AugmentedDominant7",
    AugmentedMajor7 = "AugmentedMajor7",
}

export enum Added {
    Add9 = "Add9",
    Add11 = "Add11",
    Major6 = "Major6",
    SixNine = "SixNine",
}

export enum Suspended {
    Sus4 = "Sus4",
    Sus2 = "Sus2",
}

export interface IChord {
    /**
     * The main note
     */
    rootNote: Note;

    quality: Quality;

    interval: Interval | undefined;

    added: Added | undefined;

    suspended: Suspended | undefined;

    /**
     * For example: C/G
     */
    bassNote: Note | undefined;
}

export interface INamedChord extends IChord {
    name: string;
}

// export interface IChordNamingOption {
//     augmented: "aug" | "+";
//     diminished: "dim" | "°";
//     majorInterval: "maj" | "M";
//     /**
//      * `undefined` uses the majorInterval
//      */
//     majorSeventh: undefined | "Δ";
// }
