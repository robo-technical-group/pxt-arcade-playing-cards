/**
 * Extension representing playing cards.
 */
enum StdSuit {
    Hearts = 0,
    Spades,
    Diamonds,
    Clubs,
    Unsuited
}   // enum StdSuit

enum StdFace {
    Ace = 0,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Joker
}   // enum StdFace

enum DeckType {
    Poker,
    Pinochle,
    Euchre,
    //% block="Custom (not for use in Blocks)"
    Custom
}   // enum DeckType

enum CardSpriteSize {
    EightByEight = 0,
    EightBySixteen,
    SixteenBySixteen,
    SixteenByThirtyTwo,
    ThirtyTwoByThirtyTwo
}   // enum CardSpriteSize

/**
 * Immutable representation of a card
 */
//% blockNamespace=playingCards group="Cards"
class Card {
    private _aceHigh: boolean
    private _id: number
    private _name: string
    private _pip: number
    private _pipName: string
    private _pipValue: number
    private _suit: number
    private _suitName: string

    /**
     * Initialize a playing card.
     * @param {number} id - ID value for card (each card has a unique ID)
     * @param {string} name - Full name of card (e.g. "Ace of Spades")
     * @param {number} pipId - ID of card face (each card face has a unique ID)
     * @param {number} faceValue - Face value of card
     * @param {string} pipName - Name of card face (e.g. "Jack")
     * @param {number} suitValue - ID of suit (each suit has a unique ID)
     * @param {string} suitName - Name of suit (e.g. "Clubs")
     * @param {boolean} aceHigh - Whether an Ace is high or low (used in comparisons) 
    */
    constructor(id: number, name: string, pipId: number, faceValue: number,
        pipName: string, suitValue: number, suitName: string, aceHigh: boolean = true) {
        this._aceHigh = aceHigh
        this._id = id
        this._name = name
        this._pip = pipId
        this._pipName = pipName
        this._pipValue = faceValue
        this._suit = suitValue
        this._suitName = suitName
    }   // constructor()

    /**
     * @return {number} The face value of the card.
     */
    //% blockCombine group="Cards"
    //% block="face value"
    //% callInDebugger
    public get faceValue(): number {
        return this._pipValue
    }   // get pipValue()

    /**
     * @return {number} The ID value of the card.
     */
    public get id(): number {
        return this._id
    }   // get id()

    /**
     * @return {boolean} Whether aces are high for the deck where this card originates.
     */
    public get isAceHigh(): boolean {
        return this._aceHigh
    }   // get isAceHigh()

    /**
     * @return {boolean} Whether this card is equal in face value to another card.
     *                   Note: Face cards will be equal if deck was configured with
     *                   face cards all worth 10 points.
     */
    //% blockId=playing_cards_card_is_equal_to
    //% block="%myCard|has face value equal to card %card"
    //% group="Cards"
    public isEqualTo(card: Card): boolean {
        return (this._pipValue === card.faceValue)
    }   // isEqualTo()

    /**
     * @return {boolean} Whether this card is higher in face value than another card.
     *                   Note: Face cards will be equal if deck was configured with
     *                   face cards all worth 10 points.
     */
    //% blockId=playing_cards_card_is_greater_than
    //% block="%myCard|has higher face value than card %card"
    //% group="Cards"
    public isGreaterThan(card: Card): boolean {
        if (this._aceHigh && this._pip === StdFace.Ace && card.pipId !== StdFace.Ace && card.pipId !== StdFace.Joker) {
            return true
        } else {
            return (this._pipValue > card.faceValue)
        }   // if (this._aceHigh && ...)
    }   // isGreaterThan()

