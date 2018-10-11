# momo-chords [![NPM Version](https://badge.fury.io/js/momo-chords.svg)](http://badge.fury.io/js/momo-chords) [![Build Status](https://travis-ci.org/mdanka/momo-chords.svg)](https://travis-ci.org/mdanka/momo-chords) [![TypeScript](https://img.shields.io/badge/%3C%2F%3E-typescript-blue.svg)](http://www.typescriptlang.org/)

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

You can see the default naming called `DEFAULT_NAMING` in `naming.ts`.

The naming you provide is a `Partial<INaming>` because you can provide a subset of the naming description. What you provide will be used to override the defaults.

If you want to update just how chords should be printed, then it is enough to override only the `printing` key of the naming. `printing` contains a preferred name for each chord part.

If you also want to customise what should be considered a chord, you can override the `parsing` key of the naming. `parsing` contains a list of all possible names for each chord part.
