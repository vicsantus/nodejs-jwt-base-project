require('dotenv').config();

const config = {
  username: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  host: process.env.SQL_HOST,
  port: process.env.SQL_PORT,
  dialect: 'mysql',
};

module.exports = {
  development: {
    ...config,
    database: 'jwt_exercise_dev',
  },
  test: {
    ...config,
    database: 'jwt_exercise_test',
  },
  production: {
    ...config,
    database: 'jwt_exercise',
  },
};
