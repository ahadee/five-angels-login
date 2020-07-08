const express = require('express')
const app = express()
const { PORT, db, SECRET_KEY } = require("./config")
const expressJWT = require("express-jwt")

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(
    expressJWT({secret: SECRET_KEY, algorithms: ['HS256']}). unless({
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
    console.log(err);
    
    if (err.code === "invalid_token") {
        return res.status(401).json({message: "Your token is expired"})
    }
    else if (err.code === "credentials_required") {
        return res.status(401).json({message: "Your do not have authorization, You need to login first!"})
    }  
    else {
        return next()
    }
})


app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello to Login Backend" })
})

app.use("/users", require("./routes/users"))

if (db) {
    app.listen(PORT, () => {
        console.log(`This app is listen on PORT: ${PORT}`);
    })
}


