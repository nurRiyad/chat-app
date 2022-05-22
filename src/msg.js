const generateMsg = (msg) => {
  return {
    msg: msg,
    createdAt: Date.now(),
  };
};

module.exports = {
  generateMsg,
};
