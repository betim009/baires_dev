const User = [];

const addUser = ({ id, username, room }) => {
	if (!username) {
		return { error: "Username is required!" };
	}
	if (!room) {
		return { error: "Room Name is required" };
	}

	username = username.trim().toLowerCase();
	room = room.trim().toLowerCase();

	if (getUser(id).id) {
		return { error: "User ID already exists!" };
	}

	const existingUser = User.find(user => user.room === room && user.username === username);
	if (existingUser) {
		return { error: "Username Already In Use" };
	}

	const user = { id, username, room };
	console.log(user)
	User.push(user);

	return { user };
}

const removeUser = (id) => {
	const index = User.findIndex(user => user.id === id);

	if (index !== -1) {
		return User.splice(index, 1)[0];
	}

	return { error: "User not found!" };
}

const getUser = (id) => {
	const user = User.find(user => user.id === id);

	if (!user) {
		return { error: "User not found!" };
	}

	return user;

}

const getUsersInRoom = (room) => {
	const usersInRoom = User.filter(user => user.room === room);
	return { ans: usersInRoom };
}

module.exports = {
	addUser,
	removeUser,
	getUser,
	getUsersInRoom
}