// Take a message and username and formate it properly to send in frontend
const generateMsg = (msg, username) => {
  return {
    username: username,
    msg: msg,
    createdAt: Date.now(),
  };
};

module.exports = {
  generateMsg,
};
