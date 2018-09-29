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

// tslint:disable

interface IChordsRegexMatch {
    rootNoteString: Note;
    qualityString: Quality | undefined;
    intervalString: Interval | undefined;
    addedString: Added | undefined;
    suspendedString: Suspended | undefined;
    bassNoteString: Note | undefined;
}

export namespace ChordParser {
    const chordsRegex = getChordsRegex();
    console.log(chordsRegex);

    export function parse(value: string): IChord | undefined {
        const regexResult = matchChordsRegex(value);
        console.log(regexResult);
        return chordsRegexMatchToChord(regexResult);
    }

    function chordsRegexMatchToChord(result: IChordsRegexMatch | undefined): IChord | undefined {
        if (result === undefined) {
            return undefined;
        }
        const { rootNoteString, qualityString, intervalString, addedString, suspendedString, bassNoteString } = result;
        console.log(rootNoteString);
        console.log(Notes);
        const rootNote: Notes | undefined = rootNoteString === undefined ? undefined : Naming.notesLookup.get(rootNoteString);
        if (rootNote === undefined) {
            throw new Error(`[chords] Error when parsing chord: couldn't find root note ${rootNoteString}`);
        }
        console.log(rootNote);
        const qualityMaybe: Qualities | undefined = qualityString === undefined ? undefined : Naming.qualitiesLookup.get(qualityString);
        const interval: Intervals | undefined = intervalString === undefined ? undefined : Naming.intervalsLookup.get(intervalString);
        const added: Addeds | undefined = addedString === undefined ? undefined : Naming.addedsLookup.get(addedString);
        const suspended: Suspendeds | undefined =
            suspendedString === undefined ? undefined : Naming.suspendedsLookup.get(suspendedString);
        const bassNote: Notes | undefined = bassNoteString === undefined ? undefined : Naming.notesLookup.get(bassNoteString);

        const inferredQuality = interval === undefined ? undefined : Naming.intervalToQuality.get(interval);
        if (qualityMaybe === undefined && inferredQuality === undefined) {
            throw new Error(`[chords] Error when parsing chord: quality and interval cannot both be empty`);
        }
        // The ! is legitimate because of the check above: if qualityMaybe is undefined then inferredQuality cannot be undefined
        const quality: Qualities = qualityMaybe === undefined ? inferredQuality! : qualityMaybe;

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
                  qualityString: result[2] as Quality | undefined,
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
        // This will create a regex matching (rootNote)(?:(quality)|(interval))(added)?(suspended)?(?:/(bassNote))?
        return `${getRootNotesRegex()}${getQualitiesOrIntervalsRegex()}${getAddedsRegex()}${getSuspendedsRegex()}${getBassNotesRegex()}`;
    }

    function getRootNotesRegex() {
        return getRegexFromStringList(getNotes(), true, false);
    }

    function getQualitiesOrIntervalsRegex() {
        return getRegexDisjunction([getQualitiesRegex(), getIntervalsRegex()], false, false);
    }

    function getQualitiesRegex() {
        return getRegexFromArrayMap(Naming.qualities, true, false);
    }

    function getIntervalsRegex() {
        return getRegexFromArrayMap(Naming.intervals, true, false);
    }

    function getAddedsRegex() {
        return getRegexFromArrayMap(Naming.addeds, true, true);
    }

    function getSuspendedsRegex() {
        return getRegexFromArrayMap(Naming.suspendeds, true, true);
    }

    function getBassNotesRegex() {
        return getRegexGroup(getRegexFromStringList(getNotes(), true, false), false, true);
    }

    function getRegexFromArrayMap<T>(map: Map<T, string[]>, isMatching: boolean, isOptional: boolean) {
        const values = getValuesFromArrayMap(map);
        return getRegexFromStringList(values, isMatching, isOptional);
    }

    function getRegexFromStringList(values: string[], isMatching: boolean, isOptional: boolean) {
        const sortedValues = sortValuesByLength(values);
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

    function sortValuesByLength(values: string[]) {
        return values.sort(function(a, b) {
            const lengthDifference = b.length - a.length;
            if (lengthDifference !== 0) {
                return lengthDifference < 0 ? -1 : 1;
            }
            return a < b ? -1 : 1;
        });
    }

    function getNotes() {
        const values: string[] = [];
        for (const key in Notes) {
            const value: string = Notes[key];
            values.push(value);
        }
        return values;
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
