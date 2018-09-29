import { IChord, Note, Quality, Interval, Added, Suspended } from "./types";
import { Naming } from "./naming";

interface IChordsRegexMatch {
    rootNote: string;
    qualityOrInterval: string;
    added: string | undefined;
    suspended: string | undefined;
    bassNote: string | undefined;
}

export namespace ChordParser {
    const chordsRegex = getChordsRegex();

    export function parse(_value: string): IChord | undefined {
        return;
    }

    function chordsRegexMatchToChord(result: IChordsRegexMatch | undefined): IChord | undefined {
        if (result === undefined) {
            return undefined;
        }
        const { rootNote: rootNoteString, bassNote: bassNoteString } = result;
        const qualityMaybeString: string | undefined = Naming.qualitiesLookup[result.qualityOrInterval];
        const intervalString: string | undefined = Naming.intervalsLookup[result.qualityOrInterval];
        const addedString: string | undefined =
            result.added === undefined ? undefined : Naming.addedsLookup[result.added];
        const suspendedString: string | undefined =
            result.suspended === undefined ? undefined : Naming.suspendedsLookup[result.suspended];

        // const rootNote: Note | undefined = Note[rootNoteString as Note];
        const rootNote: Note | undefined = rootNoteString === undefined ? undefined : Note[rootNoteString as Note];
        const interval: Interval | undefined =
            intervalString === undefined ? undefined : Interval[intervalString as Interval];
        const qualityMaybe: Quality | undefined =
            qualityMaybeString === undefined ? undefined : Quality[qualityMaybeString as Quality];
        // the ! is legitimate because if quality is undefined then interval cannot be undefined
        const quality = qualityMaybe === undefined ? Naming.intervalToQuality[interval!] : qualityMaybe;
        const added: Added | undefined = addedString === undefined ? undefined : Added[addedString as Added];
        const suspended: Suspended | undefined =
            suspendedString === undefined ? undefined : Suspended[suspendedString as Suspended];
        return {
            rootNote: Note[rootNote],
            quality,
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
                  rootNote: result[1],
                  qualityOrInterval: result[2],
                  added: result[3],
                  suspended: result[4],
                  bassNote: result[5],
              };
    }

    function getChordsRegex() {
        // This will create a regex matching (rootNote)(quality|interval)(added)?(suspended)?(/bassNote)?
        return `${getRootNotesRegex()}${getQualitiesOrIntervalsRegex()}${getAddedsRegex()}${getSuspendedsRegex()}${getBassNotesRegex()}`;
    }

    function getRootNotesRegex() {
        return getRegexFromStringList(getNotes(), true, false);
    }

    function getQualitiesOrIntervalsRegex() {
        return getRegexFromArrayMap({ ...Naming.qualities, ...Naming.intervals }, true, false);
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

    function getRegexFromArrayMap(map: { [key: string]: string[] }, isMatching: boolean, isOptional: boolean) {
        const values = getValuesFromArrayMap(map);
        return getRegexFromStringList(values, isMatching, isOptional);
    }

    function getRegexFromStringList(values: string[], isMatching: boolean, isOptional: boolean) {
        const sortedValues = sortValuesByLength(values);
        const disjunction = getRegexDisjunctionOfValues(sortedValues, isMatching, isOptional);
        return disjunction;
    }

    function getRegexDisjunctionOfValues(values: string[], isMatching: boolean, isOptional: boolean) {
        return getRegexGroup(values.map(escapeRegex).join("|"), isMatching, isOptional);
    }

    function getRegexGroup(regex: string, isMatching: boolean, isOptional: boolean) {
        return "(" + (isMatching ? "" : "?:") + regex + ")" + (isOptional ? "?" : "");
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
        for (const key in Note) {
            const value: string = Note[key];
            values.push(value);
        }
        return values;
    }

    function getValuesFromArrayMap(map: { [key: string]: string[] }) {
        const result: string[] = [];
        Object.keys(map)
            .map(key => map[key])
            .forEach(list => result.concat(list));
        return result;
    }

    // Based on https://stackoverflow.com/a/6969486
    function escapeRegex(value: string) {
        return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
}
