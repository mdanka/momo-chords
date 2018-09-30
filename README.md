# momo-chords

Chord parser and printer.

[![NPM Version](https://badge.fury.io/js/momo-chords.svg)](http://badge.fury.io/js/momo-chords)
[![Build Status](https://travis-ci.org/mdanka/momo-chords.svg)](https://travis-ci.org/mdanka/momo-chords) 
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-typescript-blue.svg)](http://www.typescriptlang.org/)

## Overview

There are many existing libraries that tackle handling chords. However, they either don't support a large enough set of chords, or they lack functionality, or they are not properly configurable, or they do't come with types.

The goal of this library is to support all of the above.

Currently it supports:

- [x] A very large set of chords
- [x] Parsing strings as chords
- [x] Printing chord names when given a chord
- [ ] An even larger set of chords
- [ ] Configurable naming strategies
- [ ] Autocomplete/search by name

## Installation

```
npm install --save momo-chords
```

or

```
yarn add momo-chords
```

## Usage

```
import { Chords } from "momo-chords";

const chords = new Chords();

// Check if a string is a valid chord anme
chords.isChord("A#maj7/G");  // true
chords.isChord("T");  // false

// Parse a string into a chord object
const chord = chords.parse("A#M7/G");  // chord object

// Print the name of a chord
chords.print(chord);  // "A#maj7/G"
```
