// not my solution, magyusz

$('*').textContent.trim().split("\n").map(e => e.split(/ +/).map(Number))
    .map(seq => {
        let curr = Array.from(seq)
        let all = [curr]
        while (curr.some(e=>e!=0)) {
            let next = []
            for (let i = 0; i < curr.length - 1; i++)
                    next.push(curr[i + 1] - curr[i])
            all.push(next)
            curr = Array.from(next)
        }
        let first = 0, last = 0
        for (const line of all.reverse()) {
            last = line.at(-1) + last
            first = line[0] - first
        }
        return [last, first]
    }).reduce((a, b) => [a[0] + b[0], a[1] + b[1]])
