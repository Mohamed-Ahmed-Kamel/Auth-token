const jwt = require("jsonwebtoken");
const jwtSecret =
	"45313bd974def0af48b33df572a20317d2bf4a30bffbf0a5d0acdfc0032f07f9f96416";
exports.adminAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, jwtSecret, (err, decoded) => {
			if (err) {
				return res.status(401).json({ message: "Not authorized" });
			} else {
				if (decoded.role !== "admin") {
					return res.status(401).json({ message: "Not authorized" });
				} else {
					next();
				}
			}
		});
	} else {
		return res.status.json({
			message: "Not authorized, token not available",
		});
	}
};
exports.userAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, jwtSecret, (err, decoded) => {
			if (err) {
				return res.status(401).json({ message: "Error: Not authorized" });
			} else {
				if (decoded.role !== "user") {
					return res.status(401).json({ message: "Not authorized" });
				} else {
					next();
				}
			}
		});
	} else {
		return res
			.status(401)
			.json({ message: "Not authorized, token not available" });
	}
};
