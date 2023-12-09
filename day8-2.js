const mappings = input.split('\n');
const directions = mappings[0];
mappings.shift();
console.log(directions);
console.log(mappings);

//gcd and lcm from aashutosr
  const gcd = (a, b) => {
    if (b === 0) return a;
    return gcd(b, a % b);
  };
  
  const lcm = (a, b) => {
    return (a * b) / gcd(a, b);
  };

// get your data organized
let map = mappings.map((entry) => {
    return { point: entry.split(' ')[0],
             L: entry.split('(')[1].split(',')[0],
             R: entry.split(', ')[1].split(')')[0]
    };
});
console.log(map);

let numOfSteps = 0;
let currNodes = map.filter((k) => k.point.endsWith("A"));
console.log('currNodes', currNodes);

// console.log(instruction, networkMap);
let instructionIdx = 0;

const finalNums = [];

for (let k = 0; k < currNodes.length; k++) {
    console.log('k',k);
  instructionIdx = 0;
  numOfSteps = 0;
  let currNode = currNodes[k];
  console.log('currNode', currNode);
  let q = 0;
  while (!currNode.point.endsWith("Z")) {
    if (instructionIdx === directions.length) {
      instructionIdx = 0;
    }
    if (directions[instructionIdx] == 'L') {
        //console.log('map[currNode]', map[currNode]);
        currNode = map[map.findIndex((item) => item.point == currNode.L)];//.L;
    } else {
        currNode = map[map.findIndex((item) => item.point == currNode.R)];//.R;
    }
    numOfSteps++;
    instructionIdx++;
    console.log(`After ${numOfSteps} at ${currNode.point}`);
    q++;
  }
  finalNums.push(numOfSteps);
}

//let currentPoint = 'AAA';
//let index = map.findIndex((element) => element.point == currentPoint);
//console.log(index);
//let found = false;
//let i = 0;
/*while (!found) {
    for(direction of directions) {
        if(currentPoint == 'ZZZ') {
            found = true;
            break;
        };
        i++;
        if(direction == 'R') {
            console.log('testR', map[index]);
            currentPoint = map[index].R;
            console.log('testRCurrentPoint', currentPoint, currentPoint.length);
            index = map.findIndex((element) => element.point == currentPoint);
            console.log('testRindex', index);
        } else {
            console.log('testL', map[index]);
            currentPoint = map[index].L;
            index = map.findIndex((element) => element.point == currentPoint);
            console.log('testLindex', index);
        }
    };
};*/

console.log(finalNums);

const answer = finalNums.reduce((acc, curr) => lcm(acc, curr), 1);

document.querySelector('#header').innerHTML = answer;
