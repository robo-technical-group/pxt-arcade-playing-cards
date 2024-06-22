/**
 * Extension representing playing cards.
 */

//% weight=0 color=#b8860b icon="\uf004" block="Playing Cards"
//% groups=['Shoes (Decks)', 'Cards', 'others']
namespace PlayingCards {
    /**
     * Create a custom deck of cards.
     * @param {string[]} suitNames - List of suit names. Do not include an "unsuited" suit name.
     * @param {number[]} suitColors - Color used for each suit when printing face names.
     * @param {string[]} pipNames - List of face names. Include any unsuited faces.
     * @param {number[]} pipValues - Face values for each face. Include values for any unsuited faces.
     * @param {number} pipRepeats - Number of times to use each face per suit.
     * @param {string[]} pipPrint - Character(s) to print on the card image for each face. If null, the first character of each face name is used.
     * @param {number[]} unsuitedPips - The array index in pipNames for each unsuited face (e.g. jokers).
     * @param {Image[]} cardBases - Base card image to use for each suit. Add an image at the end for unsuited cards.
     * @param {image.Font} font - Font used when printing card faces on images. If null, Font8 is used.
     * @return {Shoe} Single deck of cards.
     */
    export function createCustomDeck(suitNames: string[], suitColors: number[],
        pipNames: string[], pipValues: number[],
        pipRepeats: number = 1, pipPrint: string[] = null,
        unsuitedPips: number[] = null,
        cardBases: Image[] = null, font: image.Font = null): Shoe {
        return createCustomShoe(1, suitNames, suitColors,
            pipNames, pipValues, pipRepeats, pipPrint, unsuitedPips,
            cardBases, font)
    }   // createCustomDeck()

    /**
     * Create a custom shoe of cards.
     * @param {number} numDecks - Number of decks to use in the shoe.
     * @param {string[]} suitNames - List of suit names. Do not include an "unsuited" suit name.
     * @param {number[]} suitColors - Color used for each suit when printing face names.
     * @param {string[]} pipNames - List of face names. Include any unsuited faces.
     * @param {number[]} pipValues - Face values for each face. Include values for any unsuited faces.
     * @param {number} pipRepeats - Number of times to use each face per suit.
     * @param {string[]} pipPrint - Character(s) to print on the card image for each face. If null, the first character of each face name is used.
     * @param {number[]} unsuitedPips - The array index in pipNames for each unsuited face (e.g. jokers).
     * @param {Image[]} cardBases - Base card image to use for each suit. Add an image at the end for unsuited cards.
     * @param {image.Font} font - Font used when printing card faces on images. If null, Font8 is used.
     * @return {Shoe} Shoe of cards.
     */
    export function createCustomShoe(numDecks: number,
        suitNames: string[], suitColors: number[],
        pipNames: string[], pipValues: number[],
        pipRepeats: number = 1, pipPrint: string[] = null,
        unsuitedPips: number[] = null,
        cardBases: Image[] = null, font: image.Font = null): Shoe {
        if (pipPrint == null) {
            pipPrint = []
            for (let pip of pipNames) {
                pipPrint.push(pip.substr(0, 1))
            }   // for (pip)
        }   // if (! pipPrint)
        if (cardBases == null) {
            cardBases = []
            for (let suit of suitNames) {
                let cardBase: Image = image.create(32, 32)
                cardBase.fill(1)
                cardBases.push(cardBase)
            }   // for (suit)
        }   // if (! cardBases)
        if (font == null) {
            font = image.font8
        }   // if (! font)
        return new Shoe(DeckType.Custom, numDecks, 0, false, false, suitNames, suitColors,
            pipNames, pipValues, pipRepeats, pipPrint, unsuitedPips, cardBases, font)
    }   // createCustomShoe()

