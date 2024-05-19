const mongoose = require("mongoose");

// Validator function for castImage field
const validateCastImage = (value) => {
    return /^https?:\/\//.test(value);
};

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        max: 120,
        min: 18,
    },
    born: {
        type: String,
        required: true,
    },
    nameInMovie: {
        type: String,
        required: true,
    },
    castImage: {
        type: String,
        required: true,
        validate: {
            validator: validateCastImage,
            message: (props) => `${props.value} is an invalid URL for the castImage`,
        },
    },
});

const Cast = mongoose.model("Cast", castSchema);

module.exports = Cast;
