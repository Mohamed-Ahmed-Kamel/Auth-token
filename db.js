const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://mohamed:lo7H0gztwLQeyOkC@cluster0.ca0ebgq.mongodb.net/Auth_test?retryWrites=true&w=majority")
.then(() => {
    console.log("mongogDB connect");
}).catch((err) => {
    console.log(`Errorrrrrrrrrrrrrrr: ${err}`);
});