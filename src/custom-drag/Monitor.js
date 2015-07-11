import assign from 'object-assign'

export default class Monitor {
  constructor() {
    this.reset()
  }

  reset() {
    this._data = {}
    this._lastEvent = undefined
    this._firstEvent = undefined
    this._moved = false
    this._over = false
    this._drag = false
  }

  addEvent(event) {
    if (!this._firstEvent) {
      this.firstEvent = event
    }
    this._lastEvent = event

    switch(event.type) {
      case 'mousemove':
        this._moved = true
        break
      case 'mouseenter':
        this._over = true
        break
      case 'mouseleave':
        this._over = false
        break
    }
  }

  getFirstEvent() {
    return this._firstEvent
  }

  getLastEvent() {
    return this._lastEvent
  }

  setData(data) {
    assign(this._data, data)
  }

  getData() {
    return this._data
  }

  getClientOffset() {
    var {clientX, clientY} = this.getLastEvent()
    return {x: clientX, y: clientY}
  }

  getSourceClientOffset() {
    var event = this.getLastEvent()
    var {left, top} = event.currentTarget.getBoundingClientRect()
    return {
      x: event.clientX - left,
      y: event.clientY - top
    }
  }

  startDrag() {
    this._drag = true
  }

  stopDrag() {
    this._drag = true
  }

  isMoved() {
    return !!this._moved
  }

  isOver() {
    return !!this._over
  }

  isDrag() {
    return !!this._drag
  }
}
