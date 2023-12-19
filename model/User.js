const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
	userName: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		minlength: 6,
		required: true,
	},
	role: {
		type: String,
		default: "user",
		required: true,
	},
});
const User = mongoose.model("user", UserSchema);
module.exports = {
	User,
};
