'use strict'

const fs = require('fs')
const positions = fs
  .readFileSync(`${__dirname}/puzzle.txt`, { encoding: 'utf-8' })
  .split('\n')
  .filter((line) => line !== '')[0]
  .split(',')
  .map((pos) => parseInt(pos))

const solution1 = () => {
  const differences = positions.map((p1) =>
    positions.reduce((acc, p2) => acc + Math.abs(p2 - p1), 0)
  )

  console.log(`Solution 1: ${differences.reduce((a, b) => (a < b ? a : b))}`)
}

const solution2 = () => {
  const differences = positions.map((_, i) =>
    positions.reduce((acc, p2) => {
      const baseNumber = Math.abs(p2 - i)

      return acc + (baseNumber * (baseNumber + 1)) / 2
    },0)
  )

  console.log(`Solution 2: ${differences.reduce((a, b) => (a < b ? a : b))}`)
}

solution1()
solution2()
