import {
    Qualities,
    Sevenths,
    Ninths,
    Elevenths,
    Addeds,
    Suspendeds,
    Notes,
    Thirteenths,
    AlteredFifths,
    INaming,
} from "./types";

const merge = require("lodash.merge");

const majorSymbols = ["maj", "major", "Maj", "M", "Δ"];
const minorSymbols = ["m", "minor", "min", "−", "-"];
const augmentedSymbols = ["aug", "augmented", "+"];
const DEFAULT_NAMING: INaming = {
    parsing: {
        notes: [
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
        ],
        qualities: [
            [Qualities.Major, majorSymbols],
            [Qualities.Minor, minorSymbols],
            [Qualities.MinorMajor, combineLists(minorSymbols, majorSymbols)],
            [Qualities.Augmented, augmentedSymbols],
            [Qualities.AugmentedMajor, combineLists(augmentedSymbols, majorSymbols)],
            [Qualities.Diminished, ["0", "dim", "diminished", "°", "o", "O"]],
            [Qualities.HalfDiminished, ["Ø", "ø"]],
            [Qualities.Power, ["5", "no3"]],
        ],
        sevenths: [[Sevenths.Seventh, ["7"]]],
        ninths: [[Ninths.Major9, ["9"]], [Ninths.Minor9, ["b9", "♭9"]], [Ninths.Sharpened9, ["#9", "♯9"]]],
        elevenths: [
            [Elevenths.Perfect11, ["11"]],
            [Elevenths.Sharpened11, ["#11", "♯11"]],
            [Elevenths.Flattened11, ["b11", "♭11"]],
        ],
        thirteenths: [[Thirteenths.Major13, ["13"]], [Thirteenths.Minor13, ["b13", "♭13"]]],
        addeds: [
            [Addeds.Add9, ["add9", "2", "/9"]],
            [Addeds.Add11, ["add11", "4", "/11"]],
            [Addeds.Add13, ["add13", "6", "/13"]],
        ],
        suspendeds: [[Suspendeds.Sus4, ["sus4", "suspended", "sus"]], [Suspendeds.Sus2, ["sus2", "suspended2"]]],
        alteredFifths: [[AlteredFifths.Sharpened5, ["#5", "♯5"]], [AlteredFifths.Flattened5, ["b5", "♭5"]]],
    },
    printing: {
        notes: [
            [Notes.AFlat, "Ab"],
            [Notes.A, "A"],
            [Notes.ASharp, "A#"],
            [Notes.BFlat, "Bb"],
            [Notes.B, "B"],
            [Notes.C, "C"],
            [Notes.CSharp, "C#"],
            [Notes.DFlat, "Db"],
            [Notes.D, "D"],
            [Notes.DSharp, "D#"],
            [Notes.EFlat, "Eb"],
            [Notes.E, "E"],
            [Notes.F, "F"],
            [Notes.FSharp, "F#"],
            [Notes.GFlat, "Gb"],
            [Notes.G, "G"],
            [Notes.GSharp, "G#"],
        ],
        qualities: [
            [Qualities.Major, "maj"],
            [Qualities.Minor, "m"],
            [Qualities.MinorMajor, "mmaj"],
            [Qualities.Augmented, "aug"],
            [Qualities.AugmentedMajor, "augmaj"],
            [Qualities.Diminished, "dim"],
            [Qualities.HalfDiminished, "Ø"],
            [Qualities.Power, "5"],
        ],
        sevenths: [[Sevenths.Seventh, "7"]],
        ninths: [[Ninths.Major9, "9"], [Ninths.Minor9, "b9"], [Ninths.Sharpened9, "#9"]],
        elevenths: [[Elevenths.Perfect11, "11"], [Elevenths.Sharpened11, "#11"], [Elevenths.Flattened11, "b11"]],
        thirteenths: [[Thirteenths.Major13, "13"], [Thirteenths.Minor13, "b13"]],
        addeds: [[Addeds.Add9, "add9"], [Addeds.Add11, "add11"], [Addeds.Add13, "add13"]],
        suspendeds: [[Suspendeds.Sus4, "sus4"], [Suspendeds.Sus2, "sus2"]],
        alteredFifths: [[AlteredFifths.Sharpened5, "#5"], [AlteredFifths.Flattened5, "b5"]],
    },
};

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

