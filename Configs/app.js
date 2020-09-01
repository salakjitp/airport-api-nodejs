require('dotenv').config()

module.exports = {
  environment: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  isProduction: process.env.NODE_ENV === 'production',
  mongodbUri: process.env.MONGODB_URI || ''
}