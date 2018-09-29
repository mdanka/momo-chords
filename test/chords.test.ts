// tslint:disable-next-line:no-implicit-dependencies
import { assert } from "chai";

import { Chords } from "../src";
import { TestData } from "./testData";

const chords = new Chords();

describe("Chords", () => {
    /**
     * isChord
     */

    TestData.correct.forEach(testPair => {
        const { name } = testPair;
        it(`should say that ${name} is a chord`, () => {
            assert.isTrue(chords.isChord(name));
        });
    });

    TestData.incorrectNames.forEach(name => {
        it(`should say that ${name} is not a chord`, () => {
            assert.isFalse(chords.isChord(name));
        });
    });

    /**
     * parse
     */

    TestData.correct.forEach(testPair => {
        const { name, chord } = testPair;
        it(`should parse ${name} correctly as a chord`, () => {
            assert.deepEqual(chord, chords.parse(name));
        });
    });

    /**
     * print
     */
});
