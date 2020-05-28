exports.up = function (knex) {
  return knex.schema.createTable('images', (image) => {
    image.increments();
    image.string('image', 255).notNullable();
    image.string('public_id', 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('images');
};
