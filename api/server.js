"use strict"

const app = require('./app')
const config = require('../config')

const port = config('PORT')

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
    
})