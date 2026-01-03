import express from "express";
import users from './user.js';
import cors from 'cors';

const app = express()

app.use(cors({ origin: true, credentials: true}));

app.get("/", (req, res) => {
  res.send("Server is ready")
})

app.get('/api/user', (req, res) => {
  res.send(users)
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})