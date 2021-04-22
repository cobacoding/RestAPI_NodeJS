/* eslint-disable no-unused-vars */
const models = require('../models')
const bcryptsjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

function signUp (req, res) {
  models.User.findOne({ where: { email: req.body.email } }).then(result => {
    if (result) {
      res.status(409).json({
        message: 'Email already exists!'
      })
    } else {
      bcryptsjs.genSalt(10, function (_err, salt) {
        bcryptsjs.hash(req.body.password, salt, function (_err, hash) {
          const user = {
            name: req.body.name,
            email: req.body.email,
            password: hash
          }

          models.User.create(user).then(_result => {
            res.status(201).json({
              message: 'User Created Successfully'
            })
          }).catch(_error => {
            res.status(500).json({
              message: 'Something went wrong!'
            })
          })
        })
      })
    }
  }).catch(_error => {
    res.status(500).json({
      message: 'Something went wrong!'
    })
  })
}

function login (req, res) {
  models.User.findOne({ where: { email: req.body.email } }).then(user => {
    if (user === null) {
      res.status(401).json({
        message: 'Invalid credentials!'
      })
    } else {
      bcryptsjs.compare(req.body.password, user.password, function (_err, result) {
        if (result) {
          const token = jwt.sign({
            email: user.email,
            userId: user.id
            // tadinya 'secret' diubah di ambil dari nodemon.json
          }, process.env.JWT_KEY, function (_err, token) {
            res.status(200).json({
              message: 'Authentication successful!',
              token: token
            })
          })
        } else {
          res.status(401).json({
            message: 'Invalid credentials TOKEN!'
          })
        }
      })
    }
  }).catch(_error => {
    res.status(500).json({
      message: 'Something went wrong!'
    })
  })
}

module.exports = {
  signUp,
  login
}
