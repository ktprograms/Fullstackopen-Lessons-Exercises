const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const connectionString = `mongodb://root:${password}@192.168.1.103:50001/phonebookApp?directConnection=true&authSource=admin`

mongoose.set('strictQuery', true)
mongoose.connect(connectionString).catch(console.error)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// add new entry
if (process.argv[3] /* name */ && process.argv[4] /* number */) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then((result) => {
    console.log('person saved!')
    mongoose.connection.close()
  })
} else { // list all
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}