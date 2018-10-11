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
    MinorMajor = "MinorMajor",
    Augmented = "Augmented",
    AugmentedMajor = "AugmentedMajor",
    Diminished = "Diminished",
    HalfDiminished = "HalfDiminished",
    Power = "Power",
}
export type Quality = keyof typeof Qualities;

export enum Sevenths {
    Seventh = "Seventh",
}
export type Seventh = keyof typeof Sevenths;

export enum Ninths {
    Major9 = "Major9",
    Minor9 = "Minor9",
    Sharpened9 = "Sharpened9",
}
export type Ninth = keyof typeof Ninths;

export enum Elevenths {
    Perfect11 = "Perfect11",
    Sharpened11 = "Sharpened11",
    Flattened11 = "Flattened11",
}
export type Eleventh = keyof typeof Elevenths;

export enum Thirteenths {
    Major13 = "Major13",
    Minor13 = "Minor13",
}
export type Thirteenth = keyof typeof Thirteenths;

export enum Addeds {
    Add9 = "Add9",
    Add11 = "Add11",
    Add13 = "Add13",
}
export type Added = keyof typeof Addeds;
export const addedOrder = [Addeds.Add13, Addeds.Add11, Addeds.Add9];

export enum Suspendeds {
    Sus4 = "Sus4",
    Sus2 = "Sus2",
}
export type Suspended = keyof typeof Suspendeds;
export const suspendedOrder = [Suspendeds.Sus2, Suspendeds.Sus4];

export enum AlteredFifths {
    Sharpened5 = "Sharpened5",
    Flattened5 = "Flattened5",
}
export type AlteredFifth = keyof typeof AlteredFifths;

export interface IChordSymbolStructure {
    quality: Qualities | undefined;

    seventh: Sevenths | undefined;

    ninth: Ninths | undefined;

    eleventh: Elevenths | undefined;

    thirteenth: Thirteenths | undefined;

    addeds: Set<Addeds>;

    suspendeds: Set<Suspendeds>;

    alteredFifth: AlteredFifths | undefined;
}

export interface IChordSymbol extends IChordSymbolStructure {
    /**
     * The main note
     */
    rootNote: Notes;

    /**
     * For example: C/G
     */
    bassNote: Notes | undefined;
}

/**
 * The chord structure uses the integer notation.
 *
 * 1  C#  b9
 * 2  D   2, 9
 * 3  D#  minor 3, #9
 * 4  E   major 3, b11
 * 5  F   4, perfect 11
 * 6  F#  b5, #11
 * 7  G   perfect 5
 * 8  G#  #5, minor 13
 * 9  A   6, major 13
 * 10 A#  minor 7
 * 11 B   major 7
 */
export interface IChordStructure {
    1: boolean;
    2: boolean;
    3: boolean;
    4: boolean;
    5: boolean;
    6: boolean;
    7: boolean;
    8: boolean;
    9: boolean;
    10: boolean;
    11: boolean;
}

export interface IChord {
    symbol: IChordSymbol;
    structure: IChordStructure;
}
