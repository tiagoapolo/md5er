'use restrict'

var crypto = require('crypto')
var express = require('express')
var bodyParser = require('body-parser');
var fs = require('fs')

const app = express()
const port = process.argv[2] === '-p' ? process.argv[3] : '8888'

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/login', (req, res) =>{

    let name = req.body.name.trim()
    let password = crypto.createHash('md5').update(req.body.password.trim()).digest('base64')

    fs.appendFile('data.txt', `${name}|${password}`,(err)=>{
        if(err) res.json({ message: 'Error while writing!', error: err })
        
        res.json({name: req.body.name, password: password })
    })    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
