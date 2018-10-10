import { Qualities, Sevenths, Ninths, Elevenths, Addeds, Suspendeds, Notes, Thirteenths, AlteredFifths } from "./types";

// TODO(mdanka): add a test guaranteeing that all enum types have corresponding namings
export namespace Naming {
    export const notes: Map<Notes, string[]> = new Map([
        [Notes.AFlat, ["Ab", "A♭"]],
        [Notes.A, ["A"]],
        [Notes.ASharp, ["A#", "A♯"]],
        [Notes.BFlat, ["Bb", "B♭"]],
        [Notes.B, ["B"]],
        [Notes.C, ["C"]],
        [Notes.CSharp, ["C#", "C♯"]],
        [Notes.DFlat, ["Db", "D♭"]],
        [Notes.D, ["D"]],
        [Notes.DSharp, ["D#", "D♯"]],
        [Notes.EFlat, ["Eb", "E♭"]],
        [Notes.E, ["E"]],
        [Notes.F, ["F"]],
        [Notes.FSharp, ["F#", "F♯"]],
        [Notes.GFlat, ["Gb", "G♭"]],
        [Notes.G, ["G"]],
        [Notes.GSharp, ["G#", "G♯"]],
    ] as [Notes, string[]][]);

    const majorSymbols = ["major", "maj", "Maj", "M", "Δ"];
    const minorSymbols = ["m", "minor", "min", "−", "-"];
    const augmentedSymbols = ["aug", "augmented", "+"];
    export const qualities: Map<Qualities, string[]> = new Map([
        [Qualities.Major, majorSymbols],
        [Qualities.Minor, minorSymbols],
        [Qualities.MinorMajor, combineLists(minorSymbols, majorSymbols)],
        [Qualities.Augmented, augmentedSymbols],
        [Qualities.AugmentedMajor, combineLists(augmentedSymbols, majorSymbols)],
        [Qualities.Diminished, ["dim", "diminished", "°", "o", "0"]],
        [Qualities.HalfDiminished, ["Ø", "ø"]],
        [Qualities.Power, ["5", "no3"]],
    ] as [Qualities, string[]][]);

    export const sevenths: Map<Sevenths, string[]> = new Map([[Sevenths.Seventh, ["7"]]] as [Sevenths, string[]][]);

    export const ninths: Map<Ninths, string[]> = new Map([
        [Ninths.Major9, ["9"]],
        [Ninths.Minor9, ["b9", "♭9"]],
        [Ninths.Sharpened9, ["#9", "♯9"]],
    ] as [Ninths, string[]][]);

    export const elevenths: Map<Elevenths, string[]> = new Map([
        [Elevenths.Perfect11, ["11"]],
        [Elevenths.Sharpened11, ["#11", "♯11"]],
        [Elevenths.Flattened11, ["b11", "♭11"]],
    ] as [Elevenths, string[]][]);

    export const thirteenths: Map<Thirteenths, string[]> = new Map([
        [Thirteenths.Major13, ["13"]],
        [Thirteenths.Minor13, ["b13", "♭13"]],
    ] as [Thirteenths, string[]][]);

    export const addeds: Map<Addeds, string[]> = new Map([
        [Addeds.Add9, ["add9", "2", "/9"]],
        [Addeds.Add11, ["add11", "4", "/11"]],
        [Addeds.Add13, ["add13", "6", "/13"]],
    ] as [Addeds, string[]][]);

    export const suspendeds: Map<Suspendeds, string[]> = new Map([
        [Suspendeds.Sus4, ["sus4", "suspended", "sus"]],
        [Suspendeds.Sus2, ["sus2", "suspended2"]],
    ] as [Suspendeds, string[]][]);

    export const alteredFifths: Map<AlteredFifths, string[]> = new Map([
        [AlteredFifths.Sharpened5, ["#5", "♯5"]],
        [AlteredFifths.Flattened5, ["b5", "♭5"]],
    ] as [AlteredFifths, string[]][]);

    export const notesLookup = mapToLookup(notes);
    export const qualitiesLookup = mapToLookup(qualities);
    export const seventhsLookup = mapToLookup(sevenths);
    export const ninthsLookup = mapToLookup(ninths);
    export const eleventhsLookup = mapToLookup(elevenths);
    export const thirteenthsLookup = mapToLookup(thirteenths);
    export const addedsLookup = mapToLookup(addeds);
    export const suspendedsLookup = mapToLookup(suspendeds);
    export const alteredFifthsLookup = mapToLookup(alteredFifths);

    function mapToLookup<T>(map: Map<T, string[]>) {
        const lookup: Map<string, T> = new Map();
        map.forEach((values, key) => {
            values.forEach(value => lookup.set(value, key));
        });
        return lookup;
    }

    function combineLists(list1: string[], list2: string[]) {
        const resultList: string[] = [];
        list1.forEach(list1String => resultList.push(...list2.map(list2String => `${list1String}${list2String}`)));
        return resultList;
    }
}
