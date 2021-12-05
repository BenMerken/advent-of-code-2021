'use strict'

const fs = require('fs')
const { exit } = require('process')
const numbers = fs
  .readFileSync(`${__dirname}/puzzle.txt`, { encoding: 'utf-8' })
  .split('\n')[0]
  .split(',')

let boards = fs
  .readFileSync(`${__dirname}/puzzle.txt`, { encoding: 'utf-8' })
  .split('\n\n')
  .slice(1)
  .filter((line) => line !== '')
  .map((line) => line.split('\n').filter((row) => row !== ''))
  .map((board) =>
    board.map((line) =>
      line
        .split(' ')
        .map((num) => parseInt(num))
        .filter((num) => num)
        .join(' ')
    )
  )

const rowWin = (board) => {
  return board.filter((row) => row.match(/\*/g)?.length === 5).length > 0
}

const columnWin = (board) => {
  for (let i = 0; i < 5; i++) {
    if (
      board[0].split(' ')[i] === '*' &&
      board[1].split(' ')[i] === '*' &&
      board[2].split(' ')[i] === '*' &&
      board[3].split(' ')[i] === '*' &&
      board[4].split(' ')[i] === '*'
    ) {
      return true
    }
  }

  return false
}

const solution1 = () => {
  numbers.forEach((number) => {
    boards = boards.map((board) =>
      board.map((row, i) => {
        const rowNumbers = row.split(' ').filter((num) => num !== '')
        const index = rowNumbers.indexOf(number)

        if (index !== -1) {
          rowNumbers[index] = '*'
          board[i] = rowNumbers.join(' ')
        }

        if (rowWin(board) || columnWin(board)) {
          const sum = board
            .join(' ')
            .split(' ')
            .filter((num) => num !== '*')
            .reduce((a, b) => a + parseInt(b), 0)

          console.log(`Solution 1: ${sum * number}`)
          solution2()
        }

        return rowNumbers.join(' ')
      })
    )
  })
}

const solution2 = () => {
  console.log(`Solution 2: `)
  exit(0)
}

solution1()
