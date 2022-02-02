require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_KEY } = process.env;

const { User } = require('../models');

module.exports = async (req, res) => {
  try {
    if (!JWT_KEY) {
      console.error("JWT_KEY não foi definido no .env");
      throw Error;
    }
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(401).json({ message: 'É necessário usuário e senha para fazer login' });

    const user = await User.findOne({ where: { username } });

    if (!user || user.password !== password)
      return res.status(401).json({ message: 'Usuário não existe ou senha inválida' });

    const token = jwt
      .sign({username}, JWT_KEY);

    return res.status(200).json({ message: 'Login efetuado com sucesso', token});
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};