export class Naming {
    private naming: INaming;

    /**
     * All potential string representations for each chord symbol part
     */
    public names: {
        notes: Map<Notes, string[]>;
        qualities: Map<Qualities, string[]>;
        sevenths: Map<Sevenths, string[]>;
        ninths: Map<Ninths, string[]>;
        elevenths: Map<Elevenths, string[]>;
        thirteenths: Map<Thirteenths, string[]>;
        addeds: Map<Addeds, string[]>;
        suspendeds: Map<Suspendeds, string[]>;
        alteredFifths: Map<AlteredFifths, string[]>;
    };

    /**
     * String representations preferred for printing for each chord symbol part
     */
    public preferredNames: {
        notes: Map<Notes, string>;
        qualities: Map<Qualities, string>;
        sevenths: Map<Sevenths, string>;
        ninths: Map<Ninths, string>;
        elevenths: Map<Elevenths, string>;
        thirteenths: Map<Thirteenths, string>;
        addeds: Map<Addeds, string>;
        suspendeds: Map<Suspendeds, string>;
        alteredFifths: Map<AlteredFifths, string>;
    };

    /**
     * Lookups from string representations to the corresponding chord symbol parts
     */
    public lookups: {
        notes: Map<string, Notes>;
        qualities: Map<string, Qualities>;
        sevenths: Map<string, Sevenths>;
        ninths: Map<string, Ninths>;
        elevenths: Map<string, Elevenths>;
        thirteenths: Map<string, Thirteenths>;
        addeds: Map<string, Addeds>;
        suspendeds: Map<string, Suspendeds>;
        alteredFifths: Map<string, AlteredFifths>;
    };

    public constructor(namingOverride?: Partial<INaming>) {
        this.naming = merge(DEFAULT_NAMING, namingOverride);
        this.names = {
            notes: new Map(this.naming.parsing.notes),
            qualities: new Map(this.naming.parsing.qualities),
            sevenths: new Map(this.naming.parsing.sevenths),
            ninths: new Map(this.naming.parsing.ninths),
            elevenths: new Map(this.naming.parsing.elevenths),
            thirteenths: new Map(this.naming.parsing.thirteenths),
            addeds: new Map(this.naming.parsing.addeds),
            suspendeds: new Map(this.naming.parsing.suspendeds),
            alteredFifths: new Map(this.naming.parsing.alteredFifths),
        };
        this.preferredNames = {
            notes: new Map(this.naming.printing.notes),
            qualities: new Map(this.naming.printing.qualities),
            sevenths: new Map(this.naming.printing.sevenths),
            ninths: new Map(this.naming.printing.ninths),
            elevenths: new Map(this.naming.printing.elevenths),
            thirteenths: new Map(this.naming.printing.thirteenths),
            addeds: new Map(this.naming.printing.addeds),
            suspendeds: new Map(this.naming.printing.suspendeds),
            alteredFifths: new Map(this.naming.printing.alteredFifths),
        };
        this.lookups = {
            notes: mapToLookup(this.names.notes),
            qualities: mapToLookup(this.names.qualities),
            sevenths: mapToLookup(this.names.sevenths),
            ninths: mapToLookup(this.names.ninths),
            elevenths: mapToLookup(this.names.elevenths),
            thirteenths: mapToLookup(this.names.thirteenths),
            addeds: mapToLookup(this.names.addeds),
            suspendeds: mapToLookup(this.names.suspendeds),
            alteredFifths: mapToLookup(this.names.alteredFifths),
        };
        this.checkValidityOrThrow();
    }

