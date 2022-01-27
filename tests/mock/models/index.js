const Users = require('./Users.json');
const Posts = require('./Posts.json');

const mockCreate = (Instance, data) => {
  const newData = data;
  if(!!Instance[0].id) {
    newData.id = Date.now();
  }
  Instance.push(newData);
};

const mockFindOne = (Instance, where) => {
  const entries = Object.entries(where);
  // > [ [attr, value], ... ]
  const results = [];
  entries.forEach(entryEl => {
    const index = Instance.findIndex(instanceEl => 
      !!instanceEl[entryEl[0]] && instanceEl[entryEl[0]] === entryEl[1])
    if(index !== -1){
      results.push(Instance[index]);
    }
  });
  return results;
};

const User = {
  create: async (data) => mockCreate(Users, data),
  findAll: async () => Users,
  findOne: async ({ where }) => mockFindOne(Users, where)
};

const Post = {
  findAll: async () => Posts,
};

module.exports = {
  User,
  Post
}
