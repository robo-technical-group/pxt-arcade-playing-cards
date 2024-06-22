/**
 * Representation of a single deck or multiple decks of playing cards.
 */
//% blockNamespace=PlayingCards
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
    //% blockCombine group="Shoes (Decks)"
    //% block="are aces high"
    //% weight=70
    //% callInDebugger
    public get isAceHigh(): boolean {
        return this._deck.isAceHigh
    }   // get isAceHigh()

    //% blockCombine group="Shoes (Decks)"
    //% block="are aces high"
    //% callInDebugger
    //% weight=75
    public set isAceHigh(value: boolean) {
        this._deck.isAceHigh = value
    }

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
    //% size.defl=CardSpriteSize.SixteenBySixteen card.shadow="variables_get"
    public getCardImage(card: Card, size: CardSpriteSize = CardSpriteSize.Size16x16): Image {
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
