/**
 * Immutable representation of a single deck of cards
 */
class Deck {
    private static readonly _multiplier: number = 100
    private static readonly _stdPipNames: string[] = [
        'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven',
        'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Joker'
    ]
    private static readonly _stdPipValues: number[] = [
        1, 2, 3, 4, 5, 6, 7,
        8, 9, 10, 11, 12, 13, 99
    ]
    private static readonly _stdSuitColors: number[] = [
        2, 15, 2, 15, 1
    ]
    private static readonly _stdSuits: string[] = [
        'Hearts', 'Spades', 'Diamonds', 'Clubs'
    ]
    private static readonly _stdCardBases: Image[][] = [
        assets.animation`poker8x8`,
        assets.animation`poker8x16`,
        assets.animation`poker16x16`,
        assets.animation`poker16x32`,
        assets.animation`poker32x32`,
    ]

    private _areFacesTen: boolean
    private _cardBases: Image[]
    private _cards: number[]
    private _deckType: DeckType
    private _font: image.Font
    private _isAceHigh: boolean
    private _numJokers: number
    private _pipChars: string[]
    private _pipNames: string[]
    private _pipRepeats: number
    private _pipVals: number[]
    private _suitColors: number[]
    private _suits: string[]
    private _unsuitedPips: number[]

    /**
     * Initialize a deck of cards. Not intended for public use - use Shoe instead.
     * @param {DeckType} deckType - Type of deck to create.
     * @param {number} numJokers - In a standard deck, indicates how many jokers to add to the deck.
     * @param {boolean} isAceHigh - In a standard deck, indicates whether Aces have highest value.
     * @param {boolean} areFacesTen - In a standard deck, indicates whether face cards are worth 10 points.
     * @param {string[]} customSuitNames - In a custom deck, lists the suit names.
     * @param {number[]} customSuitColors - In a custom deck, lists the colors associated with the custom suits.
     * @param {string[]} customPipNames - In a custom deck, lists the face names.
     * @param {number[]} customPipValues - In a custom deck, lists the face values for each face.
     * @param {number} customPipRepeats - In a custom deck, number of times to use each face per suit.
     * @param {string[]} customPipPrint - In a custom deck, lists the character(s) to print on the card image for each face.
     * @param {number[]} unsuitedPips - In a custom deck, the index values of any faces that do not belong to a suit (e.g. jokers).
     * @param {Image[]} customCardBases - In a custom deck, the base images to use for each suit. Last image is used for any unsuited cards.
     * @param {image.Font} customFont - In a custom deck, the font to use to print the faces on the card images.
     */
    constructor(deckType: DeckType = DeckType.Poker, numJokers: number = 0,
        isAceHigh: boolean = true, areFacesTen: boolean = false,
        customSuitNames: string[] = null, customSuitColors: number[] = null,
        customPipNames: string[] = null, customPipValues: number[] = null,
        customPipRepeats: number = 1, customPipPrint: string[] = null,
        unsuitedPips: number[] = null,
        customCardBases: Image[] = null, customFont: image.Font = null) {
        this._areFacesTen = areFacesTen
        this._deckType = deckType
        this._isAceHigh = isAceHigh
        this._numJokers = numJokers
        if (deckType === DeckType.Custom) {
            this._cardBases = customCardBases
            this._font = customFont
            this._pipChars = customPipPrint
            this._pipNames = customPipNames
            this._pipRepeats = customPipRepeats
            this._pipVals = customPipValues
            this._suitColors = customSuitColors
            this._suits = customSuitNames
            this._unsuitedPips = unsuitedPips
        }   // if (deckType === DeckType.Custom)
        this.buildDeck()
    }   // constructor()

    /**
     * @return {boolean} Whether face cards are worth 10 points.
     */
    public get areFacesTen(): boolean {
        return this._areFacesTen
    }   // areFacesTen()

    /**
     * @return {number[]} Array of card IDs in this deck.
     */
    public get cardIds(): number[] {
        return this._cards
    }   // get cardIds()

    /**
     * @return {DeckType} The deck type.
     */
    public get deckType(): DeckType {
        return this._deckType
    }   // get deckType

