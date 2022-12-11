require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || 'kasra123',
    database: process.env.DATABASE_NAME || 'huralya',
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: parseInt(process.env.DATABASE_PORT) || 3306,
    dialect: process.env.DATABASE_DIALECT || 'mysql',
    dialectOptions: {
      requestTimeout: 25000
    },
    pool: {
      max: 100,
      min: 0,
      idle: 200000,
      acquire: 1000000
    }
  }
  /*
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {
        ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
      }
    }
  }
  */
}
