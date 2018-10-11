# [Momo Chords](https://momo-chords.miklosdanka.com) &middot; [![GitHub license](https://img.shields.io/badge/license-Apache2-blue.svg)](https://github.com/mdanka/momo-chords/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/momo-chords.svg?style=flat)](https://www.npmjs.com/package/momo-chords) [![Build Status](https://travis-ci.org/mdanka/momo-chords.svg)](https://travis-ci.org/mdanka/momo-chords) [![TypeScript](https://img.shields.io/badge/%3C%2F%3E-typescript-blue.svg)](http://www.typescriptlang.org/)

Chord parser and printer.

Try it on the [demo page](https://momo-chords.miklosdanka.com)!

## Overview

There are many existing libraries that tackle handling chords. However, they either don't support a large enough set of chords, or they lack functionality, or they are not properly configurable, or they don't come with types.

The goal of this library is to support all of the above.

Currently it supports:

- [x] A very large set of chords
- [x] Parsing strings as chord symbols
- [x] Parsing strings as chord notes
- [x] Printing chord names when given a chord
- [x] An even larger set of chords (added in 0.3.0)
- [x] Configurable naming strategies (added in 0.4.0)
- [ ] Autocomplete/search by name

## Installation

```Shell
npm install --save momo-chords
```

or

```Shell
yarn add momo-chords
```

## Usage

```TypeScript
import { Chords } from "momo-chords";

const chords = new Chords();

// Check if a string is a valid chord anme
chords.isChord("A#maj7/G");  // true
chords.isChord("T");  // false

// Parse a string into a chord object
const chord = chords.parse("A#M7/G");  // chord object

// Print the name of a chord
chords.print(chord.symbol);  // "A#maj7/G"
```

### Custom namings

The library comes with a comprehensive set of default chord names. However, you might wish to customize what should be considered a chord and/or how a chord should be printed. This is possible to do why namings.

In order to apply a custom naming, simply provide a naming description to the constructor:

```TypeScript
import { Chords, INaming } from "momo-chords";

const myNaming: Partial<INaming> = { ... };
const chords = new Chords(myNaming);
```

You can see the default naming called `DEFAULT_NAMING` in [naming.ts](https://github.com/mdanka/momo-chords/blob/master/src/naming.ts#L17).

The naming you provide is a `Partial<INaming>` because you can provide a subset of the naming description. What you provide will be used to override the defaults.

If you want to update just how chords should be printed, then it is enough to override only the `printing` key of the naming. `printing` contains a preferred name for each chord part.

If you also want to customise what should be considered a chord, you can override the `parsing` key of the naming. `parsing` contains a list of all possible names for each chord part.

## How it works

### Parsing

1. First, we split the chord string into components using a regular expression generated from the list of all possible chord component names. If the regular expression fails, the string is not a chord.
1. Next, we check for certain rules regarding the chord components: for example, altered fifths cannot be specified via both `dim` and `b5`, and power chords cannot contain further components. If any of the tests fail, the string is not a chord.
1. Next, we generate the intervals (notes) in the chord, given the constraints specified by the chord components. If there is no chord satisfying all of the chord components, the string is not a chord.
1. Finally, we now know that the string is indeed a chord, and we combine the results into a single chord object.

### Printing

1. The naming contains a preferred name for each chord component.
1. For each chord component, we pick the preferred name, and we concatenate the results.
