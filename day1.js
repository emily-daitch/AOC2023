const testCaseArray = testCase.split("\n");
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
        if (isNaN(firstValue) && isNaN(c)) {
            switch (c) {
                case 'o':
                    if (currentValue.substring(i, i + 3) == 'one') {
                        console.log('found one');
                        firstValue = 1;
                        firstIndex = i;
                        lastValue = 1;
                        secondIndex = i;
                    }
                    break;
                case 't':
                    if (currentValue.substring(i, i + 3) == 'two') {
                        console.log('found two');
                        firstValue = 2;
                        firstIndex = i;
                        lastValue = 2;
                        secondIndex = i;
                    }
                    if (currentValue.substring(i, i + 5) == 'three') {
                        console.log('found three');
                        firstValue = 3;
                        firstIndex = i;
                        lastValue = 3;
                        secondIndex = i;
                    }
                    break;
                case 'f':
                    if (currentValue.substring(i, i + 4) == 'four') {
                        console.log('found four');
                        firstValue = 4;
                        firstIndex = i;
                        lastValue = 4;
                        secondIndex = i;
                    }
                    if (currentValue.substring(i, i + 4) == 'five') {
                        console.log('found five');
                        firstValue = 5;
                        firstIndex = i;
                        lastValue = 5;
                        secondIndex = i;
                    }
                    break;
                case 's':
                    if (currentValue.substring(i, i + 3) == 'six') {
                        console.log('found six');
                        firstValue = 6;
                        firstIndex = i;
                        lastValue = 6;
                        secondIndex = i;
                    }
                    if (currentValue.substring(i, i + 5) == 'seven') {
                        console.log('found seven');
                        firstValue = 7;
                        firstIndex = i;
                        lastValue = 7;
                        secondIndex = i;
                    }
                    break;
                case 'e':
                    if (currentValue.substring(i, i + 5) == 'eight') {
                        console.log('found eight');
                        firstValue = 8;
                        firstIndex = i;
                        lastValue = 8;
                        secondIndex = i;
                    }
                    break;
                case 'n':
                    if (currentValue.substring(i, i + 4) == 'nine') {
                        console.log('found nine');
                        firstValue = 9;
                        firstIndex = i;
                        lastValue = 9;
                        secondIndex = i;
                    }
                    break;
                default:
                    break;
            }
        }
        if (isNaN(firstValue) && !isNaN(c)) {
            firstValue = Number(c);
            lastValue = Number(c);
            firstIndex = i;
            secondIndex = i;
        }
        if (!isNaN(c)) {
            lastValue = Number(c);
            secondIndex = i;
        }
        if (isNaN(c)) {
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

    currentCalculation = 10 * firstValue + lastValue;
    console.log('aadding ', currentCalculation);
    return accumulator + currentCalculation;
}, 0);

document.querySelector('#header').innerHTML = testAnswer;
