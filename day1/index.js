const fs = require('fs')

const puzzle = fs.readFileSync(`${__dirname}/puzzle.txt`, { encoding: 'utf-8' })
const numbers = puzzle.split('\n').filter((number) => number !== '')

const solution1 = () => {
  let increases = 0

  numbers.slice(0, numbers.length - 1).forEach((number, index) => {
    if (Number(numbers[index + 1]) > Number(number)) {
      increases++
    }
  })

  console.log(`Solution 1: ${increases}`)
}

const solution2 = () => {
  let increases = 0

  const sums = numbers
    .slice(0, numbers.length - 1)
    .map(
      (number, index) =>
        Number(number) + Number(numbers[index + 1]) + Number(numbers[index + 2])
    )

  sums.slice(0, sums.length - 1).forEach((number, index) => {
    if (sums[index + 1] > number) {
      increases++
    }
  })

  console.log(`Solution 2: ${increases}`)
}

solution1()
solution2()
