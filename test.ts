let deck: Shoe = PlayingCards.createDeck()
const PAUSE_TIME: number = 5000
let mySprite: Sprite = null
let background: Image = image.create(screen.width, screen.height)
let showCards: Boolean = false
let cursor: Sprite = null
let runningOrderingTest: boolean = false
let orderingCards: Card[] = []
let orderingCardSprites: Sprite[] = []
let orderingDecks: Shoe[] = []
let xCoords: number[] = [40, 80, 120,]
let yCoords: number[] = [100, 80, 100,]
let cursorCard: number = 0

function advanceCard(): void {
    deck = orderingDecks[cursorCard]
    if (!deck.hasMoreCards) {
        deck.reset()
    }
    orderingCards[cursorCard] = deck.nextCard
    updateCard(cursorCard)
}

function advanceCursor(): void {
    cursorCard++
    if (cursorCard >= xCoords.length) {
        cursorCard = 0
    }
    updateCursor()
}

function evaluate(): void {
    let isBetween: boolean =
        (
            orderingCards[0].isLessThan(orderingCards[1]) &&
            orderingCards[1].isLessThan(orderingCards[2])
        ) || (
            orderingCards[0].isGreaterThan(orderingCards[1]) &&
            orderingCards[1].isGreaterThan(orderingCards[2])
        )
    let msg: string = "Left card: " + orderingCards[0].name +
        "\nMiddle card: " + orderingCards[1].name +
        "\nRight card: " + orderingCards[2].name +
        "\n" + orderingCards[0].faceValue +
        " - " + orderingCards[1].faceValue +
        " - " + orderingCards[2].faceValue +
        "\nMiddle in between? " + isBetween
        
    game.showLongText(msg, DialogLayout.Top)
}

function resetScreen(title: string = null): void {
    for (let sprite of sprites.allOfKind(0)) {
        sprite.destroy()
    }   // for (sprite)
    deck.reset()
    background.fill(15)
    background.printCenter(title, 0, 1, image.font5)
    background.printCenter('Number of cards: ' + deck.numCards, 6, 1, image.font5)
    if (runningOrderingTest) {
        background.printCenter('Move cursor with A', 35, 5, image.font5)
        background.printCenter('Change card with d-pad', 42, 5, image.font5)
        background.printCenter('Evaluate with B', 49, 5, image.font5)
    }
    scene.setBackgroundImage(background)
}   // resetScreen()

function showDeck(size: CardSpriteSize, topMargin: number = 0): void {
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

function startOrderingTest(): void {
    runningOrderingTest = true
    for (let i: number = 0; i < xCoords.length; i++) {
        if (i == 0) {
            resetScreen('Card ordering test')
        }
        deck = PlayingCards.createDeck(DeckType.Poker, 2, true)
        orderingDecks.push(deck)
        orderingCards.push(deck.nextCard)
        mySprite = sprites.create(img`.`, 0)
        orderingCardSprites.push(mySprite)
        updateCard(i)
    }
    let cursorImage: Image = image.create(38, 38)
    cursorImage.fillRect(0, 0, 38, 38, 9)
    cursorImage.fillRect(2, 2, 34, 34, 0)
    cursor = sprites.create(cursorImage, 0)
    updateCursor()
}

function updateCard(index: number): void {
    deck = orderingDecks[index]
    mySprite = orderingCardSprites[index]
    let card: Card = orderingCards[index]
    mySprite.setImage(deck.getCardImage(card, CardSpriteSize.Size32x32))
    mySprite.setPosition(xCoords[index], yCoords[index])
}

function updateCursor(): void {
    cursor.setPosition(xCoords[cursorCard], yCoords[cursorCard])
}

controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
    if (!runningOrderingTest) {
        startOrderingTest()
    } else {
        advanceCursor()
    }
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!runningOrderingTest) {
        startOrderingTest()
    } else {
        evaluate()
    }
})

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!runningOrderingTest) {
        startOrderingTest()
    } else {
        advanceCard()
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!runningOrderingTest) {
        startOrderingTest()
    } else {
        advanceCard()
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!runningOrderingTest) {
        startOrderingTest()
    } else {
        advanceCard()
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!runningOrderingTest) {
        startOrderingTest()
    } else {
        advanceCard()
    }
})


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
    if (!runningOrderingTest) {
        resetScreen(titles[i])
        showDeck(sizes[i], 12)
        loops.pause(PAUSE_TIME)
    }
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
    if (!runningOrderingTest) {
        if (i == 0) {
            deck = PlayingCards.createDeck(DeckType.Poker, 2)
        } else {
            deck = PlayingCards.createDeck(deckTypes[i])
        }
        resetScreen(titles[i])
        showDeck(CardSpriteSize.Size16x16, 12)
        loops.pause(PAUSE_TIME)
    }
}

/**
 * Shuffle cards
 */
if (!runningOrderingTest) {
    deck = PlayingCards.createDeck()
}

for (let i: number = 0; i < 3; i++) {
    if (!runningOrderingTest) {
        deck.shuffle()
        resetScreen(`Shuffled poker deck (${i + 1})`)
        showDeck(CardSpriteSize.Size16x16, 12)
        loops.pause(PAUSE_TIME)
    }
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
if (!runningOrderingTest) {
    deck = PlayingCards.createCustomDeck(suits, suitColors, pipNames, pipValues, 1,
        pipPrint, unsuited, cardBases, image.font8)
    resetScreen('Custom Deck - Rook')
    showDeck(CardSpriteSize.Size16x16, 12)
    loops.pause(PAUSE_TIME)
}

// Show card info
// deck = playingCards.createDeck()
if (!runningOrderingTest) {
    resetScreen('Custom Deck Values')
    mySprite = sprites.create(image.create(16, 16))
    mySprite.setFlag(SpriteFlag.Ghost, true)
    let newPauseTime: number = 1500
    let myCard: Card
    while (deck.hasMoreCards && !runningOrderingTest) {
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
}
