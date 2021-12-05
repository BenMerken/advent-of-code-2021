'use strict'

const fs = require('fs')

const lines = fs
  .readFileSync(`${__dirname}/puzzle.txt`, { encoding: 'utf-8' })
  .split('\n')
  .filter((line) => line !== '')

const coordinates = lines.map((line) =>
  line.split('->').map((coord) => coord.trim())
)

const getDiagonalDirection = (first, second) => {
  if (first[0] - second[0] < 0) {
    if (first[1] - second[1] < 0) {
      return 'right-desc'
    } else {
      return 'right-asc'
    }
  } else {
    if (first[1] - second[1] < 0) {
      return 'left-desc'
    }
    return 'left-asc'
  }
}

const getOverlaps = (lines) => {
  let atLeastTwoOverlaps = 0
  const coordinateField = Array.from(Array(1000), () => new Array(1000))

  for (let i = 0; i < 999; i++) {
    for (let y = 0; y < 999; y++) {
      coordinateField[i][y] = 0
    }
  }

  lines.forEach((line) => {
    const first = line[0].split(',').map((num) => parseInt(num))
    const second = line[1].split(',').map((num) => parseInt(num))
    const axisSame =
      first[0] === second[0] ? 'x' : first[1] === second[1] ? 'y' : 'none'

    const differenceX = first[0] - second[0]
    const differenceY = first[1] - second[1]

    switch (axisSame) {
      case 'x':
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
        break
      case 'none':
        switch (getDiagonalDirection(first, second)) {
          case 'left-asc':
            for (let i = 0; i <= Math.abs(differenceY); i++) {
              if (coordinateField[first[0] - i][first[1] - i] === 0) {
                coordinateField[first[0] - i][first[1] - i] = 1
              } else if (coordinateField[first[0] - i][first[1] - i] === 1) {
                coordinateField[first[0] - i][first[1] - i] = 2
              }
            }
            break
          case 'left-desc':
            for (let i = 0; i <= Math.abs(differenceY); i++) {
              if (coordinateField[first[0] - i][first[1] + i] === 0) {
                coordinateField[first[0] - i][first[1] + i] = 1
              } else if (coordinateField[first[0]- i][first[1] + i] === 1) {
                coordinateField[first[0] - i][first[1] + i] = 2
              }
            }
            break
          case 'right-asc':
            for (let i = 0; i <= Math.abs(differenceY); i++) {
              if (coordinateField[first[0] + i][first[1] - i] === 0) {
                coordinateField[first[0] + i][first[1] - i] = 1
              } else if (coordinateField[first[0] + i][first[1] - i] === 1) {
                coordinateField[first[0] + i][first[1] - i] = 2
              }
            }
            break
          case 'right-desc':
            for (let i = 0; i <= Math.abs(differenceY); i++) {
              if (coordinateField[first[0] + i][first[1] + i] === 0) {
                coordinateField[first[0] + i][first[1] + i] = 1
              } else if (coordinateField[first[0] + i][first[1] + i] === 1) {
                coordinateField[first[0]+ i][first[1] + i] = 2
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

  return atLeastTwoOverlaps
}

const solution1 = () => {
  const verticalAndHorzondalLines = coordinates.filter((coord) => {
    const first = coord[0].split(',')
    const second = coord[1].split(',')

    return first[0] === second[0] || first[1] === second[1]
  })

  console.log(`Solution 1: ${getOverlaps(verticalAndHorzondalLines)}`)
}

const solution2 = () => {
  console.log(`Solution 2: ${getOverlaps(coordinates)}`)
}

solution1()
solution2()
