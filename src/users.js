const users = [];

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!username || !room) {
    return {
      error: "Username and Room name required",
    };
  }

  const existUser = users.find((usr) => {
    return usr.room === room && usr.username === username;
  });

  if (existUser) {
    return {
      error: "Username already exist",
    };
  }

  const newUser = { id, username, room };
  users.push(newUser);
  return { user: newUser };
};

const removeUser = (id) => {
  const index = users.findIndex((element) => {
    return element.id === id;
  });

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((element) => {
    return element.id === id;
  });
};

const getUserInRoom = (room) => {
  return users.filter((element) => {
    return element.room === room;
  });
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUserInRoom,
};
