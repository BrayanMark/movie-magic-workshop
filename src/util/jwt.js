const util = require("util");
const jwt = require("jsonwebtoken");

function sign(payload, secretOfPrivateKey, options = {}) {
    const promise = new Promise((resolve,reject) => {
        jwt.sign(payload, secretOfPrivateKey, options, (err, token) => {
            if (err) {
               return reject(err);
            }

            resolve(token);
        })
    });

    return promise;
}

const verify = util.promisify(jwt.verify); // from callback function to promise 
module.exports = { sign, verify };