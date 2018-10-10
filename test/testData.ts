import { IChordSymbol, Notes, Qualities, Sevenths, Thirteenths, Ninths } from "../src";

export interface IChordPair {
    name: string;
    chordSymbol: IChordSymbol;
}

export namespace TestData {
    export const correctPairsWithCanonicalNames: IChordPair[] = [
        {
            name: "A",
            chordSymbol: {
                rootNote: Notes.A,
                quality: undefined,
                seventh: undefined,
                ninth: undefined,
                eleventh: undefined,
                thirteenth: undefined,
                addeds: new Set(),
                suspendeds: new Set(),
                alteredFifth: undefined,
                bassNote: undefined,
            },
        },
        {
            name: "Bb",
            chordSymbol: {
                rootNote: Notes.BFlat,
                quality: undefined,
                seventh: undefined,
                ninth: undefined,
                eleventh: undefined,
                thirteenth: undefined,
                addeds: new Set(),
                suspendeds: new Set(),
                alteredFifth: undefined,
                bassNote: undefined,
            },
        },
        {
            name: "C#",
            chordSymbol: {
                rootNote: Notes.CSharp,
                quality: undefined,
                seventh: undefined,
                ninth: undefined,
                eleventh: undefined,
                thirteenth: undefined,
                addeds: new Set(),
                suspendeds: new Set(),
                alteredFifth: undefined,
                bassNote: undefined,
            },
        },
        {
            name: "Am",
            chordSymbol: {
                rootNote: Notes.A,
                quality: Qualities.Minor,
                seventh: undefined,
                ninth: undefined,
                eleventh: undefined,
                thirteenth: undefined,
                addeds: new Set(),
                suspendeds: new Set(),
                alteredFifth: undefined,
                bassNote: undefined,
            },
        },
        {
            name: "Bbm",
            chordSymbol: {
                rootNote: Notes.BFlat,
                quality: Qualities.Minor,
                seventh: undefined,
                ninth: undefined,
                eleventh: undefined,
                thirteenth: undefined,
                addeds: new Set(),
                suspendeds: new Set(),
                alteredFifth: undefined,
                bassNote: undefined,
            },
        },
        {
            name: "C#m",
            chordSymbol: {
                rootNote: Notes.CSharp,
                quality: Qualities.Minor,
                seventh: undefined,
                ninth: undefined,
                eleventh: undefined,
                thirteenth: undefined,
                addeds: new Set(),
                suspendeds: new Set(),
                alteredFifth: undefined,
                bassNote: undefined,
            },
        },
        {
            name: "Dbm/G#",
            chordSymbol: {
                rootNote: Notes.DFlat,
                quality: Qualities.Minor,
                seventh: undefined,
                ninth: undefined,
                eleventh: undefined,
                thirteenth: undefined,
                addeds: new Set(),
                suspendeds: new Set(),
                alteredFifth: undefined,
                bassNote: Notes.GSharp,
            },
        },
        {
            name: "G#maj7",
            chordSymbol: {
                rootNote: Notes.GSharp,
                quality: Qualities.Major,
                seventh: Sevenths.Seventh,
                ninth: undefined,
                eleventh: undefined,
                thirteenth: undefined,
                addeds: new Set(),
                suspendeds: new Set(),
                alteredFifth: undefined,
                bassNote: undefined,
            },
        },
        {
            name: "Bmmaj13/F#",
            chordSymbol: {
                rootNote: Notes.B,
                quality: Qualities.MinorMajor,
                seventh: undefined,
                ninth: undefined,
                eleventh: undefined,
                thirteenth: Thirteenths.Major13,
                addeds: new Set(),
                suspendeds: new Set(),
                alteredFifth: undefined,
                bassNote: Notes.FSharp,
            },
        },
        {
            name: "A7b9b13",
            chordSymbol: {
                rootNote: Notes.A,
                quality: undefined,
                seventh: Sevenths.Seventh,
                ninth: Ninths.Minor9,
                eleventh: undefined,
                thirteenth: Thirteenths.Minor13,
                addeds: new Set(),
                suspendeds: new Set(),
                alteredFifth: undefined,
                bassNote: undefined,
            },
        },
        {
            name: "C#07",
            chordSymbol: {
                rootNote: Notes.CSharp,
                quality: Qualities.Diminished,
                seventh: Sevenths.Seventh,
                ninth: undefined,
                eleventh: undefined,
                thirteenth: undefined,
                addeds: new Set(),
                suspendeds: new Set(),
                alteredFifth: undefined,
                bassNote: undefined,
            },
        },
    ];

    export const correctPairsWithNonCanonicalNames: IChordPair[] = [
        {
            name: "G#M7",
            chordSymbol: {
                rootNote: Notes.GSharp,
                quality: Qualities.Major,
                seventh: Sevenths.Seventh,
                ninth: undefined,
                eleventh: undefined,
                thirteenth: undefined,
                addeds: new Set(),
                suspendeds: new Set(),
                alteredFifth: undefined,
                bassNote: undefined,
            },
        },
        {
            name: "BmM13/F#",
            chordSymbol: {
                rootNote: Notes.B,
                quality: Qualities.MinorMajor,
                seventh: undefined,
                ninth: undefined,
                eleventh: undefined,
                thirteenth: Thirteenths.Major13,
                addeds: new Set(),
                suspendeds: new Set(),
                alteredFifth: undefined,
                bassNote: Notes.FSharp,
            },
        },
    ];

    export const incorrectNames: string[] = ["", "T", "Ah", "Cb", "E#"];
}
