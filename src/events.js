
// List synthetic event handlers
const createRenderEvent = (opts) => new CustomEvent(createRenderEvent.eventName, { 'detail': Object.assign({}, opts), 'bubbles': true, 'cancelable': false })
createRenderEvent.eventName = 'render'
const createStatusEvent = (opts) => new CustomEvent(createStatusEvent.eventName, { 'detail': Object.assign({}, opts), 'bubbles': true, 'cancelable': false })
createStatusEvent.eventName = 'status'
const createSelectEvent = (opts) => new CustomEvent(createSelectEvent.eventName, { 'detail': Object.assign({}, opts), 'bubbles': true, 'cancelable': false })
createSelectEvent.eventName = 'select'

/**
 * I don't know how I feel about this...
 */
export const events = {
  createRenderEvent,
  createStatusEvent,
  createSelectEvent
}


