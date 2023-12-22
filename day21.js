// wip
const testInput = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`;

//const data = testInput.split('\n');
const data = input.split('\n');

let position = { row: 0, col: 0 };
let x = 1;
let y = 1;
let linearGarden = Array((data[0].length + 2) * (data.length + 2)).fill({ type: 'x' });

for(row of data) {
    for(c of row) {
        if(c == '.') {
            linearGarden[y*(data[0].length + 2) + x ] = { visited: false, type: '.' };
        } else if (c == '#') {
            linearGarden[y*(data[0].length + 2) + x ] = { visited: false, type: '#' };
        } else {
            position.row = y;
            position.col = x;
            linearGarden[y*(data[0].length + 2) + x ] = { visited: true, type: 'S' };
        }
        x++;
    }
    x = 1;
    y++;
}

let steps = 63;
let visited = 0;
let prev = 1;
let q = [position]
while(steps > 0) {
    let toAdd = [];
    for(loc of q) {
        let right = loc.row * (data[0].length + 2) + loc.col + 1;
        let left = loc.row * (data[0].length + 2) + loc.col - 1;
        let up = (loc.row - 1) * (data[0].length + 2) + loc.col;
        let down = (loc.row + 1) * (data[0].length + 2) + loc.col;
        if(linearGarden[right].type == '.' && linearGarden[right].visited == false) {
            linearGarden[right] = { visited: true, type: '0' };
            toAdd.push({ col: loc.col + 1, row: loc.row })
        }
        if(linearGarden[left].type == '.' && linearGarden[left].visited == false) {
            linearGarden[left] = { visited: true, type: '0' };
            toAdd.push({ col: loc.col - 1, row: loc.row })
        }
        if(linearGarden[up].type == '.' && linearGarden[up].visited == false) {
            linearGarden[up] = { visited: true, type: '0' };
            toAdd.push({ col: loc.col, row: loc.row - 1 })
        }
        if(linearGarden[down].type == '.' && linearGarden[down].visited == false) {
            linearGarden[down] = { visited: true, type: '0' };
            toAdd.push({ col: loc.col, row: loc.row + 1 })
        }
    }
    visited -= q.length;
    visited += prev;
    console.log('minus', q.length);
    console.log('plus prev', prev);
    prev = q.length;
    q.length = 0;
    q.push(...toAdd);
    visited += toAdd.length;
    console.log('plus', toAdd.length);
    console.log('visited', visited);
    let ln = '';
    for(let i = 0; i < (data[0].length + 2) * (data.length + 2); i++) {
        ln += linearGarden[i].type;
        if((i + 1) % (data[0].length + 2) == 0) {
            ln += '\n';
        }
    }
    console.log(ln);

    steps--;
}

console.log(position);
console.log(linearGarden);
console.log(visited - 1);

// let ln = '';
// for(let i = 0; i < (data[0].length + 2) * (data.length + 2); i++) {
//     ln += linearGarden[i].type;
//     if((i + 1) % (data[0].length + 2) == 0) {
//         console.log('mod', i + 1)
//         ln += '\n';
//     }
// }
// console.log(ln);
document.querySelector('#header').innerHTML = 'ans';

// msschmitt
