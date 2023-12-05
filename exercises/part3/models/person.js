const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: (number) => {
        if (!number) return false // check if undefined
        if (number.length < 8) return false

        return /^\d{2,3}-\d*$/.test(number) // matches pattern of 2-3 digits, '-', digits
      }
    },
    required: true,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)