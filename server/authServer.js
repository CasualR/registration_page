import express from "express";
import users from './user.js';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';

dotenv.config();
const app = express()

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is ready")
})

app.get('/api/user', (req, res) => {
  res.send(users)
})

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