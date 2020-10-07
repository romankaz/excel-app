import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {shouldResize} from './table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table'
  static rowsNumber = 50

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }
  toHTML() {
    return createTable(Table.rowsNumber)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }
}
