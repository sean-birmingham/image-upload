const db = require('../database/dbConfig');

module.exports = {
  add,
  findById
};

function add(image) {
  return db('images').insert(image).returning('id');
}

function findById(id) {
  return db('images').where({ id }).first();
}
