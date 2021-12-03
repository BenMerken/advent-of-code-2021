'use strict'

const fs = require('fs')
const lines = fs
  .readFileSync(`${__dirname}/puzzle.txt`, { encoding: 'utf-8' })
  .split('\n')
  .filter((line) => line !== '')

const solution1 = () => {
  const numberOfLines = lines.length
  const bitsPerLine = lines[0].length
  const bits = []

  for (let i = 0; i < bitsPerLine; i++) {
    bits[i] = ''
  }

  for (let i = 0; i < bitsPerLine; i++) {
    lines.forEach((line) => {
      bits[i] += line.charAt(i)
    })
  }

  const gamma = bits
    .map((bit) => (bit.match(/0/g).length / numberOfLines > 0.5 ? 0 : 1))
    .join('')
  const epsilon = gamma
    .split('')
    .map((num) => (num === '1' ? '0' : '1'))
    .join('')

  console.log(`Solution 1: ${parseInt(gamma, 2) * parseInt(epsilon, 2)}`)
}

const solution2 = () => {
  let bitPostion = 0
  let oxygenGeneratorRating = lines
  let co2ScrubberRating = lines

  while (oxygenGeneratorRating.length !== 1) {
    const numberOfLines = oxygenGeneratorRating.length
    const mostCommonBit =
      oxygenGeneratorRating
        .map((line) => line.charAt(bitPostion))
        .join('')
        .match(/1/g).length /
        numberOfLines >=
      0.5
        ? '1'
        : '0'

    oxygenGeneratorRating = oxygenGeneratorRating.filter(
      (line) => line.charAt(bitPostion) === mostCommonBit
    )

    bitPostion++
  }

  bitPostion = 0

  while (co2ScrubberRating.length !== 1) {
    const numberOfLines = co2ScrubberRating.length
    const leastCommonBit =
      co2ScrubberRating
        .map((line) => line.charAt(bitPostion))
        .join('')
        .match(/1/g).length /
        numberOfLines >=
      0.5
        ? '0'
        : '1'

    co2ScrubberRating = co2ScrubberRating.filter(
      (line) => line.charAt(bitPostion) === leastCommonBit
    )

    bitPostion++
  }

  console.log(
    `Solution 2: ${
      parseInt(oxygenGeneratorRating[0], 2) * parseInt(co2ScrubberRating[0], 2)
    }`
  )
}

solution1()
solution2()
