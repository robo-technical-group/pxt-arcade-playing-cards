/**
 * Immutable representation of a card
 */
//% blockNamespace=PlayingCards group="Cards"
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
    //% card.shadow="variables_get"
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
    //% card.shadow="variables_get"
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
    //% card.shadow="variables_get"
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
