import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {isCell, matrix, shouldResize} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '../../core/dom';


export class Table extends ExcelComponent {
  static className = 'excel__table'
  static rowsNumber = 50

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown']
    })
  }
  toHTML() {
    return createTable(Table.rowsNumber)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    $cell.$el.blur()
    this.selection.select($cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const target = $target.id(true)
        const current = this.selection.current.id(true)
        const $cells = matrix(target, current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        const $target = $(event.target)
        this.selection.select($target)
      }
    }
  }

  onKeydown(event) {
    if (isCell(event)) {
      switch (event.code) {
        case 'ArrowDown': {
          const current = $(event.target).id(true)
          const targetId = `${current.row + 1}:${current.col}`
          const $target = this.$root.find(`[data-id="${targetId}"]`)
          if ($target.$el) {
            // event.target.blur()
            $target.$el.focus()
            this.selection.select($target)
          }
          break;
        }
        case 'ArrowUp': {
          const current = $(event.target).id(true)
          const targetId = `${current.row - 1}:${current.col}`
          const $target = this.$root.find(`[data-id="${targetId}"]`)
          if ($target.$el) {
            $target.$el.focus()
            this.selection.select($target)
          }
          break;
        }
        case 'ArrowLeft': {
          const current = $(event.target).id(true)
          const targetId = `${current.row}:${current.col - 1}`
          const $target = this.$root.find(`[data-id="${targetId}"]`)
          if ($target.$el) {
            $target.$el.focus()
            this.selection.select($target)
          }
          break;
        }
        case 'ArrowRight': {
          const current = $(event.target).id(true)
          const targetId = `${current.row}:${current.col + 1}`
          const $target = this.$root.find(`[data-id="${targetId}"]`)
          if ($target.$el) {
            $target.$el.focus()
            this.selection.select($target)
          }
          break;
        }
        case 'Enter': {
          const current = $(event.target).id(true)
          const targetId = `${current.row + 1}:${current.col}`
          const $target = this.$root.find(`[data-id="${targetId}"]`)
          if ($target.$el) {
            // $target.$el.blur()
            $target.$el.focus()
            this.selection.select($target)
          }
          break;
        }
        case 'Tab': {
          const current = $(event.target).id(true)
          const targetId = `${current.row}:${current.col + 1}`
          const $target = this.$root.find(`[data-id="${targetId}"]`)
          if ($target.$el) {
            // $target.$el.blur()
            // $target.$el.focus()
            this.selection.select($target)
          }
          break;
        }
        default:
          break;
      }
    }
  }
}

