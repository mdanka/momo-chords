import { IChordSymbol, addedOrder, suspendedOrder } from "./types";
import { Naming } from "./naming";

export class ChordPrinter {
    private naming: Naming;

    public constructor(naming: Naming) {
        this.naming = naming;
    }

    public print(chordSymbol: IChordSymbol): string {
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
        name += this.getSymbolText(quality, this.naming.preferredNames.qualities);
        name += this.getSymbolText(seventh, this.naming.preferredNames.sevenths);
        name += this.getSymbolText(ninth, this.naming.preferredNames.ninths);
        name += this.getSymbolText(eleventh, this.naming.preferredNames.elevenths);
        name += this.getSymbolText(thirteenth, this.naming.preferredNames.thirteenths);
        name += this.getSymbolTextForSet(addeds, addedOrder, this.naming.preferredNames.addeds);
        name += this.getSymbolTextForSet(suspendeds, suspendedOrder, this.naming.preferredNames.suspendeds);
        name += this.getSymbolText(alteredFifth, this.naming.preferredNames.alteredFifths);
        if (bassNote !== undefined) {
            name += "/" + bassNote;
        }
        return name;
    }

    private getSymbolTextForSet<T>(symbolSet: Set<T>, symbolOrder: T[], naming: Map<T, string>) {
        return symbolOrder
            .map(symbol => {
                if (symbolSet.has(symbol)) {
                    return this.getSymbolText(symbol, naming);
                }
            })
            .filter(value => value !== undefined)
            .join("");
    }

    private getSymbolText<T>(symbol: T | undefined, naming: Map<T, string>) {
        if (symbol === undefined) {
            return "";
        }
        const name = naming.get(symbol);
        if (name === undefined) {
            throw new Error(`[Chords] No preferred name found for symbol '${symbol}'`);
        }
        return name;
    }
}
