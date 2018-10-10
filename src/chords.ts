import { IChordSymbol, IChord } from "./types";
import { ChordSymbolParser } from "./chordSymbolParser";
import { ChordPrinter } from "./chordPrinter";
import { ChordParser } from "./chordParser";

export class Chords {
    public parseSymbol = (value: string): IChordSymbol | undefined => {
        return ChordSymbolParser.parse(value);
    };

    public parseChord = (value: string): IChord | undefined => {
        return ChordParser.parseString(value);
    };

    public isChord = (value: string): boolean => {
        return this.parseChord(value) !== undefined;
    };

    public print = (chord: IChordSymbol): string => {
        return ChordPrinter.print(chord);
    };
}
