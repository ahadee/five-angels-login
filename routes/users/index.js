const express = require("express")
const router = express.Router()

const { getAll, login,} = require("./controller")

router.get("/", getAll)
router.post("/login", login)

module.exports = router