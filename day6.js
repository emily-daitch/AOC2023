const input = `Time:        59     70     78     78
Distance:   430   1218   1213   1276`;
const example = `Time:      7     15     30
Distance:  9   40   200`

const lines = input.split("\n");
//const lines = example.split("\n");
const times = lines[0].split(':')[1].trim().split('     ');
const distances = lines[1].split(':')[1].trim().split('   ');
console.log('lines', lines);
console.log('times', times);
console.log('distances', distances);

let time = times.reduce((accumulator, currentValue) => accumulator + currentValue, "")
let distanceString = distances.reduce((accumulator, currentValue) => accumulator + currentValue, "")
console.log('time', time);
console.log('distanceString', distanceString);

//let numberTimes =  times.map((time) => parseInt(time, 10));
//let numberDistances =  distances.map((distance) => parseInt(distance, 10));
//console.log('numberTimes', numberTimes);
//console.log('numberDistances', numberDistances);

//const maxTime = Math.max(...numberTimes);
//console.log('maxTime', maxTime);

//let i = 0;
//let answer = 1;
//for (time of numberTimes) {
    let count = 0;
    for (let j = 0; j < time; j++) {
        let distance = j * (time - j);
        //console.log('distance', distance);
        //if (distance > numberDistances[i]) {
        if (distance > parseInt(distanceString,10)) {
                count++;
        }
    }
    console.log('count', count);
    //answer *= count;
    answer = count;
    //i++;
//}
console.log('answer', answer);
document.querySelector('#header').innerHTML = answer;
