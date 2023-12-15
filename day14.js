const testInput = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`

const swapElements = (array, index1, index2) => {
    array[index1] = array.splice(index2, 1, array[index1])[0];
};

const lines = input.split('\n');
lines.reverse();

// array of character arrays that represent columns of the data from south to north
let transformedArray = Array.from({length: lines[0].length}, e => Array());

// construct the strings
for(line of lines) {
  let ci = 0;
  for(c of line) {
    transformedArray[ci].push(c);
    ci++;
  }
}
for(row of transformedArray) {
    row.reverse();
}

let found = true;
while(found == true) {
    found = false;
    for(row of transformedArray) {
    for(let i = 0; i < row.length - 1; i++) {
        if(row[i] == '.' && row[i + 1] == 'O') {
            found = true;
            swapElements(row, i, i+1);
            
        }
    }
    }
}

let cc = 0;
let score = 0;
for(row of transformedArray) {
    cc = 0;
    for(c of row) {
        if(c == 'O') {
            score += row.length - cc;
        }
        cc++;
    }
}

document.querySelector('#header').innerHTML = score;
