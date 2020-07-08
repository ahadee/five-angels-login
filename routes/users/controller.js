const { User } = require("../../models")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const { SECRET_KEY, } = require("../../config")


module.exports = {
    getAll: async (req, res) => {
        try {
            const users = await User.find({})
            res.status(200).json({ message: "Get All Users", data: users })
        } catch (error) {
            console.log(error);

        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const result = await User.findOne({ email: email })
            const { _id } = result

            bcrypt.compare(password, result.password).then((response) => {
                if (response === true) {
                    const token = jwt.sign({ _id }, SECRET_KEY, {
                        expiresIn: "30s"
                    })
                    // console.log(token);


                    res.status(200).send({ token: token })
                } else {
                    res.status(401).send({
                        message: "your are not allowed to enter this api",
                    })
                }
            })
        } catch (error) {
            console.log(error);
            
        }
    },
}