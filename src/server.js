const express = require('express')
const app = express()
const hostname='localhost'
const port = 3000

app.get('/', (req, res) => {
    res.send('ok')
})
app.listen(port,hostname, ()=>{
    console.log(`success http://${hostname}:${port}`)
})