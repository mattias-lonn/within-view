# within-view

> within-view uses preact/react hook to detect scroll event changes and checking if the wanted element(s) is within view and appending a class to the element if desired.

### Install
```sh
npm i within-view
```

### Usage
```js
isWithinView({ y, key, id, ref, class, skipEl, offset, repeatedly, addParentOffset, add, skipCb, cb })
```
```js
useScrollPosition(effect, dependencies, wait)
```

### Preact / React integration
```js
// Preact integration.
import { isWithinView, useScrollPosition } from 'within-view/preact'

// React integration.
import { isWithinView, useScrollPosition } from 'within-view/react'
```

## Example

**Add inView class to element**

```js
import { isWithinView, useScrollPosition } from 'within-view/**(preact/react)**'

useScrollPosition(({ position }) => {
  const p = {
    y: position.y, // Current scroll position.
    add: 'inView' // Adds class 'inView' when within view.
  }

  // Can be done with either element id, class, query or ref,
  isWithinView({ ...p, id: `helloWorld` })
  isWithinView({ ...p, class: `helloWorld` })
  isWithinView({ ...p, query: `.helloWorld` })
  isWithinView({ ...p, ref: helloWorlRef })

  // Nested classes/ids.
  isWithinView({ ...p, query: `.helloWorld .inner #first` })

  // By setting repeatedly as false the class will only be added once.
  isWithinView({ ...p, repeatedly: false })

  // To get the element position and the parent, set addParentOffset to true.
  isWithinView({ ...p, addParentOffset: true })

  // By setting skipEl to true the element will be skipped.
  isWithinView({ ...p, skipEl: true})
}, [], 50) // [dependencies], wait timeout.
```

**Call another function when within view and skip the element on done**

```js
import { isWithinView, useScrollPosition } from 'within-view/**(preact/react)**'
import { useState } from 'preact/hooks' // react

const [seenAlert, setSeenAlert] = useState(false)

useScrollPosition(({ position }) => {
  const p = { y: position.y, add: 'inView' }
  isWithinView({
    y: position.y,
    skipEl: seenAlert,
    class: `scheduleDemo`,
    offset: 120,
    skipCb: seenAlert,
    cb: () => {
      setSeenAlert(true)
      alert('Dont miss out!')
    }
  })
}, [inView], 50)
```

**Bonus: Scroll direction**

```js
import { useScrollPosition } from 'within-view/**(preact/react)**'
import { useState } from 'preact/hooks' // react

const [seenAlert, setSeenAlert] = useState(false)

useScrollPosition(({ direction }) => {
  console.log(`I'am scrolling ${direction}`) // down/up
}, [])
```

**Bonus: Hide header on scroll**

```js
import { useScrollPosition } from 'within-view/**(preact/react)**'
import { useState } from 'preact/hooks' // react

const [hideHeader, setHideHeader] = useState(false)

useScrollPosition(({ position }) => {
  const headerShouldBeHidden = position.y > 250
  if (headerShouldBeHidden !== hideHeader) {
    setHideHeader(headerShouldBeHidden)
  }
}, [hideHeader], null, 100) // wait 100ms.

return (
  <header class={hideHeader && 'hide'}>
    <a href='/'>Within View</a>
  </header>
)
```
