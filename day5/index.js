'use strict'

const fs = require('fs')

const lines = fs
  .readFileSync(`${__dirname}/puzzle.txt`, { encoding: 'utf-8' })
  .split('\n')
  .filter((line) => line !== '')

const coordinates = lines.map((line) =>
  line.split('->').map((coord) => coord.trim())
)

const solution1 = () => {
  let atLeastTwoOverlaps = 0
  const coordinateField = Array.from(Array(1000), () => new Array(1000))

  for (let i = 0; i < 999; i++) {
    for (let y = 0; y < 999; y++) {
      coordinateField[i][y] = 0
    }
  }

  const verticalAndHorzondalLines = coordinates.filter((coord) => {
    const first = coord[0].split(',')
    const second = coord[1].split(',')

    return first[0] === second[0] || first[1] === second[1]
  })

  verticalAndHorzondalLines.forEach((line) => {
    const first = line[0].split(',').map((num) => parseInt(num))
    const second = line[1].split(',').map((num) => parseInt(num))
    const axisSame = first[0] === second[0] ? 'x' : 'y'

    switch (axisSame) {
      case 'x':
        const differenceY = first[1] - second[1]
        if (differenceY < 0) {
          for (let i = 0; i <= Math.abs(differenceY); i++) {
            if (coordinateField[first[0]][first[1] + i] === 0) {
              coordinateField[first[0]][first[1] + i] = 1
            } else if (coordinateField[first[0]][first[1] + i] === 1) {
              coordinateField[first[0]][first[1] + i] = 2
            }
          }
        } else {
          for (let i = differenceY; i >= 0; i--) {
            if (coordinateField[first[0]][first[1] - i] === 0) {
              coordinateField[first[0]][first[1] - i] = 1
            } else if (coordinateField[first[0]][first[1] - i] === 1) {
              coordinateField[first[0]][first[1] - i] = 2
            }
          }
        }
        break
      case 'y':
        const differenceX = first[0] - second[0]
        if (differenceX < 0) {
          for (let i = 0; i <= Math.abs(differenceX); i++) {
            if (coordinateField[first[0] + i][first[1]] === 0) {
              coordinateField[first[0] + i][first[1]] = 1
            } else if (coordinateField[first[0] + i][first[1]] === 1) {
              coordinateField[first[0] + i][first[1]] = 2
            }
          }
        } else {
          for (let i = differenceX; i >= 0; i--) {
            if (coordinateField[first[0] - i][first[1]] === 0) {
              coordinateField[first[0] - i][first[1]] = 1
            } else if (coordinateField[first[0] - i][first[1]] === 1) {
              coordinateField[first[0] - i][first[1]] = 2
            }
          }
        }
    }
  })

  coordinateField.forEach((line) => {
    line.forEach((num) => {
      if (num === 2) {
        atLeastTwoOverlaps++
      }
    })
  })

  console.log(`Solution 1: ${atLeastTwoOverlaps}`)
}

const solution2 = () => {
  console.log(`Solution 2:`)
}

solution1()
solution2()
