const Notification = ({ message, isSuccess }) => {
  if (message === null) {
    return null
  }

  const baseStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: 10,
    marginBottom: 10,
  }
  const successStyle = { ...baseStyle, color: 'green' }
  const errorStyle = { ...baseStyle, color: 'red' }

  return (
    <div style={isSuccess ? successStyle : errorStyle}>
      {message}
    </div>
  )
}

export default Notification