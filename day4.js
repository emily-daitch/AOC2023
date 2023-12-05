const cardsSmall = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
Card 7: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
Card 8: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

//const cardArray = cardsSmall.split("\n");
const cardArray = cards.split("\n");

let score = 0;
let numberOfCards = new Array(cardArray.length).fill(1);
let currentCardIndex = 0;
console.log('additonalCardsWon1 ', numberOfCards);
//1 1 1 1 1  1 1 1
//1 2 2 2 2  1 1 1
//1 2 4 4 2  1 1 1
//1 2 4 8 6  1 1 1
//1 2 4 8 14(no match) 1 1 1
//1 2 4 8 14(no match) 1(no match) 1 1

for (card of cardArray) {
    //console.log('card', card);
    let splitCard = card.split("|");
    let winningNumbersClean = splitCard[0].split(':')[1];
    //console.log('winning numbers', winningNumbersClean);
    let winningNumbersArray = winningNumbersClean.trim().split(/\s+/);
    //console.log('winningNumbersArray', winningNumbersArray);

    //console.log('my numbers', splitCard[1]);
    let myNumbersArray = splitCard[1].trim().split(/\s+/);
    //console.log('myNumbersArray', myNumbersArray);

    let winningSet = new Set(winningNumbersArray);

    let numberOfMatches = 0;
    for(numberToCheck of myNumbersArray) {
        //console.log('checking', numberToCheck);
        if(winningSet.has(numberToCheck)) {
            console.log('found', numberToCheck);
            numberOfMatches++;
        }
    }
    //Part 1
    //if(numberOfMatches) score += Math.pow(2, numberOfMatches - 1);
    //console.log('score', score);
    console.log('numberOfMatches', numberOfMatches);

    //don't do this, when there are no matches we still want to move through all cards.
    //in the end, we have spans of cards that we have 0 copies of... but the correct answer
    //stems from the assumption we move beyond 0 matches to continue checking all of our remaining cards
    //in other words, this should not be a stopping condition
    // if(numberOfMatches == 0) {
    //     console.log('breaking');
    //     break;
    // }
    //Part 2
    for (let i = currentCardIndex; i < currentCardIndex + numberOfMatches; i++) {
        console.log('i', i);
        if (currentCardIndex == 0) {
            numberOfCards[i + 1] = numberOfCards[i + 1] + 1;
        } else {
            console.log('addind numberOfCards[i + 1] ', numberOfCards[i + 1], ' to numberOfCards[i] - 1 ', numberOfCards[currentCardIndex], 'and setting to numberOfCards[', i+1, ']');
          numberOfCards[i + 1] = numberOfCards[i + 1] + numberOfCards[currentCardIndex];
        }
    }
    console.log('additonalCardsWon2 ', numberOfCards);
    currentCardIndex++;
}
score = numberOfCards.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 0);

document.querySelector('#header').innerHTML = score;
