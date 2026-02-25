import express from "express";
import users from './user.js';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';

const bcrypt = require('bcrypt');
dotenv.config();
const pool = require('./db');
const app = express()

// Quantity of Salt rounds for creating user 
const saltRounds = 12;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is ready")
})

app.get('/api/user', (req, res) => {
  res.send(users)
})

// Creating new user

app.post('/user/create', (req, res, next) => {
  
  bcrypt.hash(req.body.password, saltRounds, (error, hash) => {

    pool.create({
      
    })

  })

})


// Pool handling

app.post('/', async (req, res) => {
  const { username, password } = req.body
  try {
    await pool.query('INSERT INTO schools (name, address) VALUES ($1, $2)', [username, password])
    res.sendStatus(200).json({message: "Successfully added child"})
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.get('/setup', async (req, res) => {
  try {
    await pool.query('CREATE TABLE schools( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100) )')
    res.sendStatus(200).json({message: "Successfully created table"})
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// Pool handling


let refreshTokens = []

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken })
  })
})

app.post('/login', (req, res) => {
  // Authenticate User

  const username = req.body.username;
  const user = { name: username }

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })

})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
}

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})