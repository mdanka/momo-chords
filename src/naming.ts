import { Quality, Interval, Added, Suspended } from "./types";

export namespace Naming {
    export const qualities = {
        [Quality.Major]: ["", "major", "maj", "M"],
        [Quality.Minor]: ["m", "minor", "min"],
        [Quality.Augmented]: ["aug", "augmented", "+"],
        [Quality.Diminished]: ["dim", "diminished"],
        [Quality.Power]: ["5"],
    };

    export const intervals = {
        [Interval.Major7]: ["maj7", "Maj7", "M7", "+7"],
        [Interval.Minor7]: ["m7", "Min7", "min7", "minor7", "-7"],
        [Interval.Dominant7]: ["7", "dom7", "dominant7"],
        [Interval.Diminished7]: ["dim7", "diminished7"],
        [Interval.Major9]: ["maj9", "M9", "9"],
        [Interval.Major11]: ["maj11", "M11", "11"],
        [Interval.Major13]: ["maj13", "M13", "13"],
        [Interval.AugmentedDominant7]: ["7#5", "7(#5]"],
        [Interval.AugmentedMajor7]: ["maj7#5", "maj7(#5]"],
    };

    export const addeds = {
        [Added.Add9]: ["add9", "2"],
        [Added.Add11]: ["add11", "4"],
        [Added.Major6]: ["6", "maj6", "major6", "M6"],
        [Added.SixNine]: ["6/9"],
    };

    export const suspendeds = {
        [Suspended.Sus4]: ["sus4", "suspended", "sus"],
        [Suspended.Sus2]: ["sus2", "suspended2"],
    };

    export const qualitiesLookup = mapToLookup(qualities);
    export const intervalsLookup = mapToLookup(intervals);
    export const addedsLookup = mapToLookup(addeds);
    export const suspendedsLookup = mapToLookup(suspendeds);

    export const intervalToQuality = {
        [Interval.Major7]: Quality.Major,
        [Interval.Minor7]: Quality.Minor,
        [Interval.Dominant7]: Quality.Major,
        [Interval.Diminished7]: Quality.Diminished,
        [Interval.Major9]: Quality.Major,
        [Interval.Major11]: Quality.Major,
        [Interval.Major13]: Quality.Major,
        [Interval.AugmentedDominant7]: Quality.Augmented,
        [Interval.AugmentedMajor7]: Quality.Augmented,
    };

    function mapToLookup(map: { [key: string]: string[] }) {
        const lookup: { [key: string]: string } = {};
        Object.keys(map).forEach(key => {
            const values = map[key];
            values.forEach(value => (lookup[value] = key));
        });
        return lookup;
    }
}
