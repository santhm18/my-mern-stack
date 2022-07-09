const jwt = require('jsonwebtoken');
const User =  require('../models/user');

const auth =  async (req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Headers',
     'Access-Control-Allow-Headers, Origin,OPTIONS,Accept,Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );

    // check for basic auth header
    if (!req.headers['authorization']  === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    if (req.headers && req.headers['authorization']) {
      const token = req.headers['authorization'];
      jwt.verify(req.headers['authorization'], 'thisismyfullstackapp', function(err, decoded) {
          if (err) req.user = undefined;
          const user = User.findOne({ _id: decoded._id, 'token' : token });
          const _id = decoded._id;
          req.user = {user, _id};
          next();
        });
      } else {
        req.user = undefined;
        next();
      }
}

module.exports = auth