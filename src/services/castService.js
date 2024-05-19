const Cast = require("../models/Cast");

exports.getAll = () => Cast.find();
exports.create = (castData) => Cast.create(castData);

exports.getByIds = (castsIds) => {
    const casts = Cast.find({_id: { $in: castsIds }});

    return casts;
}

