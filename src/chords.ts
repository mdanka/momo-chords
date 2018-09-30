import { IChord } from "./types";
import { Naming } from "./naming";
import { ChordParser } from "./chordParser";

export class Chords {
    public parse(value: string): IChord | undefined {
        return ChordParser.parse(value);
    }

    public isChord(value: string): boolean {
        return this.parse(value) !== undefined;
    }

    public print(chord: IChord): string {
        const { rootNote, quality, interval, added, suspended, bassNote } = chord;

        let name: string = "";
        name += rootNote;

        if (quality !== undefined) {
            const qualityNames = Naming.qualities.get(quality);
            if (qualityNames === undefined) {
                throw new Error(`[Chords] No name found for quality ${quality}`);
            }
            name += qualityNames[0];
        }

        if (interval !== undefined) {
            const intervalNames = Naming.intervals.get(interval);
            if (intervalNames === undefined) {
                throw new Error(`[Chords] No name found for interval ${interval}`);
            }
            name += intervalNames[0];
        }

        if (added !== undefined) {
            const addedNames = Naming.addeds.get(added);
            if (addedNames === undefined) {
                throw new Error(`[Chords] No name found for added ${added}`);
            }
            name += addedNames[0];
        }

        if (suspended !== undefined) {
            const suspendedNames = Naming.suspendeds.get(suspended);
            if (suspendedNames === undefined) {
                throw new Error(`[Chords] No name found for suspended ${suspended}`);
            }
            name += suspendedNames[0];
        }

        if (bassNote !== undefined) {
            name += "/" + bassNote;
        }

        return name;
    }
}
