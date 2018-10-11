import { IChordSymbol, IChord } from "./types";
import { ChordPrinter } from "./chordPrinter";
import { ChordParser } from "./chordParser";

export class Chords {
    public parseSymbol = (value: string): IChordSymbol | undefined => {
        return ChordParser.parseStringToSymbol(value);
    };

    public parseChord = (value: string): IChord | undefined => {
        return ChordParser.parseStringToChord(value);
    };

    public isChord = (value: string): boolean => {
        return ChordParser.isValidString(value);
    };

    public print = (chord: IChordSymbol): string => {
        return ChordPrinter.print(chord);
    };
}
