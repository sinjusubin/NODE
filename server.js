const express=require('express')
const app=express();
const bodyParser=require('body-parser');
const hbs=require('hbs');
const nocache=require('nocache');
const session=require('express-session');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','hbs');
const username="admin"
const password="admin@123"
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveuninitialized:true,
}));
app.use(nocache())

app.get('/',(req,res)=>
{
    if(req.session.user)
    {
    res.render('home');
    }
    else
    {
        res.render('login')
    }
    
});
app.post('/verify',(req,res)=>
{
    console.log(req.body);
    if(req.body.username===username&&req.body.password===password)
    {
        req.session.user=req.body.username
        res.render('home')
    }
    else
    {
        res.render('login',{msg:"invalid username or password please try again."});
    }
});
app.listen(3003,()=>console.log('server running on part 3000'));