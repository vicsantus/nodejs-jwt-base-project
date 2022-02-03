require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_KEY } = process.env;

if (!JWT_KEY) {
  const error = new Error();
  error.message = 'JWT_KEY não foi definido no .env';
  throw error;
}

const { User } = require('../models');

const validateBody = (body, res) => {
  const { username, password } = body;

  if (!username || !password) {
    res
      .status(401)
      .json({ message: 'É necessário usuário e senha para fazer login' });
    return false;
  }

  return true;
};

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!validateBody(req.body, res)) return;

    const user = await User.findOne({ where: { username } });

    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ message: 'Usuário não existe ou senha inválida' });
    }

    const token = jwt.sign({ username }, JWT_KEY);

    return res
      .status(200)
      .json({ message: 'Login efetuado com sucesso', token });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Erro interno', error: err.message });
  }
};
