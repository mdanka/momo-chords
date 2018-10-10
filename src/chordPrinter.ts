import { IChordSymbol, addedOrder, suspendedOrder } from "./types";
import { Naming } from "./naming";

export namespace ChordPrinter {
    export function print(chordSymbol: IChordSymbol): string {
        const {
            rootNote,
            quality,
            seventh,
            ninth,
            eleventh,
            thirteenth,
            addeds,
            suspendeds,
            alteredFifth,
            bassNote,
        } = chordSymbol;

        let name: string = "";
        name += rootNote;
        name += getSymbolText(quality, Naming.qualities);
        name += getSymbolText(seventh, Naming.sevenths);
        name += getSymbolText(ninth, Naming.ninths);
        name += getSymbolText(eleventh, Naming.elevenths);
        name += getSymbolText(thirteenth, Naming.thirteenths);
        name += getSymbolTextForSet(addeds, addedOrder, Naming.addeds);
        name += getSymbolTextForSet(suspendeds, suspendedOrder, Naming.suspendeds);
        name += getSymbolText(alteredFifth, Naming.alteredFifths);
        if (bassNote !== undefined) {
            name += "/" + bassNote;
        }
        return name;
    }

    function getSymbolTextForSet<T>(symbolSet: Set<T>, symbolOrder: T[], naming: Map<T, string[]>) {
        return symbolOrder
            .map(symbol => {
                if (symbolSet.has(symbol)) {
                    return getSymbolText(symbol, naming);
                }
            })
            .filter(value => value !== undefined)
            .join("");
    }

    function getSymbolText<T>(symbol: T | undefined, naming: Map<T, string[]>) {
        if (symbol === undefined) {
            return "";
        }
        const names = naming.get(symbol);
        if (names === undefined) {
            throw new Error(`[Chords] No name found for symbol '${symbol}'`);
        }
        if (names.length === 0) {
            throw new Error(`[Chords] Name list found for symbol '${symbol}' is empty`);
        }
        return names[0];
    }
}
