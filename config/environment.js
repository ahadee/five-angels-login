require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    DATABASE_LOCAL: process.env.DATABASE_LOCAL,
    DATABASE_LIVE: process.env.DATABASE_LIVE,
    SECRET_KEY: process.env.SECRET_KEY,

}