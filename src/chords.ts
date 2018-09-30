import { IChord } from "./types";
import { ChordParser } from "./chordParser";
import { ChordPrinter } from "./chordPrinter";

export class Chords {
    public parse(value: string): IChord | undefined {
        return ChordParser.parse(value);
    }

    public isChord(value: string): boolean {
        return this.parse(value) !== undefined;
    }

    public print(chord: IChord): string {
        return ChordPrinter.print(chord);
    }
}