    /**
     * @return {boolean} Whether this deck includes jokers. Always false in custom decks.
     */
    public get hasJokers(): boolean {
        return (this._numJokers > 0)
    }   // get hasJokers()

    /**
     * @return {boolean} Whether Aces are considered high-cards in this deck.
     *                   Always false in custom decks.
     */
    public get isAceHigh(): boolean {
        return this._isAceHigh
    }   // get isAceHigh()

    /**
     * Sets whether Aces are high or low.
     * @param {boolean} value - true if Aces are high, false if not.
     */
    public set isAceHigh(value: boolean) {
        if (this.deckType != DeckType.Custom) {
            this._isAceHigh = value
        }
    }

    /**
     * Returns a Card object for a given card ID.
     * @param {number} cardId - ID value of card to create.
     * @return {Card} A Card object for the given card ID.
     */
    public getCard(cardId: number): Card {
        let suit: number = Math.floor(cardId / Deck._multiplier)
        let pip: number = cardId % Deck._multiplier
        let pipVal: number
        let pipName: string
        let suitName: string
        let cardName: string
        let aceHigh: boolean
        if (this._deckType === DeckType.Custom) {
            if (suit >= this._suits.length) {
                suitName = 'Unsuited'
            } else {
                suitName = this._suits[suit]
            }   // if (suit >= this._suits.length)
            pipVal = this._pipVals[pip]
            pipName = this._pipNames[pip]
            aceHigh = false
        } else {
            if (suit >= Deck._stdSuits.length) {
                suitName = 'Unsuited'
            } else {
                suitName = Deck._stdSuits[suit]
            }   // if (suit >= Deck._stdSuits.length)
            pipName = Deck._stdPipNames[pip]
            if (this._areFacesTen && pip >= StdFace.Jack && pip <= StdFace.King) {
                pipVal = 10
            } else {
                pipVal = Deck._stdPipValues[pip]
            }   // if (this._areFacesTen...)
            aceHigh = this._isAceHigh
        }   // if (this._deckType === DeckType.Custom)
        cardName = pipName
        if (suitName === 'Unsuited') {
            cardName += ' (Unsuited)'
        } else {
            cardName += ' of ' + suitName
        }   // if (suitName === 'Unsuited')
        return new Card(cardId, cardName, pip, pipVal, pipName, suit, suitName, aceHigh)
    }   // getCard()

    /**
     * Builds a card image for a given Card object.
     * @param {Card} card - Card object for image.
     * @param {CardSpriteSize} size - Size of image to return. Ignored for custom decks.
     * @return {Image} Image for given Card object.
     */
    public getCardImage(card: Card, size: CardSpriteSize = CardSpriteSize.Size16x16): Image {
        let toReturn: Image
        let color: number
        let toPrint: string
        if (this._deckType === DeckType.Custom) {
            toReturn = this._cardBases[card.suitValue].clone()
            if (card.suitValue >= this._suitColors.length) {
                color = 15 // Default to black if unsuited color not provided
            } else {
                color = this._suitColors[card.suitValue]
            }   // if (card.suitValue >= this._suitColors.length)
            toPrint = this._pipChars[card.faceValue]
            toReturn.printCenter(this._pipChars[card.pipId], 0, color, this._font)
        } else {
            toReturn = Deck._stdCardBases[size][card.suitValue].clone()
            color = Deck._stdSuitColors[card.suitValue]
            switch (card.pipId) {
                case StdFace.Ace:
                    toPrint = 'A'
                    break

                case StdFace.Ten:
                    toPrint = '10'
                    break

                case StdFace.Jack:
                case StdFace.Joker:
                    toPrint = 'J'
                    break

                case StdFace.Queen:
                    toPrint = 'Q'
                    break

                case StdFace.King:
                    toPrint = 'K'
                    break

                default:
                    toPrint = '' + card.faceValue
                    break
            }   // switch (card.pipId)

            switch (size) {
                case CardSpriteSize.Size8x8:
                    if (card.pipId === StdFace.Ten) {
                        toReturn.drawLine(0, 0, 0, 4, color)
                        toReturn.drawLine(2, 1, 2, 3, color)
                        toReturn.drawLine(4, 1, 4, 3, color)
                        toReturn.setPixel(3, 0, color)
                        toReturn.setPixel(3, 4, color)
                    } else {
                        toReturn.printCenter(toPrint, 0, color, image.font5)
                    }   // if (this._fv === StdFace.Ten)
                    break

                case CardSpriteSize.Size8x16:
                    if (card.pipId === StdFace.Ten) {
                        toReturn.drawLine(1, 1, 1, 6, color)
                        toReturn.print('0', 2, 0, color, image.font8)
                    } else {
                        toReturn.printCenter(toPrint, 0, color, image.font8)
                    }
                    break

                case CardSpriteSize.Size16x16:
                    toReturn.printCenter(toPrint, 0, color, image.font8)
                    break

                case CardSpriteSize.Size16x32:
                    if (card.pipId === StdFace.Ten) {
                        toReturn.print('1', -1, 0, color, image.doubledFont(image.font8))
                        toReturn.print('0', 5, 0, color, image.doubledFont(image.font8))
                    } else {
                        toReturn.printCenter(toPrint, 0, color, image.doubledFont(image.font8))
                    }
                    break

                case CardSpriteSize.Size32x32:
                    toReturn.printCenter(toPrint, 0, color, image.doubledFont(image.font8))
                    break
            }   // switch (size)
        }   // if (this._deckType === DeckType.Custom)
        return toReturn
    }   // getCardImage()


