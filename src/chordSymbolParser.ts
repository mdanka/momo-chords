import {
    IChordSymbol,
    Notes,
    Note,
    Qualities,
    Addeds,
    Suspendeds,
    Quality,
    Suspended,
    Added,
    AlteredFifth,
    Seventh,
    Ninth,
    Eleventh,
    Thirteenth,
    Sevenths,
    Ninths,
    Elevenths,
    Thirteenths,
    AlteredFifths,
    addedOrder,
    suspendedOrder,
} from "./types";
import { Naming } from "./naming";

interface IChordsRegexMatch {
    rootNoteString: Note;
    qualityString: Quality | undefined;
    seventhString: Seventh | undefined;
    ninthString: Ninth | undefined;
    eleventhString: Eleventh | undefined;
    thirteenthString: Thirteenth | undefined;
    addedStrings: (Added | undefined)[];
    suspendedStrings: (Suspended | undefined)[];
    alteredFifthString: AlteredFifth | undefined;
    bassNoteString: Note | undefined;
}

interface IMatchingOptions {
    isMatching: boolean;
    isOptional: boolean;
    isShortestFirst: boolean;
    isMultiple: boolean;
}

export class ChordSymbolParser {
    private chordsRegex: string;
    private naming: Naming;

    public constructor(naming: Naming) {
        this.naming = naming;
        this.chordsRegex = this.getChordsRegex();
    }

    public parse(value: string): IChordSymbol | undefined {
        const regexResult = this.matchChordsRegex(value);
        const symbol = this.chordsRegexMatchToChord(regexResult);
        if (symbol === undefined) {
            return undefined;
        }
        const isValid = this.isSymbolValid(symbol);
        return isValid ? symbol : undefined;
    }

    private isSymbolValid(chordSymbol: IChordSymbol): boolean {
        const { quality, seventh, ninth, eleventh, thirteenth, addeds, suspendeds, alteredFifth } = chordSymbol;
        /**
         * The alteredFifth cannot appear at the same time with fifth-altering qualities.
         * For example, no Cdimb5
         */
        const isAlteredFifthOk =
            alteredFifth === undefined ||
            new Set([undefined, Qualities.Major, Qualities.Minor, Qualities.MinorMajor, Qualities.Power]).has(quality);
        /**
         * The power chord cannot appear with other modifiers.
         */
        const isPowerChordOk =
            quality !== Qualities.Power ||
            (seventh === undefined &&
                ninth === undefined &&
                eleventh === undefined &&
                thirteenth === undefined &&
                addeds.size === 0 &&
                suspendeds.size === 0 &&
                alteredFifth === undefined);
        return isAlteredFifthOk && isPowerChordOk;
    }

    private chordsRegexMatchToChord(result: IChordsRegexMatch | undefined): IChordSymbol | undefined {
        if (result === undefined) {
            return undefined;
        }
        const {
            rootNoteString,
            qualityString,
            seventhString,
            ninthString,
            eleventhString,
            thirteenthString,
            addedStrings,
            suspendedStrings,
            alteredFifthString,
            bassNoteString,
        } = result;
        const rootNote: Notes | undefined =
            rootNoteString === undefined ? undefined : this.naming.lookups.notes.get(rootNoteString);
        if (rootNote === undefined) {
            throw new Error(`[chords] Error when parsing chord: couldn't find root note ${rootNoteString}`);
        }
        const quality: Qualities | undefined =
            qualityString === undefined ? undefined : this.naming.lookups.qualities.get(qualityString);
        const seventh: Sevenths | undefined =
            seventhString === undefined ? undefined : this.naming.lookups.sevenths.get(seventhString);
        const ninth: Ninths | undefined =
            ninthString === undefined ? undefined : this.naming.lookups.ninths.get(ninthString);
        const eleventh: Elevenths | undefined =
            eleventhString === undefined ? undefined : this.naming.lookups.elevenths.get(eleventhString);
        const thirteenth: Thirteenths | undefined =
            thirteenthString === undefined ? undefined : this.naming.lookups.thirteenths.get(thirteenthString);
        const addeds: Set<Addeds> = new Set(
            addedStrings
                .map(
                    addedString =>
                        addedString === undefined ? undefined : this.naming.lookups.addeds.get(addedString),
                )
                .filter(value => value !== undefined),
        ) as Set<Addeds>;
        const suspendeds: Set<Suspendeds> = new Set(
            suspendedStrings
                .map(
                    suspendedString =>
                        suspendedString === undefined ? undefined : this.naming.lookups.suspendeds.get(suspendedString),
                )
                .filter(value => value !== undefined),
        ) as Set<Suspendeds>;
        const alteredFifth: AlteredFifths | undefined =
            alteredFifthString === undefined ? undefined : this.naming.lookups.alteredFifths.get(alteredFifthString);
        const bassNote: Notes | undefined =
            bassNoteString === undefined ? undefined : this.naming.lookups.notes.get(bassNoteString);

        return {
            rootNote,
            quality,
            seventh,
            ninth,
            eleventh,
            thirteenth,
            addeds,
            suspendeds,
            alteredFifth,
            bassNote,
        };
    }

    private matchChordsRegex(value: string): IChordsRegexMatch | undefined {
        const result = value.match(new RegExp(this.chordsRegex));
        return result === null
            ? undefined
            : {
                  rootNoteString: result[1] as Note,
                  qualityString: result[2] as Quality,
                  seventhString: result[3] as Seventh | undefined,
                  ninthString: result[4] as Ninth | undefined,
                  eleventhString: result[5] as Eleventh | undefined,
                  thirteenthString: result[6] as Thirteenth | undefined,
                  addedStrings: [result[7], result[8], result[9]] as Added[],
                  suspendedStrings: [result[10], result[11]] as Suspended[],
                  alteredFifthString: result[12] as AlteredFifth | undefined,
                  bassNoteString: result[13] as Note | undefined,
              };
    }

