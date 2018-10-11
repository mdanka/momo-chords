import { IChordSymbol, IChord, INaming } from "./types";
import { ChordPrinter } from "./chordPrinter";
import { ChordParser } from "./chordParser";
import { Naming } from "./naming";

export class Chords {
    private chordParser: ChordParser;
    private chordPrinter: ChordPrinter;

    public constructor(namingOverride?: Partial<INaming>) {
        const naming = new Naming(namingOverride);
        this.chordParser = new ChordParser(naming);
        this.chordPrinter = new ChordPrinter(naming);
    }

    public parse = (value: string): IChord | undefined => {
        return this.chordParser.parse(value);
    };

    public isChord = (value: string): boolean => {
        return this.chordParser.isValidString(value);
    };

    public print = (chord: IChordSymbol): string => {
        return this.chordPrinter.print(chord);
    };
}
