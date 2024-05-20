const { Schema, model, MongooseError } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({

    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/@[a-zA-Z0-9]+\.[a-zA-Z0-9]+&/, "Should end in @x.x, where x is one or more English letters/digits"],
        minLength: [10, "Should be at least 10 characters long "],

    },

    password: {
        type: String,
        match: [/^[a-zA-Z0-9]+&/, "Should consist only of English letters and digits"],
        required: true,
        minLength: [6, "Should be at least 6 characters long"],
    },
});

userSchema.pre("save", async function () {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
});

userSchema.virtual("rePassword")
.set(function(value) {
    // Validate
    if (value !== this.password) {
        throw new MongooseError("Password missmatch!");
    }
});


const User = model("User", userSchema);
module.exports = User;