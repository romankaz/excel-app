import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable, adjustCells} from './table.template';
import {$} from '../../core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'
  static rowsNumber = 20

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mousemove', 'mouseup']
    })
  }
  toHTML() {
    return createTable(Table.rowsNumber)
  }

  onMousedown(event) {
    // console.log(event.target)
    // debugger
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    console.log($parent)
    const $parent2 = $resizer.closest('[data-type="resizable_row"]')
    console.log($parent2)

    if (event.target.dataset.resize === 'col') {
      // const $parent = $resizer.$el.parentNode  // bad!
      // const $parent = $resizer.$el.closest('.column') // better but still bad


      // console.log($parent.getCoords())
      const coords = $parent.getCoords()
      const $table = $parent.$el.parentElement.parentElement.parentElement
      // debugger
      document.onmousemove = e => {
        const delta = e.pageX - coords.right
        const value = coords.width + delta
        // console.log(event.target)
        $parent.$el.style.width = value + 'px'
        adjustCells(Table.rowsNumber, $parent.$el.innerText, $table, value)
      }
    } else if (event.target.dataset.resize === 'row') {
      // console.log(event.target)
      const coords2 = $parent2.getCoords()
      document.onmousemove = e => {
        // console.log(coords2)
        // debugger
        const delta = e.pageY - coords2.bottom
        const value = coords2.height + delta
        // console.log($parent)
        // console.log(value)
        $parent2.$el.style.height = value + 'px'
        // console.log(delta)
      }
    }


    document.onmouseup = () => {
      document.onmousemove = null
    }
  }

  onMousemove(event) {
    // if (event.target.dataset.resize) {
    //   console.log('Start resizing..', event.target.dataset.resize)
    // }
  }

  onMouseup(event) {
    // if (event.target.dataset.resize) {
    //   console.log('Start resizing..', event.target.dataset.resize)
    // }
  }
}
