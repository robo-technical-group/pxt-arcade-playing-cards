# MakeCode Arcade Playing Cards

Extension used to represent playing cards. Build your own custom decks! Currently JavaScript only.

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

See the sample project for information on creating a custom deck.

## TODO

- [ ] Add a reference for your blocks here
- [ ] Add "icon.png" image (300x200) in the root folder
- [X] Add "- beta" to the GitHub project description if you are still iterating it.
- [ ] Turn on your automated build on https://travis-ci.org
- [X] Use "pxt bump" to create a tagged release on GitHub
- [ ] Get your package reviewed and approved https://arcade.makecode.com/packages/approval

Read more about building MakeCode extensions at https://arcade.makecode.com/packages/build-your-own

## License

MIT License. See LICENSE for more information.

## Supported targets

* for PXT/arcade
(The metadata above is needed for package search.)

