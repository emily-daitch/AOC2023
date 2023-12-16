const testInput = `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`;

const lines = testInput.split('\n');
console.log(lines);

let arr = [];
let energizedArr = [];
let visitedArr = [];
let li = 0;
let ri = 0;
for(line of lines) {
    arr.push([]);
    energizedArr.push([]);
    ri = 0;
    for(c of line){
        arr[li].push(c);
        energizedArr[li].push('');
        ri++;
    }
    li++
}

// i is left/right j is up/down
//visitedArr[0].push([]);
let followBeam = ((i, j, dir, id) => {
    if(visitedArr[id] == null) visitedArr.push([]);
    if(visitedArr[id].includes({[i]: j})) return;
    else visitedArr[id].push({[i]: j})
    console.log('followBeam i ', i, ' j ', j, ' dir ', dir, ' id ', id);
    console.log('char at current place', arr[j][i]);
    energizedArr[j][i] = '#';
    if(arr[j][i] == '.') {
        switch(dir) {
            case 'r':
                if(i < arr[0].length - 1) followBeam(i + 1, j, dir, id)
                break;
            case 'l':
                if(i > 0) followBeam(i - 1, j, dir, id)
                break;
            case 'u':
                if(j > 0) followBeam(i, j - 1, dir, id)
                break;
            case 'd':
                if(j < arr.length - 1) {
                    console.log('going down, keep going down');
                    followBeam(i, j + 1, dir, id)
                }
                break;
            default:
                console.log('bad direction!');
                break;
        }
    }
    if(arr[j][i] == '\\') {
        switch(dir) {
            case 'r':
                console.log('go up only')
                if(j < arr.length - 1) {
                    console.log('go down only')
                    visitedArr.push([]);
                    followBeam(i, j + 1, 'd', id++)
                }
                break;
            case 'l':
                if(j > 0) {
                    console.log('go up only')
                    visitedArr.push([]);
                    followBeam(i, j - 1, 'u', id++)
                }
                break;
            case 'u':
                if(i > 0) {
                    console.log('go left only')
                    visitedArr.push([]);
                    followBeam(i - 1, j, 'l', id++)
                }
                break;
            case 'd':
                if(i < arr[0].length - 1) {
                    console.log('go right only')
                    visitedArr.push([]);
                    followBeam(i + 1, j, 'r', id++)
                }
                break;
            default:
                console.log('bad direction!');
                break;
        }
    }
    if(arr[j][i] == '/') {
        switch(dir) {
            case 'r':
                if(j > 0) {
                    console.log('go right only')
                    visitedArr.push([]);
                    followBeam(i, j - 1, 'u', id++)
                }
                break;
            case 'l':
                if(j < arr.length - 1) {
                    console.log('go left only')
                    visitedArr.push([]);
                    followBeam(i, j + 1, 'd', id++)
                }
                break;
            case 'u':
                if(i < arr[0].length - 1) {
                    console.log('go up only')
                    visitedArr.push([]);
                    followBeam(i + 1, j, 'r', id++)
                }
                break;
            case 'd':
                if(i > 0) {
                    console.log('go down only')
                    visitedArr.push([]);
                    followBeam(i - 1, j, 'l', id++)
                }
                break;
            default:
                console.log('bad direction!');
                break;
        }
    }
    if(arr[j][i] == '|') {
        switch(dir) {
            case 'r':
                let goUpFromRight = false;
                if(j > 0) {
                    console.log('go up')
                    goUpFromRight = true;
                }
                if(j < arr.length - 1) {
                    console.log('go down')
                    visitedArr.push([]);
                    followBeam(i, j + 1, 'd', id++)
                    if(goUpFromRight) {
                        visitedArr.push([]);
                        followBeam(i, j - 1, 'u', id++)
                    }
                }
                break;
            case 'l':
                let goUpFromLeft = false;
                if(j > 0) {
                    console.log('go up')
                    goUpFromLeft = true;
                }
                if(j < arr.length - 1) {
                    console.log('go down')
                    visitedArr.push([]);
                    followBeam(i, j + 1, 'd', id++)
                    if(goUpFromLeft) {
                        visitedArr.push([]);
                        followBeam(i, j - 1, 'u', id++)
                    }
                }
                break;
            case 'u':
                console.log('continuing up from |')
                if(j > 0) followBeam(i, j - 1, 'u', id)
                break;
            case 'd':
                console.log('continuing down from |')
                if(j < arr.length - 1) followBeam(i, j + 1, 'd', id)
                break;
            default:
                console.log('bad direction!');
                break;
        }
    }
    if(arr[j][i] == '-') {
        switch(dir) {
            case 'r':
                console.log('continuing right from -')
                if(i < arr[0].length) followBeam(i + 1, j, 'r', id)
                break;
            case 'l':
                console.log('continuing left from -')
                if(i > 0) followBeam(i - 1, j , 'l', id)
                break;
            case 'u':
                let goRightFromUp = false;
                if(i < arr[0].length - 1) {
                    console.log('go right')
                    goRight = true;
                }
                if(i > 0) {
                    console.log('go left')
                    visitedArr.push([]);
                    followBeam(i - 1, j, 'l', id++)
                    if(goRightFromUp) {
                        visitedArr.push([]);
                        followBeam(i + 1, j, 'r', id++)
                    }
                }
                break;
            case 'd':
                let goRightFromDown = false;
                if(i < arr[0].length - 1) {
                    console.log('go right');
                    goRightFromDown = true;
                }
                if(i > 0) {
                    console.log('go left');
                    visitedArr.push([]);
                    followBeam(i - 1, j, 'l', id++)
                    console.log('after follow beam left')
                    if(goRightFromDown) {
                        visitedArr.push([]);
                        followBeam(i + 1, j, 'r', id++);
                    }
                }
                break;
            default:
                console.log('bad direction!');
                break;
        }
    }
});
followBeam(0,0,'r', 0);

