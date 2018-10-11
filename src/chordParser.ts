import { ChordSymbolParser } from "./chordSymbolParser";
import {
    IChordSymbol,
    Qualities,
    Ninths,
    Elevenths,
    Thirteenths,
    Sevenths,
    Addeds,
    Suspendeds,
    AlteredFifths,
    IChordStructure,
    IChord,
} from "./types";

interface IConstraint {
    1?: boolean;
    2?: boolean;
    3?: boolean;
    4?: boolean;
    5?: boolean;
    6?: boolean;
    7?: boolean;
    8?: boolean;
    9?: boolean;
    10?: boolean;
    11?: boolean;
}

export namespace ChordParser {
    export function isValidString(value: string): boolean {
        return parseStringToChord(value) !== undefined;
    }

    export function isValidSymbol(chordSymbol: IChordSymbol): boolean {
        return parseSymbolToChord(chordSymbol) !== undefined;
    }

    export function parseStringToChord(value: string): IChord | undefined {
        const chordSymbol = ChordSymbolParser.parse(value);
        return chordSymbol === undefined ? undefined : parseSymbolToChord(chordSymbol);
    }

    export function parseStringToSymbol(value: string): IChordSymbol | undefined {
        const chordSymbol = ChordSymbolParser.parse(value);
        if (chordSymbol === undefined) {
            return undefined;
        }
        const isValid = ChordParser.isValidSymbol(chordSymbol);
        return isValid ? chordSymbol : undefined;
    }

    export function parseSymbolToChord(chordSymbol: IChordSymbol): IChord | undefined {
        return symbolToChord(chordSymbol);
    }

    function symbolToChord(chordSymbol: IChordSymbol): IChord | undefined {
        const constraints = symbolToConstraints(chordSymbol);
        const chordStructure = resolveConstraints(constraints);
        const chord =
            chordStructure === undefined
                ? undefined
                : {
                      ...chordStructure,
                      rootNote: chordSymbol.rootNote,
                      bassNote: chordSymbol.bassNote,
                  };
        return chord;
    }

    function resolveConstraints(constraints: IConstraint[]): IChordStructure | undefined {
        const collectedConstraints: Set<boolean | undefined>[] = [];
        for (let i = 0; i < 12; i++) {
            collectedConstraints.push(new Set());
        }
        constraints.forEach(constraint => {
            collectedConstraints[1].add(constraint[1]);
            collectedConstraints[2].add(constraint[2]);
            collectedConstraints[3].add(constraint[3]);
            collectedConstraints[4].add(constraint[4]);
            collectedConstraints[5].add(constraint[5]);
            collectedConstraints[6].add(constraint[6]);
            collectedConstraints[7].add(constraint[7]);
            collectedConstraints[8].add(constraint[8]);
            collectedConstraints[9].add(constraint[9]);
            collectedConstraints[10].add(constraint[10]);
            collectedConstraints[11].add(constraint[11]);
        });
        const chordMaybe = {
            1: constraintSetToValue(collectedConstraints[1]),
            2: constraintSetToValue(collectedConstraints[2]),
            3: constraintSetToValue(collectedConstraints[3]),
            4: constraintSetToValue(collectedConstraints[4]),
            5: constraintSetToValue(collectedConstraints[5]),
            6: constraintSetToValue(collectedConstraints[6]),
            7: constraintSetToValue(collectedConstraints[7]),
            8: constraintSetToValue(collectedConstraints[8]),
            9: constraintSetToValue(collectedConstraints[9]),
            10: constraintSetToValue(collectedConstraints[10]),
            11: constraintSetToValue(collectedConstraints[11]),
        };
        if (
            chordMaybe[1] === undefined ||
            chordMaybe[2] === undefined ||
            chordMaybe[3] === undefined ||
            chordMaybe[4] === undefined ||
            chordMaybe[5] === undefined ||
            chordMaybe[6] === undefined ||
            chordMaybe[7] === undefined ||
            chordMaybe[8] === undefined ||
            chordMaybe[9] === undefined ||
            chordMaybe[10] === undefined ||
            chordMaybe[11] === undefined
        ) {
            return undefined;
        }
        return {
            1: chordMaybe[1]!,
            2: chordMaybe[2]!,
            3: chordMaybe[3]!,
            4: chordMaybe[4]!,
            5: chordMaybe[5]!,
            6: chordMaybe[6]!,
            7: chordMaybe[7]!,
            8: chordMaybe[8]!,
            9: chordMaybe[9]!,
            10: chordMaybe[10]!,
            11: chordMaybe[11]!,
        };
    }

    function constraintSetToValue(constraintSet: Set<boolean | undefined>) {
        if (constraintSet.has(true) && constraintSet.has(false)) {
            return undefined;
        }
        if (constraintSet.has(true)) {
            return true;
        }
        return false;
    }

