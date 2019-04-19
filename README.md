# MakeCode Arcade Playing Cards

[![Build Status](https://travis-ci.com/robo-technical-group/pxt-arcade-playing-cards.svg?branch=master)](https://travis-ci.com/robo-technical-group/pxt-arcade-playing-cards)

Extension used to represent playing cards. Build your own custom decks! Works with Blocks now, too!

## Usage
To create a single deck of poker cards:

    let deck: Shoe = playingCards.createDeck()

To create a single deck of poker cards with jokers:

    let deck: Shoe = playingCards.createDeck(DeckType.Poker, 2)

To create a shoe of poker cards with three decks:

    let deck: Shoe = playingCards.createShoe(DeckType.Poker, 3)

There are three standard deck types:

    DeckType.Poker    // Default
    DeckType.Pinochle
    DeckType.Euchre

See the sample project (first item in the TODO list) for information on creating a custom deck.

## TODO

- [X] See it in action at https://makecode.com/_2PbT3F6a0eR8 (JavaScript)
- [X] See it in action at https://makecode.com/_3xoEXCL1KRJ6 (Blocks)
- [X] See it in action at https://makecode.com/_bmRV2RE6oFk8 (Acey Ducey game)
- [X] Add blocks interface (1.0.4).
- [ ] Add "icon.png" image (300x200) in the root folder
- [X] Add "- beta" to the GitHub project description if you are still iterating it. (Removed beta status in v. 1.0.4.)
- [X] Turn on your automated build on https://travis-ci.org (1.0.7)
- [X] Use "pxt bump" to create a tagged release on GitHub
- [ ] Get your package reviewed and approved https://arcade.makecode.com/packages/approval

Read more about building MakeCode extensions at https://arcade.makecode.com/packages/build-your-own

## License

MIT License. See LICENSE for more information.

## Supported targets

* for PXT/arcade
(The metadata above is needed for package search.)

