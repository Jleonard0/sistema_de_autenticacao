const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const auth = require('./routes/authentication')
const port = 3000

let authenticated = true

app.use(
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json()
)
app.use('/', auth)

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res)=>{
    res.render('home', {layout: 'default', authenticated: authenticated})
})

app.listen(port, ()=>{
    console.log('Servidor iníciado...')
})