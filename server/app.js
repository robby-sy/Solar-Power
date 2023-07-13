const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const router = require('./routes')


app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/',(req,res,next)=>{
    res.send('Solar Power Server Is Running');
})

app.use(router)

app.listen(PORT, ()=>{
    console.log("Listening From Port ",PORT);
})

module.exports = app