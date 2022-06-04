const users = [];

//Add user to the users array
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

//Remove user from the user array
const removeUser = (id) => {
  const index = users.findIndex((element) => {
    return element.id === id;
  });

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// Get a specific user from the users list
const getUser = (id) => {
  return users.find((element) => {
    return element.id === id;
  });
};

//Check if the user from same room
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
