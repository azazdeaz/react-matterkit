import assign from 'object-assign'

export default class Monitor {
  constructor(deTarget) {
    this._deTarget = deTarget
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
    var {type} = event
    event = {
      clientX: event.clientX,
      clientY: event.clientY
    }

    if (!this._firstEvent) {
      this._firstEvent = event
    }
    this._lastEvent = event

    switch(type) {
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
    return this._getClientOffsetByEvent(this.getLastEvent())
  }

  getSourceClientOffset() {
    return this._getSourceClientOffsetByEvent(this.getLastEvent())
  }

  getInitialClientOffset() {
    return this._getClientOffsetByEvent(this.getFirstEvent())
  }

  getInitialSourceClientOffset() {
    return this._getSourceClientOffsetByEvent(this.getFirstEvent())
  }

  getDifferenceFromInitialOffset() {
    var first = this.getInitialSourceClientOffset()
    var last = this.getSourceClientOffset()

    return {
      x: last.x - first.x,
      y: last.y - first.y
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

  _getClientOffsetByEvent(event) {
    var {clientX, clientY} = event
    return {x: clientX, y: clientY}
  }

  _getSourceClientOffsetByEvent(event) {
    var {left, top} = this._deTarget.getBoundingClientRect()
    return {
      x: event.clientX - left,
      y: event.clientY - top
    }
  }
}
