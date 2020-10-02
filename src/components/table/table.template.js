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
    <div class="column" data-type="resizable">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(num, content) {
  const resizer = num ? `<div class="row-resize" data-resize="row"></div>` : ''
  return `
    <div class="row" data-type="resizable_row">
      <div class="row-info">
        ${num ? num : ''}
        ${resizer}
      </div>
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

export function adjustCells(rowsCount = 15, charCode, tableElement, value) {
  // const cellIndex = charCode.charCodeAt() - CODES.A
  // const cells = new Array(rowsCount).fill('').map
  // for (let i = 0; i < rowsCount; i++) {
  // console.log("Hello!")
  // }
  tableElement.children[1].children[1].children[2].style.width = value + 'px'
  tableElement.children[2].children[1].children[2].style.width = value + 'px'
  // console.log(tableElement)
}