    private getChordsRegex() {
        return this.getRegexEntireStringMatch(this.getChordsContentRegex());
    }

    private getChordsContentRegex() {
        // This will create a regex matching (rootNote)(quality)(interval7,9,11,13)?(added)?(suspended)?(alteredFifth)?(?:/(bassNote))?
        return `${this.getRootNotesRegex()}${this.getQualitiesRegex()}${this.getSeventhsRegex()}${this.getNinthsRegex()}${this.getEleventhsRegex()}${this.getThirteenthsRegex()}${this.getAddedsRegex()}${this.getSuspendedsRegex()}${this.getAlteredFifthsRegex()}${this.getBassNotesRegex()}`;
    }

    private getRootNotesRegex() {
        return this.getRegexFromArrayMap(this.naming.names.notes, {
            isMatching: true,
            isOptional: false,
            isShortestFirst: false,
            isMultiple: false,
        });
    }

    private getQualitiesRegex() {
        // Note that with qualities we take the shortest first, because we'd like the interval to consume characters when posible
        return this.getRegexFromArrayMap(this.naming.names.qualities, {
            isMatching: true,
            isOptional: true,
            isShortestFirst: true,
            isMultiple: false,
        });
    }

    private getSeventhsRegex() {
        return this.getRegexFromArrayMap(this.naming.names.sevenths, {
            isMatching: true,
            isOptional: true,
            isShortestFirst: false,
            isMultiple: false,
        });
    }

    private getNinthsRegex() {
        return this.getRegexFromArrayMap(this.naming.names.ninths, {
            isMatching: true,
            isOptional: true,
            isShortestFirst: false,
            isMultiple: false,
        });
    }

    private getEleventhsRegex() {
        return this.getRegexFromArrayMap(this.naming.names.elevenths, {
            isMatching: true,
            isOptional: true,
            isShortestFirst: false,
            isMultiple: false,
        });
    }

    private getThirteenthsRegex() {
        return this.getRegexFromArrayMap(this.naming.names.thirteenths, {
            isMatching: true,
            isOptional: true,
            isShortestFirst: false,
            isMultiple: false,
        });
    }

    private getAddedsRegex() {
        return this.getRegexFromOrderedEnumValues(addedOrder, this.naming.names.addeds);
    }

    private getSuspendedsRegex() {
        return this.getRegexFromOrderedEnumValues(suspendedOrder, this.naming.names.suspendeds);
    }

    private getAlteredFifthsRegex() {
        return this.getRegexFromArrayMap(this.naming.names.alteredFifths, {
            isMatching: true,
            isOptional: true,
            isShortestFirst: false,
            isMultiple: false,
        });
    }

    private getBassNotesRegex() {
        return this.getRegexGroup(
            "/" +
                this.getRegexFromArrayMap(this.naming.names.notes, {
                    isMatching: true,
                    isOptional: false,
                    isShortestFirst: false,
                    isMultiple: false,
                }),
            false,
            true,
            false,
        );
    }

    private getRegexFromOrderedEnumValues<T>(order: T[], naming: Map<T, string[]>) {
        const orderedNames = order.map(value => naming.get(value)).filter(value => value !== undefined) as string[][];
        const regexes = orderedNames.map(name =>
            this.getRegexFromStringList(name, {
                isMatching: true,
                isOptional: true,
                isShortestFirst: false,
                isMultiple: false,
            }),
        );
        return regexes.join("");
    }

    private getRegexFromArrayMap<T>(map: Map<T, string[]>, matchingOptions: IMatchingOptions) {
        const values = this.getValuesFromArrayMap(map);
        return this.getRegexFromStringList(values, matchingOptions);
    }

    private getRegexFromStringList(values: string[], matchingOptions: IMatchingOptions) {
        const { isShortestFirst, isMatching, isOptional, isMultiple } = matchingOptions;
        const sortedValues = this.sortValuesByLength(values, isShortestFirst);
        const escapedValues = sortedValues.map(this.escapeRegex);
        const disjunction = this.getRegexDisjunction(escapedValues, isMatching, isOptional, isMultiple);
        return disjunction;
    }

    private getRegexDisjunction(values: string[], isMatching: boolean, isOptional: boolean, isMultiple: boolean) {
        return this.getRegexGroup(values.join("|"), isMatching, isOptional, isMultiple);
    }

    private getRegexGroup(regex: string, isMatching: boolean, isOptional: boolean, isMultiple: boolean) {
        let qualifier: string;
        if (isOptional && isMultiple) {
            qualifier = "*";
        } else if (isOptional && !isMultiple) {
            qualifier = "?";
        } else if (!isOptional && isMultiple) {
            qualifier = "+";
        } else {
            qualifier = "";
        }
        return `(${isMatching ? "" : "?:"}${regex})${qualifier}`;
    }

    private getRegexEntireStringMatch(regex: string) {
        return `^${regex}$`;
    }

    private sortValuesByLength(values: string[], isShortestFirst: boolean) {
        const resultMultiplier = isShortestFirst ? 1 : -1;
        return values.sort(function(a, b) {
            const lengthDifference = a.length - b.length;
            if (lengthDifference !== 0) {
                return (lengthDifference < 0 ? -1 : 1) * resultMultiplier;
            }
            return (a > b ? -1 : 1) * resultMultiplier;
        });
    }

    private getValuesFromArrayMap<T>(map: Map<T, string[]>) {
        const result: string[] = [];
        map.forEach(value => result.push(...value));
        return result;
    }

    // Based on https://stackoverflow.com/a/6969486
    private escapeRegex(value: string) {
        return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
}
