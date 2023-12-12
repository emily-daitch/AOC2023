const testInput = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;
let lines = input.split('\n');
//let lines = testInput.split('\n');
//console.log(lines);
const columnStrings = new Array(lines[0].length).fill([]);
let emptyRows = [];
let emptyColumns = [];
let lineIndex = 0;
let columnIndex = 0;
for (line of lines) {
  columnIndex = 0;
  if(!line.includes('#')) emptyRows.push(lineIndex);
  for (c of line) {
    columnStrings[columnIndex] = columnStrings[columnIndex] + c;
    columnIndex++;
  }
  lineIndex++;
}
console.log('emptyRows', emptyRows);
columnIndex = 0;
for (column of columnStrings) {
    if(!column.includes('#')) emptyColumns.push(columnIndex);
    columnIndex++;
}
console.log('emptyColumns', emptyColumns);

let added = 0;
for(emptyRow of emptyRows) {
    console.log('emptyRow', emptyRow);
    lines = [
        ...lines.slice(0, emptyRow + added),
        lines[emptyRow + added],
        ...lines.slice(emptyRow + added)
    ]
    added++;
}
console.log('updated lines', lines);
let lineNumber = 0;
for(line of lines) {
    added = 0;
    for(emptyColumn of emptyColumns) {
        //console.log('emptyColumn', emptyColumn);
        lines[lineNumber] = lines[lineNumber].slice(0, emptyColumn + added) + '.' + lines[lineNumber].slice(emptyColumn + added);
        added++;
    }
    lineNumber++;
}
console.log('updated lines', lines);

let galaxies = []
let x = 0;
let y = 0;
let id = 0;
for (line of lines) {
    x = 0;
    for (c of line) {
        if (c == '#') {
            galaxies.push({x, y, id})
            id++
        }
        x++;
    }
    y++;
}
console.log(galaxies);
let count = 0;
let gI = 0;
let gJ = 0;
let sum = 0;
for(; gI < galaxies.length; gI++) {
    for(gJ = gI; gJ < galaxies.length; gJ++) {
        if (!(galaxies[gI].x == galaxies[gJ].x && galaxies[gI].y == galaxies[gJ].y)) {
            count++;
            sum += Math.abs(galaxies[gI].x - galaxies[gJ].x) + Math.abs(galaxies[gI].y - galaxies[gJ].y);
        }
    }
}

document.querySelector('#header').innerHTML = sum;
