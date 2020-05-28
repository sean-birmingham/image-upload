require('dotenv').config({ path: './.env' });

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      database: 'image-upload',
      user: 'postgres',
      password: process.env.PASSWORD
    },
    migrations: {
      directory: './database/migrations'
    }
  }
};
