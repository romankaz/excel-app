import {defaultStyles, defaultTitle} from '../constants'
import {storage} from '../core/utils'

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1' : 'fefefe'}
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export const initialState = storage('excel-state') 
  ? normalize(storage('excel-state'))
  : defaultState