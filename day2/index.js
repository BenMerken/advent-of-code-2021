'use strict'

const fs = require('fs')
const lines = fs
  .readFileSync(`${__dirname}/puzzle.txt`, { encoding: 'utf-8' })
  .split('\n')
  .filter((line) => line !== '')

const solution1 = () => {
  let horizontal = 0
  let depth = 0

  const instructions = lines.map((line) => line.split(' '))

  instructions.forEach((instr) => {
    const num = Number(instr[1])

    switch (instr[0]) {
      case 'forward':
        horizontal += num
        break
      case 'up':
        depth -= num
        break
      case 'down':
        depth += num
    }
  })

  console.log(`Solution 1: ${horizontal * depth}`)
}

const solution2 = () => {
  let horizontal = 0
  let depth = 0
  let aim = 0

  const instructions = lines.map((line) => line.split(' '))

  instructions.forEach((instr) => {
    const num = Number(instr[1])

    switch (instr[0]) {
      case 'forward':
        horizontal += num
        depth += aim * num
        break
      case 'up':
        aim -= num
        break
      case 'down':
        aim += num
    }
  })

  console.log(`Solution 2: ${horizontal * depth}`)
}

solution1()
solution2()
