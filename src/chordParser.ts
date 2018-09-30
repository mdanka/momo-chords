import {
    IChord,
    Notes,
    Note,
    Qualities,
    Intervals,
    Addeds,
    Suspendeds,
    Quality,
    Interval,
    Suspended,
    Added,
} from "./types";
import { Naming } from "./naming";

interface IChordsRegexMatch {
    rootNoteString: Note;
    qualityString: Quality | undefined;
    intervalString: Interval | undefined;
    addedString: Added | undefined;
    suspendedString: Suspended | undefined;
    bassNoteString: Note | undefined;
}

interface IMatchingOptions {
    isMatching: boolean;
    isOptional: boolean;
    isShortestFirst: boolean;
}

export namespace ChordParser {
    const chordsRegex = getChordsRegex();

    export function parse(value: string): IChord | undefined {
        const regexResult = matchChordsRegex(value);
        return chordsRegexMatchToChord(regexResult);
    }

    function chordsRegexMatchToChord(result: IChordsRegexMatch | undefined): IChord | undefined {
        if (result === undefined) {
            return undefined;
        }
        const { rootNoteString, qualityString, intervalString, addedString, suspendedString, bassNoteString } = result;
        const rootNote: Notes | undefined =
            rootNoteString === undefined ? undefined : Naming.notesLookup.get(rootNoteString);
        if (rootNote === undefined) {
            throw new Error(`[chords] Error when parsing chord: couldn't find root note ${rootNoteString}`);
        }
        const quality: Qualities | undefined =
            qualityString === undefined ? undefined : Naming.qualitiesLookup.get(qualityString);
        if (quality === undefined) {
            throw new Error(`[chords] Error when parsing chord: couldn't find quality ${qualityString}`);
        }
        const interval: Intervals | undefined =
            intervalString === undefined ? undefined : Naming.intervalsLookup.get(intervalString);
        const added: Addeds | undefined = addedString === undefined ? undefined : Naming.addedsLookup.get(addedString);
        const suspended: Suspendeds | undefined =
            suspendedString === undefined ? undefined : Naming.suspendedsLookup.get(suspendedString);
        const bassNote: Notes | undefined =
            bassNoteString === undefined ? undefined : Naming.notesLookup.get(bassNoteString);

        return {
            rootNote,
            quality,
            interval,
            added,
            suspended,
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
                  intervalString: result[3] as Interval | undefined,
                  addedString: result[4] as Added | undefined,
                  suspendedString: result[5] as Suspended | undefined,
                  bassNoteString: result[6] as Note | undefined,
              };
    }

    function getChordsRegex() {
        return getRegexEntireStringMatch(getChordsContentRegex());
    }

    function getChordsContentRegex() {
        // This will create a regex matching (rootNote)(quality)(interval)?(added)?(suspended)?(?:/(bassNote))?
        return `${getRootNotesRegex()}${getQualitiesRegex()}${getIntervalsRegex()}${getAddedsRegex()}${getSuspendedsRegex()}${getBassNotesRegex()}`;
    }

    function getRootNotesRegex() {
        return getRegexFromArrayMap(Naming.notes, { isMatching: true, isOptional: false, isShortestFirst: false });
    }

    function getQualitiesRegex() {
        // Note that with qualities we take the shortest first, because we'd like the interval to consume characters when posible
        return getRegexFromArrayMap(Naming.qualities, { isMatching: true, isOptional: false, isShortestFirst: true });
    }

    function getIntervalsRegex() {
        return getRegexFromArrayMap(Naming.intervals, { isMatching: true, isOptional: true, isShortestFirst: false });
    }

    function getAddedsRegex() {
        return getRegexFromArrayMap(Naming.addeds, { isMatching: true, isOptional: true, isShortestFirst: false });
    }

    function getSuspendedsRegex() {
        return getRegexFromArrayMap(Naming.suspendeds, { isMatching: true, isOptional: true, isShortestFirst: false });
    }

    function getBassNotesRegex() {
        return getRegexGroup(
            "/" + getRegexFromArrayMap(Naming.notes, { isMatching: true, isOptional: false, isShortestFirst: false }),
            false,
            true,
        );
    }

    function getRegexFromArrayMap<T>(map: Map<T, string[]>, matchingOptions: IMatchingOptions) {
        const values = getValuesFromArrayMap(map);
        return getRegexFromStringList(values, matchingOptions);
    }

    function getRegexFromStringList(values: string[], matchingOptions: IMatchingOptions) {
        const { isShortestFirst, isMatching, isOptional } = matchingOptions;
        const sortedValues = sortValuesByLength(values, isShortestFirst);
        const escapedValues = sortedValues.map(escapeRegex);
        const disjunction = getRegexDisjunction(escapedValues, isMatching, isOptional);
        return disjunction;
    }

    function getRegexDisjunction(values: string[], isMatching: boolean, isOptional: boolean) {
        return getRegexGroup(values.join("|"), isMatching, isOptional);
    }

    function getRegexGroup(regex: string, isMatching: boolean, isOptional: boolean) {
        return `(${isMatching ? "" : "?:"}${regex})${isOptional ? "?" : ""}`;
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
