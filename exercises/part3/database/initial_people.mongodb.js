/* global use, db */

/////////////////////////////////
// IMPORTANT                   //
//                             //
// THIS WILL DELETE ALL PEOPLE //
// USE WITH CAUTION            //
/////////////////////////////////

use('phonebookApp');
const people = db.getCollection('people');

people.deleteMany({});

people.insertMany([
  {
    name: 'Arto Hellas',
    number: '040-123456',
    _id: ObjectId('656ed977595a10cf44269f58'),
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
])