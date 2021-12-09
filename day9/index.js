'use strict'

const fs = require('fs')
const lines = fs
  .readFileSync(`${__dirname}/puzzle.txt`, { encoding: 'utf-8' })
  .split('\n')
  .filter((line) => line !== '')

const solution1 = () => {
  let sum = 0

  lines.forEach((line, i) => {
    line.split('').forEach((num, j) => {
      const upLine = lines[i - 1]
      const downLine = lines[i + 1]

      const up = upLine && upLine[j]
      const down = downLine && downLine[j]
      const left = line[j - 1]
      const right = line[j + 1]

      console.log([up, down, left, right])

      const numIsLowestPoint =
        [up, down, left, right]
          .filter((e) => e !== undefined)
          .reduce((a, b) =>
            parseInt(a) < parseInt(b) ? parseInt(a) : parseInt(b)
          ) > parseInt(num)

      if (numIsLowestPoint) {
        sum += parseInt(num) + 1
      }
    })
  })

  console.log(`Solution 1: ${sum}`)
}

const solution2 = () => {
  console.log(`Solution 2: `)
}

solution1()
solution2()
