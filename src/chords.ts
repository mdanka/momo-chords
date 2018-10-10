import { IChordSymbol } from "./types";
import { ChordSymbolParser } from "./chordSymbolParser";
import { ChordPrinter } from "./chordPrinter";

export class Chords {
    public parse = (value: string): IChordSymbol | undefined => {
        return ChordSymbolParser.parse(value);
    };

    public isChord = (value: string): boolean => {
        return this.parse(value) !== undefined;
    };

    public print = (chord: IChordSymbol): string => {
        return ChordPrinter.print(chord);
    };
}