    /**
     * @return {boolean} Whether this card is lower in face value than another card.
     *                   Note: Face cards will be equal if deck was configured with
     *                   face cards all worth 10 points.
     */
    //% blockId=playing_cards_card_is_less_than
    //% block="%myCard|has lower face value than card %card"
    //% group="Cards"
    public isLessThan(card: Card): boolean {
        if (this._aceHigh && this._pip === StdFace.Ace && card.pipId !== StdFace.Ace && card.pipId !== StdFace.Joker) {
            return false
        } else {
            return (this._pipValue < card.faceValue)
        }   // if (this._aceHigh && ...)
    }   // isLessThan()

    /**
     * @return {string} The full name of the card (for example, "Queen of Hearts").
     */
    //% blockCombine group="Cards"
    //% block="full name"
    //% callInDebugger
    public get name(): string {
        return this._name
    }   // get name()

    /**
     * @return {number} The ID of the card face. Can be used to compare ranks even if
     *                  deck was configured with face cards all worth 10 points.
     */
    //% blockCombine group="Cards"
    //% block="face number"
    //% callInDebugger
    public get pipId(): number {
        return this._pip
    }   // get pipId()

    /**
     * @return {string} The name of the card face (for example, "King").
     */
    //% blockCombine group="Cards"
    //% block="face name"
    //% callInDebugger
    public get pipName(): string {
        return this._pipName
    }   // get pipName()

    /**
     * @return {string} The name of the suit (for example, "Spades")
     */
    //% blockCombine group="Cards"
    //% block="suit name"
    //% callInDebugger
    public get suitName(): string {
        return this._suitName
    }   // get suitName()

