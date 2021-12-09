'use strict'

const fs = require('fs')
const lines = fs
  .readFileSync(`${__dirname}/puzzle.txt`, { encoding: 'utf-8' })
  .split('\n')
  .filter((line) => line !== '')

const delimited = lines.map((line) =>
  line.split('|').map((value) => value.trim())
)

const solution1 = () => {
  const solution = delimited.reduce(
    (acc, del) =>
      acc +
      del[1]
        .split(' ')
        .reduce(
          (acc, val) => ([2, 3, 4, 7].includes(val.length) ? acc + 1 : acc),
          0
        ),
    0
  )

  console.log(`Solution 1: ${solution}`)
}

const solution2 = () => {
  console.log(`Solution 2: `)
}

solution1()
solution2()
