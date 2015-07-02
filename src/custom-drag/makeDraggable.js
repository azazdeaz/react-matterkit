import Monitor from './Monitor'

export default function makeDraggable(node, opt = {}) {
  var waitingMoveEvent, waitingMoveRaf
  var monitor = new Monitor()

  node.addEventListener('mousedown', onDown)
  node.addEventListener('mouseover', onEnter)
  node.addEventListener('mouseleave', onLeave)

  return function dispose() {
    node.removeEventListener('mousedown', onDown)
    node.removeEventListener('mouseover', onEnter)
    node.removeEventListener('mouseleave', onLeave)
  }

  function onDown(e) {
    if (e.button !== 0) {
        return
    }
    monitor.reset()
    monitor.startDrag()
    monitor.addEvent(e)

    var custom = call('onDown')

    if (custom === false) {//prevent dragging
        window.addEventListener('mouseup', onUpWithoutDrag)
        return
    }

    // e.stopPropagation();//ex. prevent to drag the parent if that's draggable too
    // - prevent to set the down state on the dragged item

    e.preventDefault() //ex. prevent selecting text

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mouseleave', onUp)
  }

  function onMove(e) {
    waitingMoveEvent = e

    if (!waitingMoveRaf) {
      waitingMoveRaf = window.requestAnimationFrame(rafOnMove)
    }
  }

  function rafOnMove() {
    window.cancelAnimationFrame(waitingMoveRaf)
    monitor.addEvent(waitingMoveEvent)

    waitingMoveRaf = undefined
    waitingMoveEvent = undefined

    call('onDrag')
  }

  function onUp(e) {
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
    window.removeEventListener('mouseleave', onUp)

    if (waitingMoveEvent) {
        rafOnMove()
    }

    monitor.stopDrag()
    monitor.addEvent(e)

    if (monitor.isOver()) {
        onLeave()
    }

    call('onUp')

    if (!monitor.isMoved()) {
      call('onClick')
    }
  }

  function onUpWithoutDrag(e) {
    window.removeEventListener('mouseup', onUpWithoutDrag)
    monitor.addEvent(e)
    call('onClick')
  }

  function onEnter(e) {
    monitor.addEvent(e)
    if (!monitor.isDrag()) call('onEnter')
  }

  function onLeave(e) {
    monitor.addEvent(e)
    if (!monitor.isDrag()) call('onLeave')
  }

  function call(name) {
    if (name in opt) {
      return opt[name].call(opt.thisArg, monitor)
    }
  }
}