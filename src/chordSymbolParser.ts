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
    addedStrings: Added[];
    suspendedStrings: Suspended[];
    alteredFifthString: AlteredFifth | undefined;
    bassNoteString: Note | undefined;
}

interface IMatchingOptions {
    isMatching: boolean;
    isOptional: boolean;
    isShortestFirst: boolean;
    isMultiple: boolean;
}

export namespace ChordSymbolParser {
    const chordsRegex = getChordsRegex();

    export function parse(value: string): IChordSymbol | undefined {
        const regexResult = matchChordsRegex(value);
        return chordsRegexMatchToChord(regexResult);
    }

    function chordsRegexMatchToChord(result: IChordsRegexMatch | undefined): IChordSymbol | undefined {
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
            rootNoteString === undefined ? undefined : Naming.notesLookup.get(rootNoteString);
        if (rootNote === undefined) {
            throw new Error(`[chords] Error when parsing chord: couldn't find root note ${rootNoteString}`);
        }
        const quality: Qualities | undefined =
            qualityString === undefined ? undefined : Naming.qualitiesLookup.get(qualityString);
        const seventh: Sevenths | undefined =
            seventhString === undefined ? undefined : Naming.seventhsLookup.get(seventhString);
        const ninth: Ninths | undefined = ninthString === undefined ? undefined : Naming.ninthsLookup.get(ninthString);
        const eleventh: Elevenths | undefined =
            eleventhString === undefined ? undefined : Naming.eleventhsLookup.get(eleventhString);
        const thirteenth: Thirteenths | undefined =
            thirteenthString === undefined ? undefined : Naming.thirteenthsLookup.get(thirteenthString);
        const addeds: Set<Addeds> = new Set(
            addedStrings.map(addedString => Naming.addedsLookup.get(addedString)),
        ) as Set<Addeds>;
        const suspendeds: Set<Suspendeds> = new Set(
            suspendedStrings.map(suspendedString => Naming.suspendedsLookup.get(suspendedString)),
        ) as Set<Suspendeds>;
        const alteredFifth: AlteredFifths | undefined =
            alteredFifthString === undefined ? undefined : Naming.alteredFifthsLookup.get(alteredFifthString);
        const bassNote: Notes | undefined =
            bassNoteString === undefined ? undefined : Naming.notesLookup.get(bassNoteString);

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

    function matchChordsRegex(value: string): IChordsRegexMatch | undefined {
        const result = value.match(new RegExp(chordsRegex));
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

    function getChordsRegex() {
        return getRegexEntireStringMatch(getChordsContentRegex());
    }

    function getChordsContentRegex() {
        // This will create a regex matching (rootNote)(quality)(interval7,9,11,13)?(added)?(suspended)?(alteredFifth)?(?:/(bassNote))?
        return `${getRootNotesRegex()}${getQualitiesRegex()}${getSeventhsRegex()}${getNinthsRegex()}${getEleventhsRegex()}${getThirteenthsRegex()}${getAddedsRegex()}${getSuspendedsRegex()}${getAlteredFifthsRegex()}${getBassNotesRegex()}`;
    }

    function getRootNotesRegex() {
        return getRegexFromArrayMap(Naming.notes, {
            isMatching: true,
            isOptional: false,
            isShortestFirst: false,
            isMultiple: false,
        });
    }

    function getQualitiesRegex() {
        // Note that with qualities we take the shortest first, because we'd like the interval to consume characters when posible
        return getRegexFromArrayMap(Naming.qualities, {
            isMatching: true,
            isOptional: true,
            isShortestFirst: true,
            isMultiple: false,
        });
    }

    function getSeventhsRegex() {
        return getRegexFromArrayMap(Naming.sevenths, {
            isMatching: true,
            isOptional: true,
            isShortestFirst: false,
            isMultiple: false,
        });
    }

    function getNinthsRegex() {
        return getRegexFromArrayMap(Naming.ninths, {
            isMatching: true,
            isOptional: true,
            isShortestFirst: false,
            isMultiple: false,
        });
    }

    function getEleventhsRegex() {
        return getRegexFromArrayMap(Naming.elevenths, {
            isMatching: true,
            isOptional: true,
            isShortestFirst: false,
            isMultiple: false,
        });
    }

    function getThirteenthsRegex() {
        return getRegexFromArrayMap(Naming.thirteenths, {
            isMatching: true,
            isOptional: true,
            isShortestFirst: false,
            isMultiple: false,
        });
    }

    function getAddedsRegex() {
        return getRegexFromOrderedEnumValues(addedOrder, Naming.addeds);
    }

    function getSuspendedsRegex() {
        return getRegexFromOrderedEnumValues(suspendedOrder, Naming.suspendeds);
    }

    function getAlteredFifthsRegex() {
        return getRegexFromArrayMap(Naming.alteredFifths, {
            isMatching: true,
            isOptional: true,
            isShortestFirst: false,
            isMultiple: false,
        });
    }

    function getBassNotesRegex() {
        return getRegexGroup(
            "/" +
                getRegexFromArrayMap(Naming.notes, {
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

    function getRegexFromOrderedEnumValues<T>(order: T[], naming: Map<T, string[]>) {
        const orderedNames = order.map(value => naming.get(value)).filter(value => value !== undefined) as string[][];
        const regexes = orderedNames.map(name =>
            getRegexFromStringList(name, {
                isMatching: true,
                isOptional: true,
                isShortestFirst: false,
                isMultiple: false,
            }),
        );
        return regexes.join("");
    }

    function getRegexFromArrayMap<T>(map: Map<T, string[]>, matchingOptions: IMatchingOptions) {
        const values = getValuesFromArrayMap(map);
        return getRegexFromStringList(values, matchingOptions);
    }

    function getRegexFromStringList(values: string[], matchingOptions: IMatchingOptions) {
        const { isShortestFirst, isMatching, isOptional, isMultiple } = matchingOptions;
        const sortedValues = sortValuesByLength(values, isShortestFirst);
        const escapedValues = sortedValues.map(escapeRegex);
        const disjunction = getRegexDisjunction(escapedValues, isMatching, isOptional, isMultiple);
        return disjunction;
    }

    function getRegexDisjunction(values: string[], isMatching: boolean, isOptional: boolean, isMultiple: boolean) {
        return getRegexGroup(values.join("|"), isMatching, isOptional, isMultiple);
    }

    function getRegexGroup(regex: string, isMatching: boolean, isOptional: boolean, isMultiple: boolean) {
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

    function getRegexEntireStringMatch(regex: string) {
        return `^${regex}$`;
    }

    function sortValuesByLength(values: string[], isShortestFirst: boolean) {
        const resultMultiplier = isShortestFirst ? 1 : -1;
        return values.sort(function(a, b) {
            const lengthDifference = a.length - b.length;
            if (lengthDifference !== 0) {
                return (lengthDifference < 0 ? -1 : 1) * resultMultiplier;
            }
            return (a > b ? -1 : 1) * resultMultiplier;
        });
    }

    function getValuesFromArrayMap<T>(map: Map<T, string[]>) {
        const result: string[] = [];
        map.forEach(value => result.push(...value));
        return result;
    }

    // Based on https://stackoverflow.com/a/6969486
    function escapeRegex(value: string) {
        return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
}
