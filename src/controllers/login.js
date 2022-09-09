const { UserService } = require('../services');

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

const validateUserOrPassword = (user, password, res) => {
  if (!user || user.password !== password) {
    res
      .status(401)
      .json({ message: 'Usuário não existe ou senha inválida' });
    return false;
  }

  return true;
};

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!validateBody(req.body, res)) return;

    const user = await UserService.getByUsername(username);

    if (!validateUserOrPassword(user, password, res)) return;

    res.status(200).json({ message: 'Login efetuado com sucesso' });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Erro interno', error: err.message });
  }
};
