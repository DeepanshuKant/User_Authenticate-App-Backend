const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken');


const app = express();
app.use(cors())
app.use(express.json());
require('dotenv').config();

//Model Import-------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>
const userModel = require('./models/user.model')


//connect mongoDb--------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const mongoDB = process.env.MONGO_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Mongo connection established"));

app.get('/', (req, res) => {

    return res.json({ "welcome": "to my server" })
})

app.post('/user/register', async (req, res) => {

    try {
        const newUser = await userModel.create(req.body);

        if (newUser) {
            console.log(newUser)
            return res.json({ status: "ok", userAdded: newUser })
        }
        else {
            return res.json({ status: 'error', userAdded: "User is not Added" });
        }
    }
    catch (error) {

        return res.json({ "error": "Duplicate Email" })
    }
})

app.post("/user/login", async (req, res) => {

    const getUser = await userModel.findOne(
        {
            username: req.body.username,
            password: req.body.password
        }
    )

    if (!getUser) {

        return res.json({ status: 'error', user: false });
    }
    else {
        const token = jwt.sign(
            {
                username: getUser.username,
                password: getUser.password
            }, 'secret1234'
        )
        return res.json({ status: 'ok', user: token })
    }
})


app.listen(process.env.PORT || 3001, () => {
    console.log("Server successfully running at 3001")
})