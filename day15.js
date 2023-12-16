/*
Determine the ASCII code for the current character of the string.
Increase the current value by the ASCII code you just determined.
Set the current value to itself multiplied by 17.
Set the current value to the remainder of dividing itself by 256.
*/

//const testInput = `HASH`;
const testInput = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;
//const testInput = `rn=1,cm-,qp=3,cm=2,qp-`;

let hashFunction = ((string) => {
  let currentValue = 0;
  for(c of string) {
    console.log(c);
    let ascii = c.charCodeAt(0);
    currentValue += ascii;
    currentValue *= 17;
    currentValue = currentValue % 256;
  }
  return currentValue;
});

let inputArray = input.split(',');
//let inputArray = testInput.split(',');
console.log(inputArray);
// let ans = 0;
let boxes = new Array(256).fill(null).map(() => ([]));
// for (box of boxes) {
//     console.log('boxy')
//     box = {test: 1};
// }
console.log(boxes);
for(step of inputArray) {
    //let stepValue = hashFunction(step);
    //console.log(stepValue);
    //ans += stepValue;
    console.log(step);
    if (step.includes('-')) {
        console.log('-');
        let toHash = step.split('-');
        console.log('toHash', toHash[0]);
        let boxIndex = hashFunction(toHash[0]);
        if(boxes[boxIndex].some(item => toHash[0] in item)) {
            console.log('found to delete');
            let i = boxes[boxIndex].findIndex(item => toHash[0] in item);
            console.log('i', i);
            boxes[boxIndex].splice(i, 1);
        }
    } else {
        console.log('=');
        let toHash = step.split('=');
        console.log('toHash', toHash[0]);
        let boxIndex = hashFunction(toHash[0]);
        console.log('toHashVal', boxIndex);
        console.log('focal', toHash[1]);
        if(boxes[boxIndex].some(item => toHash[0] in item)) {
            console.log('found');
            let i = boxes[boxIndex].findIndex(item => toHash[0] in item);
            boxes[boxIndex][i][toHash[0]] = toHash[1];
        } else {
            boxes[hashFunction(toHash[0])].push({[toHash[0]]: toHash[1]});
        }
    }
}

console.log(boxes);

let boxIndex = 1;
let ans = 0;
for(box of boxes) {
    let lensIndex = 1;
    for(lens of box) {
        let power = boxIndex * lensIndex * Object.values(lens)[0];
        console.log('power', power);
        ans += power;
        lensIndex++;
    }
    boxIndex++;
}

document.querySelector('#header').innerHTML = ans;
