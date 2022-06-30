const express = require("express");

const app = express();
const dbConfig = require('./db')
app.use(express.json())

const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/usersRoute')

app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});