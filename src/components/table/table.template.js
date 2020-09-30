const CODES = {
  A: 65,
  Z: 90
}

function toCell() {
  return `
    <div class="cell" contenteditable spellcheck="false"></div>
  `
}

function toColumn(col) {
  return `
    <div class="column">
      ${col}
    </div>
  `
}

function createRow(num, content) {
  return `
    <div class="row">
      <div class="row-info">${num ? num : ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  // console.log(cols)

  rows.push(createRow(null, cols))


  // console.log(colsOthers)
  const cells = new Array(colsCount).fill('').map(toCell).join('')
  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i+1, cells))
  }

  return rows.join('')
}