    function symbolToConstraints(symbol: IChordSymbol) {
        const constraints: IConstraint[] = [];
        const { quality, seventh, ninth, eleventh, thirteenth, addeds, suspendeds, alteredFifth } = symbol;
        const isExtended =
            seventh !== undefined || ninth !== undefined || eleventh !== undefined || thirteenth !== undefined;
        const qualityConstraints = isExtended ? qualityExtendedConstraints : qualityBasicConstraints;

        constraints.push(getConstraint(quality, qualityConstraints));
        constraints.push(getConstraint(seventh, seventhConstraints));
        constraints.push(getConstraint(ninth, ninthConstraints));
        constraints.push(getConstraint(eleventh, eleventhConstraints));
        constraints.push(getConstraint(thirteenth, thirteenthConstraints));
        constraints.push(...getConstraintsForSet(addeds, addedConstraints));
        constraints.push(...getConstraintsForSet(suspendeds, suspendedConstraints));
        constraints.push(getConstraint(alteredFifth, alteredFifthConstraints));

        /**
         * If the quality is not defined and the chord is extended, then
         * we have a dominant (minor) 7th.
         */
        if (quality === undefined && isExtended) {
            constraints.push({ 10: true });
        }
        // If 11 or 13 is present, then 9 is implied
        if (ninth === undefined && (eleventh !== undefined || thirteenth !== undefined)) {
            constraints.push({ 2: true });
        }
        // If 13 is present, then 11 is implied
        // TODO(mdanka): double-check this, there's an exception here somewhere
        if (eleventh === undefined && thirteenth !== undefined) {
            constraints.push({ 5: true });
        }
        /**
         * If the fifth is not specified via quality or alteration,
         * then it is perfect.
         */
        if (
            alteredFifth === undefined &&
            (quality === undefined ||
                [Qualities.Augmented, Qualities.AugmentedMajor, Qualities.Diminished, Qualities.HalfDiminished].indexOf(
                    quality,
                ) === -1)
        ) {
            constraints.push({ 7: true });
        }
        /**
         * If the quality is not defined or unclear and the thirds are not
         * already excluded or defined (e.g., by suspended chords or power chords), then the chord is a
         * major chord. E.g.: C, C7, C9, Cmaj7sus4
         */
        if ((quality === undefined || (quality === Qualities.Major && isExtended)) && suspendeds.size === 0) {
            constraints.push({ 4: true });
        }

        return constraints;
    }

    function getConstraintsForSet<T>(symbols: Set<T>, lookup: Map<T, IConstraint>) {
        const constraints: IConstraint[] = [];
        symbols.forEach((symbol: T) => {
            constraints.push(getConstraint(symbol, lookup));
        });
        return constraints;
    }

    function getConstraint<T>(symbol: T | undefined, lookup: Map<T, IConstraint>) {
        if (symbol === undefined) {
            return {};
        }
        const constraint = lookup.get(symbol);
        if (constraint === undefined) {
            throw new Error(`[chords] Couldn't find symbol '${symbol}' in the constraint lookup table`);
        }
        return constraint;
    }

    const qualityBasicConstraints: Map<Qualities, IConstraint> = new Map([
        [Qualities.Major, { 4: true }],
        [Qualities.Minor, { 3: true }],
        [Qualities.MinorMajor, undefined],
        [Qualities.Augmented, { 4: true, 8: true }],
        [Qualities.AugmentedMajor, undefined],
        [Qualities.Diminished, { 3: true, 6: true }],
        [Qualities.HalfDiminished, undefined],
        [
            Qualities.Power,
            {
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
                7: true,
                8: false,
                9: false,
                10: false,
                11: false,
            },
        ],
    ] as [Qualities, IConstraint][]);

    const qualityExtendedConstraints: Map<Qualities, IConstraint> = new Map([
        [Qualities.Major, { 11: true }], // third not specified because it might be a suspended chord
        [Qualities.Minor, { 3: true, 10: true }],
        [Qualities.MinorMajor, { 3: true, 11: true }],
        [Qualities.Augmented, { 4: true, 8: true, 10: true }],
        [Qualities.AugmentedMajor, { 4: true, 8: true, 11: true }],
        [Qualities.Diminished, { 3: true, 6: true, 9: true }],
        [Qualities.HalfDiminished, { 3: true, 6: true, 10: true }],
        [
            Qualities.Power,
            {
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
                7: true,
                8: false,
                9: false,
                10: false,
                11: false,
            },
        ],
    ] as [Qualities, IConstraint][]);

    const seventhConstraints: Map<Sevenths, IConstraint> = new Map([[Sevenths.Seventh, {}]] as [
        Sevenths,
        IConstraint
    ][]);

    const ninthConstraints: Map<Ninths, IConstraint> = new Map([
        [Ninths.Major9, { 2: true }],
        [Ninths.Minor9, { 1: true }],
        [Ninths.Sharpened9, { 3: true }],
    ] as [Ninths, IConstraint][]);

    const eleventhConstraints: Map<Elevenths, IConstraint> = new Map([
        [Elevenths.Perfect11, { 5: true }],
        [Elevenths.Sharpened11, { 6: true }],
        [Elevenths.Flattened11, { 4: true }],
    ] as [Elevenths, IConstraint][]);

    const thirteenthConstraints: Map<Thirteenths, IConstraint> = new Map([
        [Thirteenths.Major13, { 9: true }],
        [Thirteenths.Minor13, { 8: true }],
    ] as [Thirteenths, IConstraint][]);

    const addedConstraints: Map<Addeds, IConstraint> = new Map([
        [Addeds.Add9, { 2: true }],
        [Addeds.Add11, { 5: true }],
        [Addeds.Add13, { 9: true }],
    ] as [Addeds, IConstraint][]);

    // Suspendeds disallow the minor/major third
    const suspendedConstraints: Map<Suspendeds, IConstraint> = new Map([
        [Suspendeds.Sus4, { 3: false, 4: false, 5: true }],
        [Suspendeds.Sus2, { 2: true, 3: false, 4: false }],
    ] as [Suspendeds, IConstraint][]);

    // Altered fifths disallow the perfect fifth
    const alteredFifthConstraints: Map<AlteredFifths, IConstraint> = new Map([
        [AlteredFifths.Sharpened5, { 7: false, 8: true }],
        [AlteredFifths.Flattened5, { 6: true, 7: false }],
    ] as [AlteredFifths, IConstraint][]);
}
