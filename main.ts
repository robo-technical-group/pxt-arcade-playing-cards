let deck: Shoe = PlayingCards.createDeck()
const PAUSE_TIME: number = 5000
let mySprite: Sprite = null
let background: Image = null
let showCards: Boolean = false

function resetScreen(title: string = null) {
    for (let sprite of sprites.allOfKind(0)) {
        sprite.destroy()
    }   // for (sprite)
    deck.reset()
    background = image.create(screen.width, screen.height)
    background.fill(15)
    background.printCenter(title, 0, 1, image.font5)
    background.printCenter('Number of cards: ' + deck.numCards, 6, 1, image.font5)
    scene.setBackgroundImage(background)
}   // resetScreen()

function showDeck(size: CardSpriteSize, topMargin: number = 0) {
    let width: number = 0
    let height: number = 0
    switch (size) {
        case CardSpriteSize.Size8x8:
            width = 8
            height = 8
            break

        case CardSpriteSize.Size8x16:
            width = 8
            height = 16
            break

        case CardSpriteSize.Size16x16:
            width = 16
            height = 16
            break

        case CardSpriteSize.Size16x32:
            width = 16
            height = 32
            break

        case CardSpriteSize.Size32x32:
            width = 32
            height = 32
            break
    }
    let currX = width / 2
    let currY = height / 2 + topMargin
    while (deck.hasMoreCards) {
        let myCard: Card = deck.nextCard
        let sprite: Sprite = sprites.create(deck.getCardImage(myCard, size), 0)
        sprite.x = currX
        sprite.y = currY
        sprite.setFlag(SpriteFlag.Ghost, true)
        currX += width
        if (currX > screen.width - width / 2) {
            currX = width / 2
            currY += height
        }   // if (currX >= screen.width...)
    }   // while (deck.hasMoreCards)
}   // showDeck()


/**
 * Show different image sizes
 */
let titles: string[] = [
    'Poker Deck 8x8',
    'Poker Deck 8x16',
    'Poker Deck 16x16',
    'Poker Deck 16x32',
    'Poker Deck 32x32',
]

let sizes: CardSpriteSize[] = [
    CardSpriteSize.Size8x8,
    CardSpriteSize.Size8x16,
    CardSpriteSize.Size16x16,
    CardSpriteSize.Size16x32,
    CardSpriteSize.Size32x32,
]

for (let i: number = 0; i < titles.length; i++) {
    resetScreen(titles[i])
    showDeck(sizes[i], 12)
    loops.pause(PAUSE_TIME)
}

/**
 * Show different deck types
 */
titles = [
    'Poker Deck + Jokers',
    'Pinochle Deck',
    'Euchre Deck',
]

let deckTypes: DeckType[] = [
    DeckType.Poker,
    DeckType.Pinochle,
    DeckType.Euchre,
]

for (let i: number = 0; i < titles.length; i++) {
    if (i == 0) {
        deck = PlayingCards.createDeck(DeckType.Poker, 2)
    } else {
        deck = PlayingCards.createDeck(deckTypes[i])
    }
    resetScreen(titles[i])
    showDeck(CardSpriteSize.Size16x16, 12)
    loops.pause(PAUSE_TIME)
}

/**
 * Shuffle cards
 */
deck = PlayingCards.createDeck()
for (let i: number = 0; i < 3; i++) {
    deck.shuffle()
    resetScreen(`Shuffled poker deck (${i + 1})`)
    showDeck(CardSpriteSize.Size16x16, 12)
    loops.pause(PAUSE_TIME)
}

/**
 * Rook deck
 */
let suits: string[] = ['Green', 'Red', 'Black', 'Yellow']
let suitColors: number[] = [7, 2, 15, 5, 15]
let pipNames: string[] = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven',
    'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Rook']
let pipValues: number[] = [0, 0, 0, 0, 5, 0, 0,
    0, 0, 10, 0, 0, 0, 10, 20]
let pipPrint: string[] = ['1', '2', '3', '4', '5', '6', '7',
    '8', '9', '10', '11', '12', '13', '14', 'Rk']
let unsuited: number[] = [14]
let cardBases: Image[] = [
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
        1 7 7 7 7 7 7 7 7 7 7 7 7 7 7 1
        1 7 7 7 7 7 7 7 7 7 7 7 7 7 7 1
        1 7 7 7 7 7 7 7 7 7 7 7 7 7 7 1
        1 7 7 7 7 7 7 7 7 7 7 7 7 7 7 1
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 .
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
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
        1 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1
        1 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1
        1 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1
        1 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 .
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
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
        1 f f f f f f f f f f f f f f 1
        1 f f f f f f f f f f f f f f 1
        1 f f f f f f f f f f f f f f 1
        1 f f f f f f f f f f f f f f 1
        . f f f f f f f f f f f f f f .
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
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
        1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 1
        1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 1
        1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 1
        1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 1
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 .
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
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
        1 f f f f f f f f f f f f f f 1
        1 f 1 1 1 1 1 1 1 1 1 1 1 1 f 1
        1 f 1 f f f f f f f f f f 1 f 1
        1 f 1 f f f f f f f f f f 1 f 1
        1 f 1 1 1 1 1 1 1 1 1 1 1 1 f 1
        . f f f f f f f f f f f f f f .
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
    `
]
deck = PlayingCards.createCustomDeck(suits, suitColors, pipNames, pipValues, 1,
    pipPrint, unsuited, cardBases, image.font8)
resetScreen('Custom Deck - Rook')
showDeck(CardSpriteSize.Size16x16, 12)
loops.pause(PAUSE_TIME)

// Show card info
// deck = playingCards.createDeck()
resetScreen('Custom Deck Values')
mySprite = sprites.create(image.create(16, 16))
mySprite.setFlag(SpriteFlag.Ghost, true)
let newPauseTime: number = 1500
let myCard: Card
while (deck.hasMoreCards) {
    myCard = deck.nextCard
    let messages: string[] = [
        myCard.name,
        'ID = ' + myCard.id,
        'Face Value = ' + myCard.faceValue,
        'Pip = ' + myCard.pipId,
        'Suit = ' + myCard.suitValue
    ]
    mySprite.setImage(deck.getCardImage(myCard, CardSpriteSize.Size32x32))
    background = image.create(screen.width, screen.height)
    background.fill(15)
    background.printCenter('Custom Deck Values', 0, 1, image.font5)
    background.printCenter('Number of cards: ' + deck.numCards, 6, 1, image.font5)
    let currY = 80
    for (let message of messages) {
        background.printCenter(message, currY, 1, image.font5)
        currY += 6
    }   // for (message)
    scene.setBackgroundImage(background)
    loops.pause(newPauseTime)
}   // while (deck.hasMoreCards)
