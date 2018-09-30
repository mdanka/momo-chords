import { IChord, Notes, Qualities, Intervals } from "../src";

export interface IChordPair {
    name: string;
    chord: IChord;
}

export namespace TestData {
    export const correctPairsWithCanonicalNames: IChordPair[] = [
        {
            name: "A",
            chord: {
                rootNote: Notes.A,
                quality: Qualities.Major,
                interval: undefined,
                added: undefined,
                suspended: undefined,
                bassNote: undefined,
            },
        },
        {
            name: "Bb",
            chord: {
                rootNote: Notes.BFlat,
                quality: Qualities.Major,
                interval: undefined,
                added: undefined,
                suspended: undefined,
                bassNote: undefined,
            },
        },
        {
            name: "C#",
            chord: {
                rootNote: Notes.CSharp,
                quality: Qualities.Major,
                interval: undefined,
                added: undefined,
                suspended: undefined,
                bassNote: undefined,
            },
        },
        {
            name: "Am",
            chord: {
                rootNote: Notes.A,
                quality: Qualities.Minor,
                interval: undefined,
                added: undefined,
                suspended: undefined,
                bassNote: undefined,
            },
        },
        {
            name: "Bbm",
            chord: {
                rootNote: Notes.BFlat,
                quality: Qualities.Minor,
                interval: undefined,
                added: undefined,
                suspended: undefined,
                bassNote: undefined,
            },
        },
        {
            name: "C#m",
            chord: {
                rootNote: Notes.CSharp,
                quality: Qualities.Minor,
                interval: undefined,
                added: undefined,
                suspended: undefined,
                bassNote: undefined,
            },
        },
        {
            name: "Dbm/G#",
            chord: {
                rootNote: Notes.DFlat,
                quality: Qualities.Minor,
                interval: undefined,
                added: undefined,
                suspended: undefined,
                bassNote: Notes.GSharp,
            },
        },
        {
            name: "G#maj7",
            chord: {
                rootNote: Notes.GSharp,
                quality: Qualities.Major,
                interval: Intervals.Major7,
                added: undefined,
                suspended: undefined,
                bassNote: undefined,
            },
        },
        {
            name: "Bmmaj13/F#",
            chord: {
                rootNote: Notes.B,
                quality: Qualities.Minor,
                interval: Intervals.Major13,
                added: undefined,
                suspended: undefined,
                bassNote: Notes.FSharp,
            },
        },
    ];

    export const correctPairsWithNonCanonicalNames: IChordPair[] = [
        {
            name: "G#M7",
            chord: {
                rootNote: Notes.GSharp,
                quality: Qualities.Major,
                interval: Intervals.Major7,
                added: undefined,
                suspended: undefined,
                bassNote: undefined,
            },
        },
        {
            name: "BmM13/F#",
            chord: {
                rootNote: Notes.B,
                quality: Qualities.Minor,
                interval: Intervals.Major13,
                added: undefined,
                suspended: undefined,
                bassNote: Notes.FSharp,
            },
        },
    ];

    export const incorrectNames: string[] = ["", "T", "Ah", "Cb", "E#"];
}
