import { IChord } from "./types";
import { Naming } from "./naming";

export namespace ChordPrinter {
    export function print(chord: IChord): string {
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
