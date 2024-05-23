const mongoose = require("mongoose");

const validateCastImage = (value) => {
    return /^https?:\/\//.test(value);
};

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        match: /^[a-zA-Z0-9\s]+$/,
    },
    age: {
        type: Number,
        required: true,
        max: 120,
        min: 1,
    },
    born: {
        type: String,
        required: true,
        minLength: 10,
        match: /^[a-zA-Z0-9\s]+$/,
    },
    nameInMovie: {
        type: String,
        required: true,
        minLength: 5,
        match: /^[a-zA-Z0-9\s]+$/,
    },
    castImage: {
        type: String,
        required: true,
        validate: {
            validator: validateCastImage,
            message: (props) => `${props.value} is an invalid URL for the castImage`,
        },
        match: /^https?:\/\//,
    },
});

const Cast = mongoose.model("Cast", castSchema);
module.exports = Cast;
