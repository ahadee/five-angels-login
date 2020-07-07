const { PORT,
    DATABASE_LOCAL,
    DATABASE_LIVE,
    SECRET_KEY,

} = require("./environment")

const db = require('./connection')

module.exports = {
    PORT,
    DATABASE_LOCAL,
    DATABASE_LIVE,
    db,
    SECRET_KEY,

}