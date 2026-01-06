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

app.post('/login', (req, res) => {
  // Authenticate User

  const username = req.body.username;
  const user = { name: username }

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ accessToken: accessToken })

})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})