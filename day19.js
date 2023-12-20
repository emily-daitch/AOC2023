// plus wip part 2 with dynamic functions
let testInput = `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`;

//let data = testInput.split('\n');
let data = input.split('\n');
//console.log(data);

let workflows = [];
let ratings = [];
let doneWithWorkflows = false;
for(line of data) {
  if(line == '') {
    doneWithWorkflows = true;
  }
  if(!doneWithWorkflows) {
    workflows.push(line);
  } else {
    if(line !== '') ratings.push(line);
  }
}

console.log(workflows);
console.log(ratings);
let processedWorkflows = workflows.map((workflow) => {
    let key = workflow.split('{')[0];
    let rules = workflow.split('{')[1].split(',');
    rules[rules.length - 1] = rules[rules.length - 1].slice(0, -1);
    return {
        key,
        rules
    }
})
let processedRatings = ratings.map((rating) => {
    let values = rating.split('{')[1];
    console.log('values', values);
    let x = values.split(',')[0].slice(2);
    let m = values.split(',')[1].slice(2);
    let a = values.split(',')[2].slice(2);
    let s = values.split(',')[3].slice(2, -1);
    return {
        x,
        m,
        a,
        s
    }
})
console.log(processedWorkflows);
console.log(processedRatings);

let acceptedRules = [];

let processRule = ((key, index, ratingIndex) => {
    // console.log('key', key, 'ruleIndex', ruleIndex, 'index', index, 'ratingIndex', ratingIndex);
    let ruleIndex = processedWorkflows.findIndex((wf) => wf.key == key);
    console.log('key', key, 'ruleIndex', ruleIndex, 'index', index, 'ratingIndex', ratingIndex);
    console.log('ruleIndex rules', processedWorkflows[ruleIndex].rules);
    let rule = processedWorkflows[ruleIndex].rules[index];
    console.log('rule', rule);
    if(rule.includes(':')) {
        let ruleVar = rule.split(/[>,<]+/)[0];
        let ruleDir = rule.charAt(1);
        let ruleNum = rule.split(/[>,<]+/)[1].split(':')[0];
        let ruleFollow = rule.split(/[>,<]+/)[1].split(':')[1];
        console.log('rulevar', ruleVar, 'rulenum', ruleNum, 'ruledir', ruleDir);
        switch(ruleDir) {
            case '<':
                console.log('rating ', processedRatings[ratingIndex][ruleVar]);
                if(processedRatings[ratingIndex][ruleVar] < Number(ruleNum)) {
                    console.log('follows rule');
                    if(ruleFollow == 'A') {
                        acceptedRules.push(ratingIndex);
                    } else if(ruleFollow == 'R') {
                        return;
                    } else {
                        console.log('not AR', ruleFollow);
                        processRule(ruleFollow, 0, ratingIndex);
                    }
                } else {
                    console.log('breaks rule');
                    processRule(key, index + 1, ratingIndex);
                }
            break;
            case '>':
                console.log('rating ', processedRatings[ratingIndex][ruleVar]);
                if(processedRatings[ratingIndex][ruleVar] > Number(ruleNum)) {
                    console.log('follows rule', ruleFollow);
                    if(ruleFollow == 'A') {
                        acceptedRules.push(ratingIndex);
                    } else if(ruleFollow == 'R') {
                        return;
                    } else {
                        console.log('not AR', ruleFollow);
                        processRule(ruleFollow, 0, ratingIndex);
                    }
                } else {
                    console.log('breaks rule');
                    processRule(key, index + 1, ratingIndex);
                }
            break;
            default:
                console.log('bad ruleDir');
        }
    } else {
        console.log('rule does not include :');
        if(rule == 'A') {
            acceptedRules.push(ratingIndex);
        } else if(rule == 'R') {
            return;
        } else {
            console.log('not AR', rule);
            processRule(rule, 0, ratingIndex);
        }
        //processRule(rule, 0, ratingIndex)
    }
});
let i = 0;
for(pRating of processedRatings) {
    console.log('NEW PRATING', i);
    processRule('in', 0, i);
    i++;
}

let ans = 0;
for(aRule of acceptedRules) {
    ans += Number(processedRatings[aRule].x) +
           Number(processedRatings[aRule].m) +
           Number(processedRatings[aRule].a) + 
           Number(processedRatings[aRule].s);
}

document.querySelector('#header').innerHTML = ans;
