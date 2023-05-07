const Postgresql = require("../Models/postgreSQL");

async function checkPremium(req, res, next) {
    const isPremium = await Postgresql.checkIsPremiumOfUser(req.body.userID)
    const countSongs = await Postgresql.getFavoriteSongsOfUser(req.body.userID);

    if (isPremium.length === 0 && countSongs.length > 4) {
        console.log("\u001b[35m" + "Limit to add new song" + "\u001b[0m");
        res.status(200).json('LIMITED');
    } else {
        next();
    }
}

module.exports = { checkPremium };