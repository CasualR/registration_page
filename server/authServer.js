import express from "express";
import users from './user.js';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';

dotenv.config();
const app = express()

app.use(cors({ origin: true, credentials: true}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is ready")
})

app.get('/api/user', (req, res) => {
  res.send(users)
})

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
})

app.post('/login', (req, res) => {
  // Authenticate User

  const username = req.body.username;
  const user = { name: username }

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  res.json({ accessToken: accessToken })

})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
}

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})