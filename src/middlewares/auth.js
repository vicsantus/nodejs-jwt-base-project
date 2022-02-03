require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_KEY } = process.env;

const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    if (!JWT_KEY) {
      console.error("JWT_KEY não foi definido no .env");
      throw Error;
    }
    const { authorization } = req.headers;

    const { username } = jwt.verify(authorization, JWT_KEY);

    const user = await User.findOne({ where: { username } });

    if (!authorization || !username || !user) throw Error;
    
    next();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ 
        message: 'Erro ao acessar o endpoint', 
        error: 'É necessário um token válido para acessar esse endpoint' 
      });
  }
}
