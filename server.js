const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex= require('knex');

const register =  require('./controllers/register');
const signin =  require('./controllers/login');
const profile = require('./controllers/profile');
const image =  require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : process.env.DATABASE_URL,
      user : 'test',
      password : 'test123',
      database : 'smart_brain'
    }
  });

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.use(cors());
app.use(bodyParser.json());




app.get('/', (req, res)=> {res.send(database.users)})
app.post('/signin', signin.handleSignIn(db, bcrypt))
app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt)})
//:id means uyo canenter anything in its place

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)} );

app.put('/image',(req, res) =>{image.handleImage(req, res, db)});

app.post('/imageurl',(req, res) =>{image.handleApiCall(req, res)});

app.listen(process.env.PORT || 4000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
});


/*
/--> res= this is working

/signin route --> POST request, respond with success/fail
any password 
we send its not as a query but as http, 
hidden from others

/register -> POST = return the enw created user 
to make sure everything is working, 
so we return a new user object

/profile/:userId --> each user has homescreen of his own, 

GET = returns user
/count of how many ohtos user submitted, 
and give them a rank

/image --> PUT, user already exists, 
and an update on user profile is image 
PUT--> user

*/ 