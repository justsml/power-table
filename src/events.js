
// List synthetic event handlers
const createRenderEvent = (opts) => new CustomEvent(createRenderEvent.eventName, { 'detail': Object.assign({}, opts), 'bubbles': true, 'cancelable': false })
createRenderEvent.eventName = 'render'
const createStatusEvent = (opts) => new CustomEvent(createStatusEvent.eventName, { 'detail': Object.assign({}, opts), 'bubbles': true, 'cancelable': false })
createStatusEvent.eventName = 'status'
const createSelectEvent = (opts) => new CustomEvent(createSelectEvent.eventName, { 'detail': Object.assign({}, opts), 'bubbles': true, 'cancelable': false })
createSelectEvent.eventName = 'select'
const createSortedEvent = (opts) => new CustomEvent(createSortedEvent.eventName, { 'detail': Object.assign({}, opts), 'bubbles': true, 'cancelable': false })
createSortedEvent.eventName = 'sorted'

/**
 * I don't know how I feel about this...
 * Hmmm, i think a factory function is needed...
 */
export const events = {
  createRenderEvent,
  createStatusEvent,
  createSelectEvent,
  createSortedEvent,
}


