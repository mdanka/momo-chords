import { Qualities, Intervals, Addeds, Suspendeds, Notes } from "./types";

export namespace Naming {
    export const notes: Map<Notes, string[]> = new Map([
        [Notes.AFlat, ["Ab"]],
        [Notes.A, ["A"]],
        [Notes.ASharp, ["A#"]],
        [Notes.BFlat, ["Bb"]],
        [Notes.B, ["B"]],
        [Notes.C, ["C"]],
        [Notes.CSharp, ["C#"]],
        [Notes.DFlat, ["Db"]],
        [Notes.D, ["D"]],
        [Notes.DSharp, ["D#"]],
        [Notes.EFlat, ["Eb"]],
        [Notes.E, ["E"]],
        [Notes.F, ["F"]],
        [Notes.FSharp, ["F#"]],
        [Notes.GFlat, ["Gb"]],
        [Notes.G, ["G"]],
        [Notes.GSharp, ["G#"]],
    ] as [Notes, string[]][]);

    export const qualities: Map<Qualities, string[]> = new Map([
        [Qualities.Major, ["", "major", "maj", "M"]],
        [Qualities.Minor, ["m", "minor", "min"]],
        [Qualities.Augmented, ["aug", "augmented", "+"]],
        [Qualities.Diminished, ["dim", "diminished"]],
        [Qualities.Power, ["5"]],
    ] as [Qualities, string[]][]);

    export const intervals: Map<Intervals, string[]> = new Map([
        [Intervals.Major7, ["maj7", "Maj7", "M7", "+7"]],
        [Intervals.Minor7, ["m7", "Min7", "min7", "minor7", "-7"]],
        [Intervals.Dominant7, ["7", "dom7", "dominant7"]],
        [Intervals.Diminished7, ["dim7", "diminished7"]],
        [Intervals.Major9, ["maj9", "M9", "9"]],
        [Intervals.Major11, ["maj11", "M11", "11"]],
        [Intervals.Major13, ["maj13", "M13", "13"]],
    ] as [Intervals, string[]][]);

    export const addeds: Map<Addeds, string[]> = new Map([
        [Addeds.Add9, ["add9", "2", "/9"]],
        [Addeds.Add11, ["add11", "4", "/11"]],
        [Addeds.Add13, ["add13", "/13"]],
        [Addeds.Major6, ["6", "maj6", "major6", "M6"]],
        [Addeds.SixNine, ["6/9", "6add9"]],
    ] as [Addeds, string[]][]);

    export const suspendeds: Map<Suspendeds, string[]> = new Map([
        [Suspendeds.Sus4, ["sus4", "suspended", "sus"]],
        [Suspendeds.Sus2, ["sus2", "suspended2"]],
        [Suspendeds.Sus2Sus4, ["sus2sus4"]],
    ] as [Suspendeds, string[]][]);

    export const notesLookup = mapToLookup(notes);
    export const qualitiesLookup = mapToLookup(qualities);
    export const intervalsLookup = mapToLookup(intervals);
    export const addedsLookup = mapToLookup(addeds);
    export const suspendedsLookup = mapToLookup(suspendeds);

    export const intervalToQuality: Map<Intervals, Qualities> = new Map([
        [Intervals.Major7, Qualities.Major],
        [Intervals.Minor7, Qualities.Minor],
        [Intervals.Dominant7, Qualities.Major],
        [Intervals.Diminished7, Qualities.Diminished],
        [Intervals.Major9, Qualities.Major],
        [Intervals.Major11, Qualities.Major],
        [Intervals.Major13, Qualities.Major],
    ] as [Intervals, Qualities][]);

    function mapToLookup<T>(map: Map<T, string[]>) {
        const lookup: Map<string, T> = new Map();
        map.forEach((values, key) => {
            values.forEach(value => lookup.set(value, key));
        });
        return lookup;
    }
}
