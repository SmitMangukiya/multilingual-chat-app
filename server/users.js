const users = [];

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const exitstingUser = users.find((user) => user.room == room && user.name == name);

    if(exitstingUser) {
        return { error : 'User is already taken for this room'};
    }

    const user = {id, name, room};

    users.push(user);

    return {user};
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id == id);
    if(index !== -1) {
        const user = users[index];
        users.splice(index, 1);
        if(users.length != 0) {
            return user;
        }
    }
    return null;
}

const getUser = (id) => {
    return users.find((user) => user.id == id);
}

const getUsersInRoom = (room) => {
    users.filter((user) => user.room == room);
}

module.exports = {addUser, removeUser, getUser, getUsersInRoom};