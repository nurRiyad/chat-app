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
