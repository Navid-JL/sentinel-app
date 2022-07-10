const fs = require('fs')
const path = require('path')
// Import http module
const https = require('https')

// Import the app
const app = require('./app')

// Create a https server
const server = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, './ssl/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, './ssl/cert.pem')),
  },
  app
)

// Listen on a port
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server is running on port: `.brightWhite + `${PORT}`.brightBlue)
})
