import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisiblility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisiblility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisiblility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisiblility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable