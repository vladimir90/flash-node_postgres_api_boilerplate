const jwt = require('jsonwebtoken')

module.exports  = function(req, res, next) {
  if (!req.header("Authorization")) return res.status(401).send({message: 'Token not provided'})

  const token = req.header('Authorization').split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch(err) {
    return res.status(403).send({message: 'Invalid token', error: err})
  }

}