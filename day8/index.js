'use strict'

const fs = require('fs')
const lines = fs
  .readFileSync(`${__dirname}/puzzle.txt`, { encoding: 'utf-8' })
  .split('\n')
  .filter((line) => line !== '')

const delimited = lines.map((line) =>
  line.split('|').map((value) => value.trim())
)

const unique = (value, index, self) => self.indexOf(value) === index

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
  // Find the one-digit segments = where input.length === 2
  // Find the remaining seven-digit segment = where input.length === 3
  // Find the remaining four-digit segments = where input.length === 4 (has two segments in common with one-digit)
  // Find the remaining

  // one = (input.length === 2).split('')
  // four = (input.length === 4).split('')
  // seven = (input.length === 3).split('')
  // eight = (input.length === 7).split('')
  // nine = input.includes(four) && input.length === 6
  // zero = !input.includes(none) && input.length === 6
  // two = nine.includes(input) && !input.includes(seven) && input.length === 5
  // three = nine.includes(input) && input.includes(seven) && input.length === 5
  // five =
  // six =

  console.log(`Solution 2: `)
}

solution1()
solution2()