    /**
     * Create a standard deck of cards.
     * @param {DeckType} deckType - Type of deck to build.
     * @param {number} numJokers - Number of jokers to add to the deck.
     * @param {boolean} isAceHigh - Whether Aces have highest value.
     * @param {boolean} areFacesTen - Whether face cards are worth 10 points.
     * @return {Shoe} - Single deck of cards.
     */
    export function createDeck(deckType: DeckType = DeckType.Poker, numJokers: number = 0,
        isAceHigh: boolean = true, areFacesTen: boolean = false): Shoe {
        return new Shoe(deckType, 1, numJokers, isAceHigh, areFacesTen)
    }   // createDeck()

    /**
     * Creates a standard deck of cards. Simpler function for use in Blocks. Aces are high.
     * @param {DeckType} deckType - Type of deck to build.
     * @param {number} numJokers - Number of jokers to add to the deck.
     * @return {Shoe} - Single deck of cards.
     */
    //% blockId=playing_cards_create_deck_simple
    //% group="Shoes (Decks)"
    //% block="create deck || of type %deckType with %numJokers jokers"
    //% deckType.defl=DeckType.Poker numJokers.defl=0
    //% expandableArgumentMode="toggle"
    //% hidden
    //% blockSetVariable="theDeck"
    //% weight=150
    export function createDeckSimple(deckType: DeckType = DeckType.Poker, numJokers: number = 0): Shoe {
        return new Shoe(deckType, 1, numJokers)
    }   // createDeckSimple()

    /**
     * Create a deck of standard poker cards. Simple function meant for use in Blocks.
     * Might be useful in JavaScript, too.
     */
    //% blockId=playing_cards_create_poker_deck
    //% group="Shoes (Decks)"
    //% block="create standard poker deck"
    //% blockSetVariable="theDeck"
    //% weight=200
    export function createPokerDeck(): Shoe {
        return new Shoe()
    }   // createPokerDeck

    /**
     * Create a standard shoe of cards.
     * @param {DeckType} deckType - Type of deck to build.
     * @param {number} numDecks - Number of decks to include in the shoe.
     * @param {number} numJokers - Number of jokers to add to the deck.
     * @param {boolean} isAceHigh - Whether Aces have highest value.
     * @param {boolean} areFacesTen - Whether face cards are worth 10 points.
     * @return {Shoe} - Single deck of cards.
     */
    export function createShoe(deckType: DeckType = DeckType.Poker, numDecks: number = 3, numJokers: number = 0,
        isAceHigh: boolean = true, areFacesTen: boolean = false): Shoe {
        return new Shoe(deckType, numDecks, numJokers, isAceHigh, areFacesTen)
    }   // createShoe()

    /**
     * Create a standard shoe of cards. Simpler function for use in Blocks. Aces are high.
     * @param {DeckType} deckType - Type of deck to build.
     * @param {number} numDecks - Number of decks to include in the shoe.
     * @param {number} numJokers - Number of jokers to add to the deck.
     * @return {Shoe} - Single deck of cards.
     */
    //% blockId=playing_cards_create_shoe_simple
    //% group="Shoes (Decks)"
    //% block="create shoe || of type %deckType with %numDecks decks and %numJokers jokers"
    //% deckType.defl=DeckType.Poker numDecks.defl=3 numJokers.defl=0
    //% expandableArgumentMode="toggle"
    //% hidden
    //% blockSetVariable="theShoe"
    //% weight=100
    export function createShoeSimple(deckType: DeckType = DeckType.Poker, numDecks: number = 3, numJokers: number = 0): Shoe {
        return new Shoe(deckType, numDecks, numJokers)
    }   // createShoeSimple()

    /**
     * Compare face values of cards.
     * @param {Card} card1 - First ("left") card in comparison.
     * @param {Card} card2 - Second ("right") card in comparison.
     * @return {number} - 0 means equal, negative value means first ("left") card is higher, positive value means second ("right") card is higher.
     */
    export function compareCards(card1: Card, card2: Card): number {
        return card2.faceValue - card1.faceValue
    }   // compareCards()
}   // namespace PlayingCards