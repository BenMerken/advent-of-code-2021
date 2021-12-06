'use strict'

const fs = require('fs')
let fish = fs
  .readFileSync(`${__dirname}/puzzle.txt`, { encoding: 'utf-8' })
  .split('\n')[0]
  .split(',')

const solution1 = () => {
  for (let i = 0; i < 80; i++) {
    let fishToAdd = 0

    fish.forEach((f, i) => {
      if (f === 0) {
        fish[i] = 6
        fishToAdd++
      } else {
        fish[i]--
      }
    })

    for (let y = 0; y < fishToAdd; y++) {
      fish.push(8)
    }
  }

  console.log(`Solution 1: ${fish.length}`)
}

const solution2 = () => {
  let countFishOnEachDay = [0, 0, 0, 0, 0, 0, 0, 0, 0]

  fish.forEach((f) => {
    countFishOnEachDay[f] += 1
  })

  for (let i = 0; i < 256; i++) {
    const fishToBirth = countFishOnEachDay[0]
    countFishOnEachDay = [
      ...countFishOnEachDay.slice(1),
      ...countFishOnEachDay.slice(0, 1),
    ]
    countFishOnEachDay[6] += fishToBirth
  }

  console.log(`Solution 2: ${countFishOnEachDay.reduce((a, b) => a + b, 0)}`)
}

solution1()

fish = fs
  .readFileSync(`${__dirname}/puzzle.txt`, { encoding: 'utf-8' })
  .split('\n')[0]
  .split(',')

solution2()
