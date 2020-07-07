const express = require('express')
const app = express()
const { PORT, db, SECRET_KEY } = require("./config")
const expressJWT = require("express-jwt")

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(
    expressJWT({secret: SECRET_KEY}). unless({
        path: [
            {
                url: '/',
                methods: ['GET'],
            },
            {
                url: '/users/login',
                methods: ['POST'],
            },
            {
                url: '/users',
                methods: ['POST'],
            }
        ]
    })
)

app.use((err,req,res,next) => {
    // console.log(err);
    
    if (err.code === "UnauthorizedError") {
        return res.status(401).json({message: "You're not a member"})
    }
    else if (err.code === "invalid_token") {
        return res.status(401).json({message: "Your token is expired"})
    } 
    else {
        return next()
    }
})


app.use('/', (req, res) => {
    res.status(200).json({ message: "Hello to Login Backend" })
})

app.use("/users", require("./routes/users"))

if (db) {
    app.listen(PORT, () => {
        console.log(`This app is listen on PORT: ${PORT}`);
    })
}


