const { useLayoutEffect } = require('react')

const getScrollPosition = () => {
  try {
    return { x: window.scrollX, y: window.scrollY }
  } catch (err) {
    console.error('getScrollPosition err:', err.message)
    return { x: 0, y: 0 }
  }
}

let hasScrollListener = false

exports.useScrollPosition = (effect, dependencies, wait) => {
  let waitTimeout

  const callBack = () => {
    const position = getScrollPosition()
    effect({ position })
    waitTimeout = null
  }

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait && waitTimeout == null) {
        waitTimeout = setTimeout(callBack, wait)
      } else if (!wait) { callBack() }
    }

    try {
      window.addEventListener('scroll', handleScroll)
      hasScrollListener = true
    } catch (err) {
      console.error('useScrollPosition err:', err.message)
    }

    return () => hasScrollListener && window.removeEventListener('scroll', handleScroll)
  }, dependencies)
}

exports.isElementInSight = ({
  y = 0,
  key,
  id,
  ref,
  class: elementClass,
  skipEl,
  offset = 0,
  repeatedly = true,
  addParentOffset = false,
  add,
  skipCb,
  testDocument,
  cb
}) => {
  if (skipEl || (!id && !elementClass && typeof ref === 'undefined')) return

  try {
    const idOrClass = id || elementClass
    const element = (ref && ref.current) || (testDocument || document).querySelector(idOrClass)

    if (!element) {
      const msg = typeof ref !== 'undefined' ? 'Element using ref' : `Element '${id || elementClass}'`
      return console.error(`isElementInSight err: ${msg} was not found.`)
    }

    if (addParentOffset) {
      offset += element.offsetParent.offsetTop
    }

    const elPosition = testDocument
      ? element.dataset.offsettop - element.dataset.innerheight + offset
      : element.offsetTop - window.innerHeight + offset

    if (y > elPosition) {
      element.classList.add(add)
      if (cb) { cb(key) }
      return true
    } else {
      if (repeatedly) { element.classList.remove(add) }
      return false
    }
  } catch (err) {
    console.error('isElementInSight err:', err.message)
    return false
  }
}