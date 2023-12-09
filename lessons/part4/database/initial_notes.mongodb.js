/* global use, db, ObjectId */

////////////////////////////////
// IMPORTANT                  //
//                            //
// THIS WILL DELETE ALL NOTES //
// USE WITH CAUTION           //
////////////////////////////////

use('noteApp')
const notes = db.getCollection('notes')

notes.deleteMany({})

notes.insertMany([
  {
    content: 'HTML is easy',
    important: true,
    _id: ObjectId('656afa95bb54ae7144f5ff97'),
  },
  {
    content: 'Browser can only execute JavaScript',
    important: false,
  },
  {
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
])