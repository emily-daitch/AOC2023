//testCase imported from day1data.js
//make an array from the test case lines

const testCaseSmall = `nkzjrdqrmpztpqninetwofour1znnkd
s5sevenxrdfr4mhpstgbjcfqckronesix
3four4
sfdrtpvspsixsn5zbqmggb8vgkjseight`
// 91 + 56 + 34 + 68

const testCaseArray = testCase.split("\n");
//const testCaseArray = testCaseSmall.split("\n");

const determineNumberWord = ((currentValue, i) => {
    const c = currentValue[0];
    
    switch (c) {
        case 'o':
            if (currentValue.substring(i, i + 3) == 'one') {
                console.log('found one');
                return 1;
            }
        case 't':
            if (currentValue.substring(i, i + 3) == 'two') {
                console.log('found two');
                return 2;
            }
            if (currentValue.substring(i, i + 5) == 'three') {
                console.log('found three');
                return 3;
            }
        case 'f':
            if (currentValue.substring(i, i + 4) == 'four') {
                console.log('found four');
                return 4;
            }
            if (currentValue.substring(i, i + 4) == 'five') {
                console.log('found five');
                return 5;
            }
        case 's':
            if (currentValue.substring(i, i + 3) == 'six') {
                console.log('found six');
                return 6;
            }
            if (currentValue.substring(i, i + 5) == 'seven') {
                console.log('found seven');
                return 7;
            }
        case 'e':
            if (currentValue.substring(i, i + 5) == 'eight') {
                console.log('found eight');
                return 8;
            }
        case 'n':
            if (currentValue.substring(i, i + 4) == 'nine') {
                console.log('found nine');
                return 9;
            }
        default:
            return -1;
            //break;
    }
});

//add first and last occurring numbers (or for part two, numbers or number-words) on each line
const testAnswer = testCaseArray.reduce((accumulator, currentValue) => {
    let currentCalculation = 0;
    let firstValue = undefined;
    var lastValue = undefined;
    let firstIndex = undefined;
    let secondIndex = undefined;
    let i = 0;

    console.log('checking ', currentValue);
    for (c of currentValue) {
        console.log('checking ', c);
        //if first number is not yet found and the current character is not a number, check for number-words
        if (isNaN(firstValue) && isNaN(c)) {
            console.log('if first number is not yet found and the current character is not a number, check for number-words');
            let number = determineNumberWord(currentValue, i);
            if (number !== -1) {
                console.log('found number-word is', number);
                firstValue = number;
                firstIndex = i;
                lastValue = number;
                secondIndex = i;
            }
        }
        //if first number is not yet found and current character is a number, record it
        if (isNaN(firstValue) && !isNaN(c)) {
            console.log('found real first number', c);
            firstValue = Number(c);
            lastValue = Number(c);
            firstIndex = i;
            secondIndex = i;
        }
        //if current value is a number, always override the last found number
        if (!isNaN(c)) {
            lastValue = Number(c);
            secondIndex = i;
        }
        //if current value is not a number, check for number-words and override last value if found
        if (isNaN(c)) {
            console.log('currentValue', currentValue);
            // let number = determineNumberWord(currentValue, i);
            // if (number !== -1) {
            //     lastValue = number;
            //     secondIndex = i;
            // }
            switch (c) {
                case 'o':
                    if (currentValue.substring(i, i + 3) == 'one') {
                        console.log('found one');
                        lastValue = 1;
                        secondIndex = i;
                    }
                    break;
                case 't':
                    if (currentValue.substring(i, i + 3) == 'two') {
                        console.log('found two');
                        lastValue = 2;
                        secondIndex = i;
                    }
                    if (currentValue.substring(i, i + 5) == 'three') {
                        console.log('found three');
                        lastValue = 3;
                        secondIndex = i;
                    }
                    break;
                case 'f':
                    if (currentValue.substring(i, i + 4) == 'four') {
                        console.log('found four');
                        lastValue = 4;
                        secondIndex = i;
                    }
                    if (currentValue.substring(i, i + 4) == 'five') {
                        console.log('found five');
                        lastValue = 5;
                        secondIndex = i;
                    }
                    break;
                case 's':
                    if (currentValue.substring(i, i + 3) == 'six') {
                        console.log('found six');
                        lastValue = 6;
                        secondIndex = i;
                    }
                    if (currentValue.substring(i, i + 5) == 'seven') {
                        console.log('found seven');
                        lastValue = 7;
                        secondIndex = i;
                    }
                    break;
                case 'e':
                    if (currentValue.substring(i, i + 5) == 'eight') {
                        console.log('found eight');
                        lastValue = 8;
                        secondIndex = i;
                    }
                    break;
                case 'n':
                    if (currentValue.substring(i, i + 4) == 'nine') {
                        console.log('found nine');
                        lastValue = 9;
                        secondIndex = i;
                    }
                    break;
                default:
                    break;
            }
        }
        i++;
    }

    //create a two digit number from the first and last found occurrences to add to the running total
    currentCalculation = 10 * firstValue + lastValue;
    console.log('adding ', currentCalculation, 'first value', firstValue, 'last value', lastValue);
    return accumulator + currentCalculation;
}, 0);

//show on page...
document.querySelector('#header').innerHTML = testAnswer;
