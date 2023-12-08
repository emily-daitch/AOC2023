const mappings = input.split('\n');
const directions = mappings[0];
mappings.shift();
console.log(directions);
console.log(mappings);

// get your data organized
let map = mappings.map((entry) => {
    return { point: entry.split(' ')[0],
             L: entry.split('(')[1].split(',')[0],
             R: entry.split(', ')[1].split(')')[0]
    };
});
console.log(map);

let currentPoint = 'AAA';
let index = map.findIndex((element) => element.point == currentPoint);
console.log(index);
let found = false;
let i = 0;
while (!found) {
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
};
console.log(currentPoint);

document.querySelector('#header').innerHTML = i;
