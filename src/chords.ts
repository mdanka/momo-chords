import { IChord } from "./types";
import { Naming } from "./naming";

export class Chords {
    public parse(_value: string): IChord | undefined {
        return;
    }

    public isChord(value: string): boolean {
        return this.parse(value) !== undefined;
    }

    public print(chord: IChord): string {
        const { rootNote, quality, interval, added, suspended, bassNote } = chord;

        let name: string = "";
        name += rootNote;
        if (interval !== undefined) {
            name += Naming.intervals[interval][0];
        } else {
            name += Naming.qualities[quality][0];
        }

        if (added !== undefined) {
            name += Naming.addeds[added][0];
        }

        if (suspended !== undefined) {
            name += Naming.suspendeds[suspended][0];
        }

        if (bassNote !== undefined) {
            name += "/" + bassNote;
        }

        return name;
    }

    public search(_query: string): IChord[] {
        return [];
    }
}