    private checkValidityOrThrow = () => {
        const enumKeys = {
            notes: Object.keys(Notes).map(key => Notes[key as any]),
            qualities: Object.keys(Qualities).map(key => Qualities[key as any]),
            sevenths: Object.keys(Sevenths).map(key => Sevenths[key as any]),
            ninths: Object.keys(Ninths).map(key => Ninths[key as any]),
            elevenths: Object.keys(Elevenths).map(key => Elevenths[key as any]),
            thirteenths: Object.keys(Thirteenths).map(key => Thirteenths[key as any]),
            addeds: Object.keys(Addeds).map(key => Addeds[key as any]),
            suspendeds: Object.keys(Suspendeds).map(key => Suspendeds[key as any]),
            alteredFifths: Object.keys(AlteredFifths).map(key => AlteredFifths[key as any]),
        };
        this.performCheckForChordPart(enumKeys.notes, this.names.notes, this.preferredNames.notes);
        this.performCheckForChordPart(enumKeys.qualities, this.names.qualities, this.preferredNames.qualities);
        this.performCheckForChordPart(enumKeys.sevenths, this.names.sevenths, this.preferredNames.sevenths);
        this.performCheckForChordPart(enumKeys.ninths, this.names.ninths, this.preferredNames.ninths);
        this.performCheckForChordPart(enumKeys.elevenths, this.names.elevenths, this.preferredNames.elevenths);
        this.performCheckForChordPart(enumKeys.thirteenths, this.names.thirteenths, this.preferredNames.thirteenths);
        this.performCheckForChordPart(enumKeys.addeds, this.names.addeds, this.preferredNames.addeds);
        this.performCheckForChordPart(enumKeys.suspendeds, this.names.suspendeds, this.preferredNames.suspendeds);
        this.performCheckForChordPart(
            enumKeys.alteredFifths,
            this.names.alteredFifths,
            this.preferredNames.alteredFifths,
        );
    };

    private performCheckForChordPart = <T>(
        enumKeys: string[],
        nameMap: Map<T, string[]>,
        preferredNameMap: Map<T, string>,
    ) => {
        // All enum values appear as map keys in both names and preferredNames
        this.checkAllEnumValuesAppearOrThrow(enumKeys, nameMap, preferredNameMap);
        // All preferredName values appear in names
        this.checkPreferredNameAppearsInNamesOrThrow(nameMap, preferredNameMap);
        // No names appear twice within a name map - otherwise the lookups would be ambiguous
        this.checkNamesAppearOnlyOnceOrThrow(nameMap);
    };

    private checkAllEnumValuesAppearOrThrow = <T>(
        enumKeys: string[],
        nameMap: Map<T, string[]>,
        preferredNameMap: Map<T, string>,
    ) => {
        const nameKeys = Array.from(nameMap.keys());
        const preferredNameKeys = Array.from(preferredNameMap.keys());
        const enumKeySetSize = new Set(enumKeys).size;
        const nameKeySetSize = new Set(nameKeys).size;
        const preferredNameKeySetSize = new Set(preferredNameKeys).size;
        if (enumKeySetSize !== nameKeySetSize) {
            throw new Error(
                `[chords] Naming: expected all of ${JSON.stringify(
                    enumKeys,
                )} to appear as keys in the name map, but only found ${JSON.stringify(enumKeys)}`,
            );
        }
        if (enumKeySetSize !== preferredNameKeySetSize) {
            throw new Error(
                `[chords] Naming: expected all of ${JSON.stringify(
                    enumKeys,
                )} to appear as keys in the preferredName map, but only found ${JSON.stringify(preferredNameKeys)}`,
            );
        }
    };

    private checkPreferredNameAppearsInNamesOrThrow = <T>(
        nameMap: Map<T, string[]>,
        preferredNameMap: Map<T, string>,
    ) => {
        preferredNameMap.forEach((preferredName, key) => {
            const names = nameMap.get(key);
            if (preferredName === undefined) {
                throw new Error(`[chords] Naming: preferred name value for '${key}' cannot be undefined`);
            }
            if (names === undefined) {
                throw new Error(`[chords] Naming: name list for '${key}' cannot be undefined`);
            }
            if (names.indexOf(preferredName) === -1) {
                throw new Error(
                    `[chords] Naming: preferred name '${preferredName}' for key '${key}' has to appear in the name list '${JSON.stringify(
                        names,
                    )}'`,
                );
            }
        });
    };

    private checkNamesAppearOnlyOnceOrThrow = <T>(nameMap: Map<T, string[]>) => {
        const allNames: string[] = [];
        nameMap.forEach(names => {
            allNames.push(...names);
        });
        const allNameSet = new Set(allNames);
        if (allNames.length !== allNameSet.size) {
            throw new Error(`[chords] Naming: some name appears twice in '${JSON.stringify(allNames)}'`);
        }
    };
}
