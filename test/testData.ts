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
    ];

    export const incorrectNames: string[] = ["", "T", "Ah", "Cb", "E#"];
}
