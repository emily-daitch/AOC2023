const inputSmall = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`

const inputLines = input.split("\n");
//const inputLines = inputSmall.split("\n");
const seedsLine = inputLines[0];
const seedsList = seedsLine.split(':')[1].trim();
const seedsArr = seedsList.split(' ');
//console.log('seedsArr', seedsArr);
inputLines.shift();
inputLines.shift();
inputLines.shift();
//seed to soil
let seedToSoil = [];
let soilToFertilizer = [];
let fertilizerToWater = [];
let waterToLight = [];
let lightToTemperature = [];
let temperatureToHumidity = [];
let humidityToLocation = [];
let i = 0;
while(isNaN(inputLines[i])) {
        //console.log('inputLine', inputLines[i]);
        let values = inputLines[i].split(' ');
        seedToSoil.push({
            destinationStart: Number(values[0]),
            sourceStart: Number(values[1]),
            range: Number(values[2])
        })
        i++;
}
seedToSoil.sort((a, b) => a.sourceStart - b.sourceStart);
console.log('sorted sts', seedToSoil);
i++;
i++;
while(isNaN(inputLines[i])) {
    //console.log('inputLine', inputLines[i]);
    let values = inputLines[i].split(' ');
    soilToFertilizer.push({
        destinationStart: Number(values[0]),
        sourceStart: Number(values[1]),
        range: Number(values[2])
    })
    i++;
}
i++;
i++;
while(isNaN(inputLines[i])) {
    //console.log('inputLine', inputLines[i]);
    let values = inputLines[i].split(' ');
    fertilizerToWater.push({
        destinationStart: Number(values[0]),
        sourceStart: Number(values[1]),
        range: Number(values[2])
    })
    i++;
}
i++;
i++;
while(isNaN(inputLines[i])) {
    //console.log('inputLine', inputLines[i]);
    let values = inputLines[i].split(' ');
    waterToLight.push({
        destinationStart: Number(values[0]),
        sourceStart: Number(values[1]),
        range: Number(values[2])
    })
    i++;
}
i++;
i++;
while(isNaN(inputLines[i])) {
    //console.log('inputLine', inputLines[i]);
    let values = inputLines[i].split(' ');
    lightToTemperature.push({
        destinationStart: Number(values[0]),
        sourceStart: Number(values[1]),
        range: Number(values[2])
    })
    i++;
}
i++;
i++;
while(isNaN(inputLines[i])) {
    //console.log('inputLine', inputLines[i]);
    let values = inputLines[i].split(' ');
    temperatureToHumidity.push({
        destinationStart: Number(values[0]),
        sourceStart: Number(values[1]),
        range: Number(values[2])
    })
    i++;
}
i++;
i++;
while(i < inputLines.length && isNaN(inputLines[i])) {
    //console.log('inputLine', inputLines[i]);
    let values = inputLines[i].split(' ');
    humidityToLocation.push({
        destinationStart: Number(values[0]),
        sourceStart: Number(values[1]),
        range: Number(values[2])
    })
    i++;
}
//console.log('seedToSoil', seedToSoil);
//console.log('soilToFertilizer', soilToFertilizer);
//console.log('fertilizerToWater', fertilizerToWater);
//console.log('waterToLight', waterToLight);
//console.log('lightToTemperature', lightToTemperature);
//console.log('temperatureToHumidity', temperatureToHumidity);
console.log('humidityToLocation', humidityToLocation);

let minimumLocation = Infinity;
 for (let j = 0; j < seedsArr.length; j+=2) {
     console.log('seedsArr', seedsArr[j], ' ', seedsArr[j + 1])
 }
for (seed of seedsArr) {

//for (let j = 0; j < 2; j+=2) {
    //console.log('checking pair', j);
    //for (let k = seedsArr[j]; k < seedsArr[j] + seedsArr[j+1]; k++) {
    //console.log('checking seed', seed);
    //console.log('checking seed', k);
    //console.log('checking seed');
    //let seed = k;
    let soil = -1;
    let fert = -1;
    let water = -1;
    let light = -1;
    let temp = -1;
    let humidity = -1;
    let location = -1;
    for (seedToSoilEntry of seedToSoil) {
        //console.log('seedToSoilEntry', seedToSoilEntry);
        
        if(seed >= seedToSoilEntry.sourceStart && seed <= (seedToSoilEntry.sourceStart + seedToSoilEntry.range)) {
            console.log('found seed in seed to soil map');
            let diff = seed - seedToSoilEntry.sourceStart;
            soil = seedToSoilEntry.destinationStart + diff;
            //console.log('setting k from ', k, ' to ', seedToSoilEntry.sourceStart + seedToSoilEntry.range)
            //k = seedToSoilEntry.sourceStart + seedToSoilEntry.range;
            //console.log('chosen soil is', soil);
            break;
        }
    }
    if (soil == -1) {
        //console.log('did not find seed in seed to soil map, setting to itself');
        
        soil = seed;
    }
    for (entry of soilToFertilizer) {
        //console.log('soilToFertilizer entry', entry);
        
        if(soil >= entry.sourceStart && soil <= (entry.sourceStart + entry.range)) {
            //console.log('found fert in soil to fert map');
            let diff = soil - entry.sourceStart;
            fert = entry.destinationStart + diff;
            //console.log('chosen fert is', fert);
            break;
        }
    }
    if (fert == -1) {
        //console.log('did not find fert in soil to fert map, setting to itself');
        fert = soil;
    }
    for (entry of fertilizerToWater) {
        //console.log('fertilizerToWater entry', entry);
        
        if(fert >= entry.sourceStart && fert <= (entry.sourceStart + entry.range)) {
            //console.log('found water in fert to water map');
            let diff = fert - entry.sourceStart;
            water = entry.destinationStart + diff;
            //console.log('chosen water is', water);
            break;
        }
    }
    if (water == -1) {
        //console.log('did not find water in fert to water map, setting to itself');
        water = fert;
    }
    for (entry of waterToLight) {
        //console.log('waterToLight entry', entry);
        
        if(water >= entry.sourceStart && water <= (entry.sourceStart + entry.range)) {
            //console.log('found light in water to light map');
            let diff = water - entry.sourceStart;
            light = entry.destinationStart + diff;
            //console.log('chosen light is', light);
            break;
        }
    }
    if (light == -1) {
        //console.log('did not find light in water to light map, setting to itself');
        light = water;
    }
    for (entry of lightToTemperature) {
        //console.log('lightToTemperature entry', entry);
        
        if(light >= entry.sourceStart && light <= (entry.sourceStart + entry.range)) {
            //console.log('found temp in light to temp map');
            let diff = light - entry.sourceStart;
            temp = entry.destinationStart + diff;
            //console.log('chosen temp is', temp);
            break;
        }
    }
    if (temp == -1) {
        //console.log('did not find temp in light to temp map, setting to itself');
        temp = light;
    }
    for (entry of temperatureToHumidity) {
        //console.log('temperatureToHumidity entry', entry);
        
        if(temp >= entry.sourceStart && temp <= (entry.sourceStart + entry.range)) {
            //console.log('found humidity in temp to humidity map');
            let diff = temp - entry.sourceStart;
            humidity = entry.destinationStart + diff;
            //console.log('chosen humidity is', humidity);
            break;
        }
    }
    if (humidity == -1) {
        //console.log('did not find humidity in temp to humidity map, setting to itself');
        humidity = temp;
    }
    for (entry of humidityToLocation) {
        //console.log('humidityToLocation entry', entry);
        
        if(humidity >= entry.sourceStart && humidity <= (entry.sourceStart + entry.range)) {
            //console.log('found location in humidity to location map');
            let diff = humidity - entry.sourceStart;
            location = entry.destinationStart + diff;
            //console.log('chosen location is', location);
            break;
        }
    }
    if (location == -1) {
        //console.log('did not find location in humidity to location map, setting to itself');
        location = humidity;
    }
    //console.log('LOCATION', location);
    if (location < minimumLocation) minimumLocation = location;
  }
//}

document.querySelector('#header').innerHTML = minimumLocation;
