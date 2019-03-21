let deck: Shoe = playingCards.createDeck()
let pauseTime: number = 5000
let dummySprite: Sprite
let mySprite: Sprite
let background: Image
let showCards: boolean = false

// Show different image sizes
resetScreen('Poker Deck 8x8')
dummySprite = sprites.create(img`
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
`, 0)
showDeck(CardSpriteSize.EightByEight, 12)
loops.pause(pauseTime)

resetScreen('Poker Deck 8x16')
dummySprite = sprites.create(img`
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
`, 0)
showDeck(CardSpriteSize.EightBySixteen, 12)
loops.pause(pauseTime)

resetScreen('Poker Deck 16x16')
dummySprite = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, 0)
showDeck(CardSpriteSize.SixteenBySixteen, 12)
loops.pause(pauseTime)

resetScreen('Poker Deck 16x32')
dummySprite = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, 0)
showDeck(CardSpriteSize.SixteenByThirtyTwo, 12)
loops.pause(pauseTime)

resetScreen('Poker Deck 32x32')
dummySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
`, 0)
showDeck(CardSpriteSize.ThirtyTwoByThirtyTwo, 12)
loops.pause(pauseTime)

// Show different deck types
deck = playingCards.createDeck(DeckType.Poker, true, false, 2)
dummySprite = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, 0)
resetScreen('Poker Deck + Jokers')
showDeck(CardSpriteSize.SixteenBySixteen, 12)
loops.pause(pauseTime)

deck = playingCards.createDeck(DeckType.Pinochle)
resetScreen('Pinochle Deck')
showDeck(CardSpriteSize.SixteenBySixteen, 12)
loops.pause(pauseTime)

deck = playingCards.createDeck(DeckType.Euchre)
resetScreen('Euchre Deck')
showDeck(CardSpriteSize.SixteenBySixteen, 12)
loops.pause(pauseTime)

// Shuffle cards
deck = playingCards.createDeck()
for (let shuffle: number = 0; shuffle < 3; shuffle++) {
    deck.shuffle()
    resetScreen('Shuffled poker deck (' + (shuffle + 1) + ')')
    showDeck(CardSpriteSize.SixteenBySixteen, 12)
    loops.pause(pauseTime)
}   // for (shuffle)

// Shuffle cards (multiple decks)
/*
deck = playingCards.createShoe(DeckType.Poker, 2)
dummySprite = sprites.create(img`
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
`, 0)
for (let shuffle: number = 0; shuffle < 3; shuffle++) {
    deck.shuffle()
    resetScreen('Shuffled poker deck (' + (shuffle + 1) + ')')
    showDeck(CardSpriteSize.EightBySixteen, 12)
    loops.pause(pauseTime)
}   // for (shuffle)
*/

// Rook deck
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
deck = playingCards.createCustomDeck(suits, suitColors, pipNames, pipValues, 1,
    pipPrint, unsuited, cardBases, image.font8)
dummySprite = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, 0)
resetScreen('Custom Deck - Rook')
showDeck(CardSpriteSize.SixteenBySixteen, 12)
loops.pause(pauseTime)

// Show card info
// deck = playingCards.createDeck()
resetScreen('Custom Deck Values')
mySprite = sprites.create(image.create(16, 16))
mySprite.setFlag(SpriteFlag.Ghost, true)
pauseTime = 1500
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
    mySprite.setImage(deck.getCardImage(myCard, CardSpriteSize.ThirtyTwoByThirtyTwo))
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
    loops.pause(pauseTime)
}   // while (deck.hasMoreCards)


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
    let currX = dummySprite.width / 2
    let currY = dummySprite.height / 2 + topMargin
    while (deck.hasMoreCards) {
        let myCard: Card = deck.nextCard
        let sprite: Sprite = sprites.create(deck.getCardImage(myCard, size), 0)
        sprite.x = currX
        sprite.y = currY
        sprite.setFlag(SpriteFlag.Ghost, true)
        currX += sprite.width
        if (currX > screen.width - sprite.width / 2) {
            currX = sprite.width / 2
            currY += sprite.height
        }   // if (currX >= screen.width...)
    }   // while (deck.hasMoreCards)
}   // showDeck()
