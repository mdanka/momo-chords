import { IChordSymbol, IChord } from "./types";
import { ChordPrinter } from "./chordPrinter";
import { ChordParser } from "./chordParser";

export class Chords {
    public parse = (value: string): IChord | undefined => {
        return ChordParser.parse(value);
    };

    public isChord = (value: string): boolean => {
        return ChordParser.isValidString(value);
    };

    public print = (chord: IChordSymbol): string => {
        return ChordPrinter.print(chord);
    };
}