    /**
     * Builds the array of card IDs for this deck.
     */
    private buildDeck(): void {
        if (this._deckType === DeckType.Custom) {
            this._cards = []
            for (let suit: number = 0; suit < this._suits.length; suit++) {
                for (let pip: number = 0; pip < this._pipNames.length; pip++) {
                    for (let count: number = 0; count < this._pipRepeats; count++) {
                        // Ignore unsuited pips
                        if (this._unsuitedPips && this._unsuitedPips.indexOf(pip) === -1) {
                            this._cards.push(Deck.calcValue(suit, pip))
                        }   // if (this._unsuitedPips)
                    }   // for (count)
                }   // for (pip)
            }   // for (suit)

            // Add unsuited pips
            for (let pip of this._unsuitedPips) {
                for (let count: number = 0; count < this._pipRepeats; count++) {
                    this._cards.push(Deck.calcValue(this._suits.length, pip))
                }   // for (count)
            }   // for (pip)
        } else {
            let facesUsed: StdFace[] = []
            let facesRepeat: number = 1
            switch (this._deckType) {
                case DeckType.Pinochle:
                    facesRepeat = 2
                // switch fallthrough is intentional
                case DeckType.Euchre:
                    facesUsed.push(StdFace.Ace)
                    for (let face: StdFace = StdFace.Nine;
                        face <= StdFace.King; face++) {
                        facesUsed.push(face)
                    }   // for (face)
                    break
                case DeckType.Poker:
                    for (let face: StdFace = StdFace.Ace;
                        face <= StdFace.King; face++) {
                        facesUsed.push(face)
                    }   // for (face)
                    break
            }   // switch (this._deckType)

            this._cards = []
            for (let suit: StdSuit = StdSuit.Hearts; suit <= StdSuit.Clubs; suit++) {
                for (let face of facesUsed) {
                    for (let count: number = 0; count < facesRepeat; count++) {
                        this._cards.push(Deck.calcValue(suit, face))
                    }   // for (count)
                }   // for (face)
            }   // for (suit)

            if (this._numJokers > 0) {
                for (let joker: number = 0; joker < this._numJokers; joker++) {
                    this._cards.push(Deck.calcValue(Deck._stdSuits.length, StdFace.Joker))
                }   // for (joker)
            }   // if (this._numJokers)
        }   // if (this._deckType === DeckType.Custom)
    }   // buildDeck()

    /**
     * Calculate a unique ID for each card.
     */
    private static calcValue(suit: number, face: number): number {
        return suit * Deck._multiplier + face
    }   // calcValue()
}   // class Deck
