import {TABLE_RESIZE, ROW_RESIZE} from './types'

// pure function
export function rootReducer(state, action) {
  let prevState
  switch (action.type) {
    case TABLE_RESIZE:
      prevState = state.colState || {}
      prevState[action.data.id] = action.data.value
      return {...state, colState: prevState} // id, value
    case ROW_RESIZE:
      prevState = state.rowState || {}
      prevState[action.data.id] = action.data.value
      return {...state, rowState: prevState} // id, value
    default:
      return state
  }
}
