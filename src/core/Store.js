export class Store {
  constructor(rootReducer, initialState = {}) {
    this.rootReducer = rootReducer
    this.initialState = initialState
    this.state = this.rootReducer({...this.initialState}, {type: '__INIT__'})
    this.listeners = []
  }

  subscribe(fn) {
    this.listeners.push(fn)
    return {
      unsubscribe() {
        this.listeners = this.listeners.filter(l => l !== fn)
      }
    }
  }

  dispatch(action) {
    this.state = this.rootReducer(this.state, action)
    this.listeners.forEach(listener => listener(this.state))
  }

  getState(state) {
    return JSON.parse(JSON.stringify(state))
  }
}