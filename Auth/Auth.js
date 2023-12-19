const { User } = require("../model/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("crypto").randomBytes(35).toString("hex");

// Auth(Register)
exports.register = async (req, res) => {
	const { userName, password } = req.body;
	if (password.length < 6) {
		return res
			.status(400)
			.json({ message: "Password less then 6 characters" });
	}
	try {
		bcrypt.hash(password, 10).then(async (hash) => {
			await User.create({
				userName,
				password: hash,
			}).then((user) => {
				const maxAge = 3 * 60 * 60;
				const token = jwt.sign(
					{ id: user._id, userName, role: user.role },
					process.env.JWT_SECRET,
					{ expiresIn: maxAge },
				);
				res.cookie("jwt", token, {
					httpOnly: true,
					maxAge: maxAge * 1000,
				});
				res.status(200).json({
					message: "User successfully create",
					user,
				});
			});
		});
	} catch (err) {
		res.status(401).json({
			message: "User not successful created",
			error: error.message,
		});
	}
};

// Login
exports.login = async (req, res) => {
	const { userName, password } = req.body;
	if (!userName || !password) {
		return res
			.status(400)
			.json({ message: "user Name or Password are missing" });
	}
	const user = await User.findOne({ userName });
	try {
		if (!user) {
			res.status(401).json({
				message: "Login not successful",
				error: "User not found",
			});
		} else {
			bcrypt.compare(password, user.password).then((result) => {
				if (result) {
					const maxAge = 3 * 60 * 60;
					const token = jwt.sign(
						{ id: user._id, userName, role: user.role },
						process.env.JWT_SECRET,
						{ expiresIn: maxAge },
					);
					res.cookie("jwt", token, {
						httpOnly: true,
						maxAge: maxAge * 1000,
					});
					res.status(200).json({
						message: "Login successful",
						user,
					});
				} else {
					res.status(400).json({ message: "Login not succesful" });
				}
			});
		}
	} catch (err) {
		res.status(401).json({
			message: "User not successful created",
			error: error.message,
		});
	}
};

// Update the role to "admin"
exports.update = async (req, res) => {
	const { role, id } = req.body;
	if (role && id) {
		if (role === "admin") {
			await User.findById(id)
				.then((user) => {
					if (user.role !== "admin") {
						user.role = role;
						user.save().then(() => {
							res.status("201").json({
								message: "Update successful",
								user,
							});
						});
					} else {
						res.status(400).json({
							message: "User is already an Admin",
						});
					}
				})
				.catch((error) => {
					res.status(400).json({
						message: "An error occurred",
						error: error.message,
					});
				});
		} else {
			res.status(400).json({
				message: "Role is not admin",
			});
		}
	} else {
		res.status(400).json({ message: "Role or Id not present" });
	}
};

// Delete a user
exports.deleteUser = async (req, res) => {
	const { id } = req.body;
	await User.findByIdAndDelete(id)
		.then((user) =>
			res
				.status(201)
				.json({ message: "User successfully deleted", user }),
		)
		.catch((err) => {
			throw new Error("Error: " + err);
		});
};

// Get users
exports.getUsers = async (req, res) => {
	await User.find({})
		.then((users) => {
			const userFunction = user.map((user) => {
				const container = {};
				container.userName = user.userName;
				container.role = user.role;
				return container;
			});
			res.status(200).json({ user: userFunction });
		})
		.catch((err) => {
			res.status(401).json({
				message: "Not successful",
				error: err.message,
			});
		});
};
