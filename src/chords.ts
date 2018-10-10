import { IChordSymbol } from "./types";
import { ChordParser } from "./chordParser";
import { ChordPrinter } from "./chordPrinter";

export class Chords {
    public parse = (value: string): IChordSymbol | undefined => {
        return ChordParser.parse(value);
    };

    public isChord = (value: string): boolean => {
        return this.parse(value) !== undefined;
    };

    public print = (chord: IChordSymbol): string => {
        return ChordPrinter.print(chord);
    };
}
