const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

const usuario = {
    'email': 'email@exemplo.com',
    'senha': '123'
}

let authenticated = false

app.use(
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json()
)

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res)=>{
    res.render('home', {layout: 'default', authenticated: authenticated})
})

app.get('/login', (req, res)=>{
    if(authenticated){
        res.render('login', {layout: 'default', authenticated: authenticated, mensagem: 'Você já esta autenticado', temMensagem: true})
    }
    else{
        res.render('login', {layout: 'default', authenticated: authenticated})
    }
    
})

app.get('/logout', (req, res)=>{
    authenticated = false
    res.render('home', {layout: 'default', authenticated: authenticated})
})

app.post('/login', (req, res)=>{
    if(~authenticated){
        const email = req.body.Email
        const password = req.body.Password
        if(usuario.email == email && usuario.senha == password){
            authenticated = true
            res.render('home', {layout: 'default', authenticated: authenticated, mensagem: 'Você esta autenticado', temMensagem: true})
        }else{
            res.render('login', {layout: 'default', authenticated: authenticated, mensagem: 'Verifique sua senha ou email', temMensagem: true})
        }
    }
})

app.listen(port, ()=>{
    console.log('Servidor iníciado...')
})