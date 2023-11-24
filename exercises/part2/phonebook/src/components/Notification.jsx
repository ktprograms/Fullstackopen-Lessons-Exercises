const Notification = ({ message }) => {
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

  return (
    <div style={successStyle}>
      {message}
    </div>
  )
}

export default Notification