console.log(arr);
console.log(energizedArr);
document.querySelector('#header').innerHTML = 'hello';


//https://ivanr3d.com/blog/adventofcode2023.html WIP credit ivanr3d

const testInput = `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`;
let replaced = '';
for(c of input) {
    if(c == '\\') {
        replaced += 'p';
    } else {
        replaced += c;
        if(c == '\n') console.log('nl');
    }
}
//console.log('replaced', replaced);
const data = replaced.split('\n').slice(0);
//console.log(data);
let bean = {x:0, y:0, xdir: 1, ydir: 0};
let explored = [];

let beans = [];
for(let i = 0; i < data[0].length; i++){
    beans.push({x:i, y: 0, xdir: 0, ydir: -1})
    beans.push({x:i, y: data.length - 1, xdir: 0, ydir: 1})    
}
for(let i = 0; i < data.length; i++){
    beans.push({x:0, y: i, xdir: 1, ydir: 0})
    beans.push({x:data[0].length - 1, y: i, xdir: -1, ydir: 0})    
}

explored.push([bean.x, bean.y]);
let max = 0;
for(bean of beans) {
    console.log('new bean');
    const data = replaced.split('\n').slice(0);
    explored = [];
    cave(bean.x, bean.y, bean.xdir, bean.ydir, [...data]);
    if (explored.length > max) max = explored.length;
}

function cave(x, y, xdir, ydir, currentData) {
    let contain = false;
    
    if (x < 0 || x > currentData[0].length - 1 || y < 0 || y > currentData.length - 1) {
        return ;
    }
    
    for (let coors of explored) {
        if (coors[0] === x && coors[1] === y) {
            contain = true;
        }
    }
    if (contain) {
        contain = false;
    } else {
        explored.push([x, y]);
    }
    
    if (currentData[y][x] === 'p') {

        if (xdir === 1) {
            cave(x, y+1, 0, 1, currentData);    
        } else if (xdir === -1) {
            cave(x, y-1, 0, -1, currentData);    
        } else if (ydir === 1) {
            cave(x+1, y, 1, 0, currentData);    
        } else if (ydir === -1) {
            cave(x-1, y, -1, 0, currentData);    
        }

    }
    else if (currentData[y][x] === '/') {
        if (xdir === 1) {
            cave(x, y-1, 0, -1, currentData);    
        } else if (xdir === -1) {
            cave(x, y+1, 0, 1, currentData);    
        } else if (ydir === 1) {
            cave(x-1, y, -1, 0, currentData);    
        } else if (ydir === -1) {
            cave(x+1, y, 1, 0, currentData);    
        }
    }
    else if (currentData[y][x] === '|') {
        currentData[y] = currentData[y].substring(0, x) + 'L' + currentData[y].substring(x + 1);

        if (xdir === 1 || xdir === -1) {
            cave(x, y-1, 0, -1, currentData);
            cave(x, y+1, 0, 1, currentData);
        }
        else if (ydir === 1) {
            cave(x, y+1, 0, 1, currentData);
        } else if (ydir === -1) {
            cave(x, y-1, 0, -1, currentData);
        }
    }
    else if (currentData[y][x] === '-') {
        currentData[y] = currentData[y].substring(0, x) + 'L' + currentData[y].substring(x + 1);

        if (xdir === 1) {
            cave(x+1, y, 1, 0, currentData);
        } else if (xdir === -1) {
            cave(x-1, y, -1, 0, currentData);
        } else {
            cave(x+1, y, 1, 0, currentData);
            cave(x-1, y, -1, 0, currentData);
        }
    }
    else if (currentData[y][x] === 'L') {
        return ;
    }
    else {
        if (xdir === 1) {
            cave(x+1, y, 1, 0, currentData);
        } else if (xdir === -1) {
            cave(x-1, y, -1, 0, currentData);
        } else if (ydir === 1) {
            cave(x, y+1, 0, 1, currentData);
        } else if (ydir === -1) {
            cave(x, y-1, 0, -1, currentData);
        }
    }

}

console.log('Part 1 ->',max);
