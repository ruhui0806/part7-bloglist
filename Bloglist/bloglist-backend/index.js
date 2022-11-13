const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const server = http.createServer(app)
// const PORT = process.env.PORT
const PORT = config.PORT

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


// const http = require('http')
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const app = require('./app') //the actual express application
// const Blog = require('./models/Blog')


// const mongoUrl = 'mongodb://localhost/bloglist'
// mongoose.connect(mongoUrl)

// app.use(cors())
// app.use(express.json())


// const PORT = 3003
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })



