// tslint:disable-next-line:no-implicit-dependencies
import { assert } from "chai";

import { Chords } from "../src";
import { TestData } from "./testData";
import { TestDataChordList } from "./testDataChordList";

const chords = new Chords();

const allCorrectTestPairs = [...TestData.correctPairsWithCanonicalNames, ...TestData.correctPairsWithNonCanonicalNames];

describe("Chords", () => {
    /**
     * isChord
     */

    allCorrectTestPairs.forEach(testPair => {
        const { name } = testPair;
        it(`should say that '${name}' is a chord`, () => {
            assert.isTrue(chords.isChord(name), `Expected '${name}' to be identified as a chord`);
        });
    });

    TestData.incorrectNames.forEach(name => {
        it(`should say that '${name}' is not a chord`, () => {
            assert.isFalse(chords.isChord(name), `Expected '${name}' NOT to be identified as a chord`);
        });
    });

    TestDataChordList.chords.forEach(name => {
        it(`should say that '${name}' is a chord`, () => {
            assert.isTrue(chords.isChord(name), `Expected '${name}' to be identified as a chord`);
        });
    });

    /**
     * parse
     */

    allCorrectTestPairs.forEach(testPair => {
        const { name, chordSymbol } = testPair;
        it(`should parse '${name}' correctly as a chord`, () => {
            assert.deepEqual(chords.parse(name), chordSymbol, `Expected '${name}' to parse correctly as a chord`);
        });
    });

    /**
     * print
     */

    // TestData.correctPairsWithCanonicalNames.forEach(testPair => {
    //     const { name, chord } = testPair;
    //     it(`should print chord correctly as '${name}'`, () => {
    //         const printedChord = chords.print(chord);
    //         assert.strictEqual(name, printedChord, `Expected '${name}' but received '${printedChord}'`);
    //     });
    // });
});