    /**
     * @return {number} The ID of the suit.
     */
    //% blockCombine group="Cards"
    //% block="suit number"
    //% callInDebugger
    public get suitValue(): number {
        return this._suit
    }   // get suitValue()
}   // class Card

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
        [
            // 8x8 sprite bases
            img`
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 2 1 2
                1 1 1 1 1 2 2 2
                1 1 1 1 1 2 2 2
                1 1 1 1 1 1 2 1
            `,
            img`
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 f 1
                1 1 1 1 1 f f f
                1 1 1 1 1 f f f
                1 1 1 1 1 f 1 f
            `,
            img`
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 2 1
                1 1 1 1 1 2 2 2
                1 1 1 1 1 2 2 2
                1 1 1 1 1 1 2 1
            `,
            img`
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 f 1
                1 1 1 1 1 f f f
                1 1 1 1 1 f f f
                1 1 1 1 1 1 f 1
            `,
            img`
                f f f f f f f f
                f f f f f f f f
                f f f f f f f f
                f f f f f f f f
                f f f f f f f 1
                f f f f f f f 1
                f f f f f 1 f 1
                f f f f f 1 1 1
            `
        ],
        [
            // 8x16 sprite bases
            img`
                . 1 1 1 1 1 1 .
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 2 2 1 2 2 1 1
                2 2 2 2 2 2 2 1
                2 2 2 2 2 2 2 1
                2 2 2 2 2 2 2 1
                1 2 2 2 2 2 1 1
                1 1 2 2 2 1 1 1
                . 1 1 2 1 1 1 .
            `,
            img`
                . 1 1 1 1 1 1 .
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 f 1 1 1 1
                1 1 f f f 1 1 1
                1 f f f f f 1 1
                f f f f f f f 1
                f f f f f f f 1
                f f 1 f 1 f f 1
                . 1 1 f 1 1 1 .
            `,
            img`
                . 1 1 1 1 1 1 .
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 2 1 1 1 1
                1 1 2 2 2 1 1 1
                1 2 2 2 2 2 1 1
                2 2 2 2 2 2 2 1
                1 2 2 2 2 2 1 1
                1 1 2 2 2 1 1 1
                . 1 1 2 1 1 1 .
            `,
            img`
                . 1 1 1 1 1 1 .
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1
                1 1 f f f 1 1 1
                1 1 f f f 1 1 1
                1 1 f f f 1 1 1
                f f f f f f f 1
                f f f f f f f 1
                f f f f f f f 1
                . 1 1 f 1 1 1 .
            `,
            img`
                . f f f f f f .
                f f f f f f f f
                f f f f f f f f
                f f f f f f f f
                f f f f f f f f
                f f f f f f f f
                f f f f f f f f
                f f f f f f f f
                f f f f f f f f
                f f f f f f f f
                f f f f f 1 f f
                f f f f f 1 f f
                f f f f f 1 f f
                f f f f f 1 f f
                f f 1 f f 1 f f
                . f 1 1 1 1 f .
            `
        ],
        [
            // 16x16 sprite bases
            img`
                . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
                . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 2 2 1 2 2 1 1 1 1 1 1
                1 1 1 1 2 2 2 2 2 2 2 1 1 1 1 1
                1 1 1 1 2 2 2 2 2 2 2 1 1 1 1 1
                1 1 1 1 2 2 2 2 2 2 2 1 1 1 1 1
                1 1 1 1 1 2 2 2 2 2 1 1 1 1 1 1
                . 1 1 1 1 1 2 2 2 1 1 1 1 1 1 .
                . . 1 1 1 1 1 2 1 1 1 1 1 1 . .
            `,
            img`
                . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
                . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 f 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 f f f 1 1 1 1 1 1 1
                1 1 1 1 1 f f f f f 1 1 1 1 1 1
                1 1 1 1 f f f f f f f 1 1 1 1 1
                1 1 1 1 f f f f f f f 1 1 1 1 1
                . 1 1 1 f f 1 f 1 f f 1 1 1 1 .
                . . 1 1 1 1 1 f 1 1 1 1 1 1 . .
            `,
            img`
                . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
                . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 2 2 2 1 1 1 1 1 1 1
                1 1 1 1 1 2 2 2 2 2 1 1 1 1 1 1
                1 1 1 1 2 2 2 2 2 2 2 1 1 1 1 1
                1 1 1 1 1 2 2 2 2 2 1 1 1 1 1 1
                . 1 1 1 1 1 2 2 2 1 1 1 1 1 1 .
                . . 1 1 1 1 1 2 1 1 1 1 1 1 . .
            `,
            img`
                . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
                . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 f f f 1 1 1 1 1 1 1
                1 1 1 1 1 1 f f f 1 1 1 1 1 1 1
                1 1 1 1 1 1 f f f 1 1 1 1 1 1 1
                1 1 1 1 f f f f f f f 1 1 1 1 1
                1 1 1 1 f f f f f f f 1 1 1 1 1
                . 1 1 1 f f f f f f f 1 1 1 1 .
                . . 1 1 1 1 1 f 1 1 1 1 1 1 . .
            `,
            img`
                . . f f f f f f f f f f f f . .
                . f f f f f f f f f f f f f f .
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f 1 f f f f f f
                f f f f f f f f f 1 f f f f f f
                f f f f f f f f f 1 f f f f f f
                f f f f f f f f f 1 f f f f f f
                . f f f f f 1 f f 1 f f f f f .
                . . f f f f 1 1 1 1 f f f f . .
            `
        ],
        [
            // 16x32 sprite bases
            img`
                . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
                . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 2 2 2 1 1 1 2 2 2 1 1 1 1
                1 1 2 2 2 2 2 1 2 2 2 2 2 1 1 1
                1 2 2 2 2 2 2 1 2 2 2 2 2 2 1 1
                2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1
                2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1
                2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1
                2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1
                2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1
                1 2 2 2 2 2 2 2 2 2 2 2 2 2 1 1
                1 1 2 2 2 2 2 2 2 2 2 2 2 1 1 1
                1 1 1 2 2 2 2 2 2 2 2 2 1 1 1 1
                1 1 1 1 2 2 2 2 2 2 2 1 1 1 1 1
                1 1 1 1 1 2 2 2 2 2 1 1 1 1 1 1
                . 1 1 1 1 1 2 2 2 1 1 1 1 1 1 .
                . . 1 1 1 1 1 2 1 1 1 1 1 1 . .
            `,
            img`
                . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
                . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 f 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 f f f 1 1 1 1 1 1 1
                1 1 1 1 1 f f f f f 1 1 1 1 1 1
                1 1 1 1 f f f f f f f 1 1 1 1 1
                1 1 1 f f f f f f f f f 1 1 1 1
                1 1 f f f f f f f f f f f 1 1 1
                1 f f f f f f f f f f f f f 1 1
                f f f f f f f f f f f f f f f 1
                f f f f f f f f f f f f f f f 1
                f f f f f f f f f f f f f f f 1
                f f f f f f f f f f f f f f f 1
                f f f f f f f f f f f f f f f 1
                f f f f f f f f f f f f f f f 1
                f f f f f f 1 f 1 f f f f f f 1
                . f f f f 1 1 f 1 1 f f f f 1 .
                . . f f 1 1 f f f 1 1 f f 1 . .
            `,
            img`
                . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
                . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 2 2 2 1 1 1 1 1 1 1
                1 1 1 1 1 1 2 2 2 1 1 1 1 1 1 1
                1 1 1 1 1 2 2 2 2 2 1 1 1 1 1 1
                1 1 1 1 1 2 2 2 2 2 1 1 1 1 1 1
                1 1 1 1 2 2 2 2 2 2 2 1 1 1 1 1
                1 1 1 1 2 2 2 2 2 2 2 1 1 1 1 1
                1 1 1 2 2 2 2 2 2 2 2 2 1 1 1 1
                1 1 1 2 2 2 2 2 2 2 2 2 1 1 1 1
                1 1 1 1 2 2 2 2 2 2 2 1 1 1 1 1
                1 1 1 1 2 2 2 2 2 2 2 1 1 1 1 1
                1 1 1 1 1 2 2 2 2 2 1 1 1 1 1 1
                1 1 1 1 1 2 2 2 2 2 1 1 1 1 1 1
                1 1 1 1 1 1 2 2 2 1 1 1 1 1 1 1
                . 1 1 1 1 1 2 2 2 1 1 1 1 1 1 .
                . . 1 1 1 1 1 2 1 1 1 1 1 1 . .
            `,
            img`
                . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
                . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 f f f 1 1 1 1 1 1 1
                1 1 1 1 1 f f f f f 1 1 1 1 1 1
                1 1 1 1 f f f f f f f 1 1 1 1 1
                1 1 1 1 f f f f f f f 1 1 1 1 1
                1 1 1 1 1 f f f f f 1 1 1 1 1 1
                1 1 1 1 1 1 f f f 1 1 1 1 1 1 1
                1 1 f f 1 1 1 f 1 1 1 f f 1 1 1
                1 f f f f 1 1 f 1 1 f f f f 1 1
                f f f f f f 1 f 1 f f f f f f 1
                f f f f f f f f f f f f f f f 1
                f f f f f f 1 f 1 f f f f f f 1
                1 f f f f 1 1 f 1 1 f f f f 1 1
                1 1 f f 1 1 1 f 1 1 1 f f 1 1 1
                1 1 1 1 1 1 1 f 1 1 1 1 1 1 1 1
                . 1 1 1 1 1 f f f 1 1 1 1 1 1 .
                . . 1 1 1 f f f f f 1 1 1 1 . .
            `,
            img`
                . . f f f f f f f f f f f f . .
                . f f f f f f f f f f f f f f .
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f 1 1 f f f f f
                f f f f f f f f f 1 1 f f f f f
                f f f f f f f f f 1 1 f f f f f
                f f f f f f f f f 1 1 f f f f f
                f f f f f f f f f 1 1 f f f f f
                f f f f f f f f f 1 1 f f f f f
                f f f f f f 1 1 f 1 1 f f f f f
                . f f f f f 1 1 f 1 1 f f f f .
                . . f f f f 1 1 1 1 1 f f f . .
            `
        ],
        [
            // 32x32 sprite bases
            img`
                . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . .
                . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . .
                . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 2 2 2 1 1 1 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 1 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 1 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1
                . 1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 .
                . . 1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 . .
                . . . 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 1 1 1 . . .
            `,
            img`
                . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . .
                . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . .
                . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 f f f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 f f f f f 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 f f f f f f f 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 f f f f f f f f f 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 f f f f f f f f f f f 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 f f f f f f f f f f f f f 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 f f f f f f f f f f f f f f f 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 f f f f f f f f f f f f f f f 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 f f f f f f f f f f f f f f f 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 f f f f f f f f f f f f f f f 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 f f f f f f f f f f f f f f f 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 f f f f f f f f f f f f f f f 1 1 1 1 1 1 1 1 1
                . 1 1 1 1 1 1 1 f f f f f f 1 f 1 f f f f f f 1 1 1 1 1 1 1 1 .
                . . 1 1 1 1 1 1 1 f f f f 1 1 f 1 1 f f f f 1 1 1 1 1 1 1 1 . .
                . . . 1 1 1 1 1 1 1 f f 1 1 f f f 1 1 f f 1 1 1 1 1 1 1 1 . . .
            `,
            img`
                . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . .
                . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . .
                . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                . 1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
                . . 1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 . .
                . . . 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 1 1 1 . . .
            `,
            img`
                . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . .
                . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . .
                . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 f f f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 f f f f f 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 f f f f f f f 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 f f f f f f f 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 f f f f f 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 f f f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 f f 1 1 1 f 1 1 1 f f 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 f f f f 1 1 f 1 1 f f f f 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 f f f f f f 1 f 1 f f f f f f 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 f f f f f f f f f f f f f f f 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 f f f f f f 1 f 1 f f f f f f 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 f f f f 1 1 f 1 1 f f f f 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 f f 1 1 1 f 1 1 1 f f 1 1 1 1 1 1 1 1 1 1 1
                . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
                . . 1 1 1 1 1 1 1 1 1 1 1 1 f f f 1 1 1 1 1 1 1 1 1 1 1 1 1 . .
                . . . 1 1 1 1 1 1 1 1 1 1 f f f f f 1 1 1 1 1 1 1 1 1 1 1 . . .
            `,
            img`
                . . . f f f f f f f f f f f f f f f f f f f f f f f f f f . . .
                . . f f f f f f f f f f f f f f f f f f f f f f f f f f f f . .
                . f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f .
                f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f 1 1 f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f 1 1 f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f 1 1 f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f 1 1 f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f 1 1 f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f 1 1 f f f f f f f f f f f f f
                f f f f f f f f f f f f f 1 1 f f 1 1 f f f f f f f f f f f f f
                . f f f f f f f f f f f f 1 1 f f 1 1 f f f f f f f f f f f f .
                . . f f f f f f f f f f f 1 1 1 1 1 1 f f f f f f f f f f f . .
                . . . f f f f f f f f f f 1 1 1 1 1 1 f f f f f f f f f f . . .
            `
        ]
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
     * @return {boolean} Whether Aces are considers high-cards in this deck.
     *                   Always false in custom decks.
     */
    public get isAceHigh(): boolean {
        return this._isAceHigh
    }   // get isAceHigh()

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
    public getCardImage(card: Card, size: CardSpriteSize = CardSpriteSize.SixteenBySixteen): Image {
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
                case CardSpriteSize.EightByEight:
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

                case CardSpriteSize.EightBySixteen:
                    if (card.pipId === StdFace.Ten) {
                        toReturn.drawLine(1, 1, 1, 6, color)
                        toReturn.print('0', 2, 0, color, image.font8)
                    } else {
                        toReturn.printCenter(toPrint, 0, color, image.font8)
                    }
                    break

                case CardSpriteSize.SixteenBySixteen:
                    toReturn.printCenter(toPrint, 0, color, image.font8)
                    break

                case CardSpriteSize.SixteenByThirtyTwo:
                    if (card.pipId === StdFace.Ten) {
                        toReturn.print('1', -1, 0, color, image.doubledFont(image.font8))
                        toReturn.print('0', 5, 0, color, image.doubledFont(image.font8))
                    } else {
                        toReturn.printCenter(toPrint, 0, color, image.doubledFont(image.font8))
                    }
                    break

                case CardSpriteSize.ThirtyTwoByThirtyTwo:
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

/**
 * Representation of a single deck or multiple decks of playing cards.
 */
//% blockNamespace=playingCards
class Shoe {
    private _currCard: number
    private _deck: Deck
    private _numDecks: number
    private _shoe: number[]

    /**
     * Initialize a shoe of cards (single or multiple decks).
     * @param {DeckType} deckType - Type of deck to create.
     * @param {number} numDecks - Number of decks to include in the shoe.
     * @param {boolean} isAceHigh - In a standard deck, indicates whether Aces have highest value.
     * @param {boolean} areFacesTen - In a standard deck, indicates whether face cards are worth 10 points.
     * @param {number} numJokers - In a standard deck, indicates how many jokers to add to the deck.
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
    constructor(deckType: DeckType = DeckType.Poker, numDecks: number = 1,
        numJokers: number = 0,
        isAceHigh: boolean = true, areFacesTen: boolean = false,
        customSuitNames: string[] = null, customSuitColors: number[] = null,
        customPipNames: string[] = null, customPipValues: number[] = null,
        customPipRepeats: number = 1, customPipPrint: string[] = null,
        unsuitedPips: number[] = null,
        customCardBases: Image[] = null, customFont: image.Font = null) {
        this._numDecks = numDecks
        this._deck = new Deck(deckType, numJokers, isAceHigh, areFacesTen,
            customSuitNames, customSuitColors, customPipNames, customPipValues,
            customPipRepeats, customPipPrint, unsuitedPips,
            customCardBases, customFont)
        this.buildShoe()
    }   // constructor()

    /**
     * @return {boolean} Whether face cards are worth 10 points.
     */
    public get areFacesTen(): boolean {
        return this._deck.areFacesTen
    }   // get areFacesTen()

    /**
     * @return {boolean} Whether there are cards remaining in the shoe.
     */
    //% blockCombine group="Shoes (Decks)"
    //% block="has cards remaining"
    //% callInDebugger
    public get hasMoreCards(): boolean {
        return (this._currCard < this._shoe.length)
    }   // get hasMoreCards()

    /**
     * @return {boolean} Whether Aces are considers high-cards in this deck
     *                   Always false in custom decks.
     */
    public get isAceHigh(): boolean {
        return this._deck.isAceHigh
    }   // get isAceHigh()

    /**
     * @return {Card} The next Card object in the shoe.
     */
    //% blockCombine group="Shoes (Decks)"
    //% block="get next card"
    //% callInDebugger
    public get nextCard(): Card {
        if (this._currCard < this._shoe.length) {
            let toReturn: Card = this._deck.getCard(this._shoe[this._currCard])
            this._currCard++
            return toReturn
        } else {
            return null
        }   // if (this._currCard < this._shoe.length)
    }   // get nextCard()

    /**
     * @return {number} Total number of cards in the shoe.
     */
    //% blockCombine group="Shoes (Decks)"
    //% block="total number of cards"
    //% callInDebugger
    public get numCards(): number {
        return this._shoe.length
    }   // get numCards()

    /**
     * @return {number} Number of cards remaining in the shoe.
     */
    //% blockCombine group="Shoes (Decks)"
    //% block="number of cards left"
    //% callInDebugger
    public get numCardsRemain(): number {
        return this._shoe.length - this._currCard
    }   // get numCardsRemain()

    /**
     * Builds a card image for a given Card object.
     * @param {Card} card - Card object for image.
     * @param {CardSpriteSize} size - Size of image to return. Ignored for custom decks.
     * @return {Image} Image for given Card object.
     */
    //% blockId=playing_cards_shoe_get_card_image
    //% group="Shoes (Decks)"
    //% block="from|%myShoe|get card image for %card || of size %size"
    //% size.defl=CardSpriteSize.SixteenBySixteen
    public getCardImage(card: Card, size: CardSpriteSize = CardSpriteSize.SixteenBySixteen): Image {
        return this._deck.getCardImage(card, size)
    }   // getCardImage()

    /**
     * Resets the shoe without shuffling the cards.
     */
    //% blockId=playing_cards_shoe_reset
    //% group="Shoes (Decks)"
    //% block="reset cards in shoe (deck) %myShoe"
    public reset(): void {
        this._currCard = 0
    }   // reset()

    /**
     * Returns all cards to the shoe and shuffles them.
     */
    //% blockId=playing_cards_shoe_shuffle
    //% group="Shoes (Decks)"
    //% block="shuffle cards in shoe (deck) %myShoe"
    public shuffle(): void {
        for (let index: number = 0; index < this._shoe.length; index++) {
            let swap: number = Math.randomRange(0, this._shoe.length - 1)
            if (swap !== index) {
                this.swap(index, swap)
            }   // if (swap !== index)
        }   // for (index)

        this._currCard = 0
    }   // shuffle()


    /**
     * Builds the list of card IDs in the shoe.
     */
    private buildShoe(): void {
        this._shoe = []
        this._currCard = 0
        let cardIds: number[] = this._deck.cardIds
        for (let cardId of cardIds) {
            for (let count = 0; count < this._numDecks; count++) {
                this._shoe.push(cardId)
            }   // for (count)
        }   // for (cardId)
    }   // buildShoe()

    /**
     * Swaps two cards in the shoe. Used in shuffling.
     */
    private swap(index1: number, index2: number): void {
        let temp: number = this._shoe[index1]
        this._shoe[index1] = this._shoe[index2]
        this._shoe[index2] = temp
    }   // swap()
}   // class Shoe

//% weight=0 color=#b8860b icon="\uf004" block="Playing Cards"
//% groups=['Shoes (Decks)', 'Cards', 'others']
namespace playingCards {
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
    export function createShoeSimple(deckType: DeckType = DeckType.Poker, numDecks: number = 3, numJokers: number = 0): Shoe {
        return new Shoe(deckType, numDecks, numJokers)
    }   // createShoeSimple()

    /**
     * Compare face values of cards.
     * @param {Card} card1 - First ("left") card in comparison.
     * @param {Card} card2 - Second ("right") card in comparison.
     * @return {number} - 0 means equal, -1 means first ("left") card is higher, 1 means second ("right") card is higher.
     */
    export function compareCards(card1: Card, card2: Card): number {
        if (card1.isAceHigh && (card1.pipId === StdFace.Ace || card2.pipId === StdFace.Ace)) {
            if (card1.pipId === StdFace.Ace && card2.pipId === StdFace.Ace) {
                return 0
            } else {
                if (card1.pipId === StdFace.Ace) {
                    // Left card is an Ace.
                    // Only a joker is higher.
                    if (card2.pipId === StdFace.Joker) {
                        return 1
                    } else {
                        return -1
                    }   // if (card2.pipId === StdFace.Joker)
                } else {
                    // Right card is an Ace.
                    // Only a joker is higher.
                    if (card1.pipId === StdFace.Joker) {
                        return -1
                    } else {
                        return 1
                    }   // if (card1.pipId === StdFace.Joker)
                }   // if (card1.pipId === StdFace.Ace)
            }   // if (card1.pipId === StdFace.Ace...)
        } else {
            if (card1.faceValue < card2.faceValue) {
                return 1
            } else if (card1.faceValue > card2.faceValue) {
                return -1
            } else {
                return 0
            }   // if (card1.faceValue < card2.faceValue)
        }   // if (card1.isAceHigh)
    }   // compareCards()
}   // namespace playingCards