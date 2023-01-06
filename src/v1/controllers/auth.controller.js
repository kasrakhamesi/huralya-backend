const { sequelize } = require('../models')

const login = (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(422).send({
      statusCode: 422,
      data: null,
      error: { message: 'Invalid Inputs' }
    })
}

module.exports = { login }
