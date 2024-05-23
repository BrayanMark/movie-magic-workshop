const router = require("express").Router();
const movieService = require("../services/movieService");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/", async (req, res) => {

    try {        
        const movies = await movieService.getAll().lean();
        res.render("home", { movies });
    } catch (err) {
        const message = getErrorMessage(err);
        res.render("home", {...movies, error: message });
    }
});

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/search", (req, res) => {
    const { title, genre, year } = req.query;
    const movieResult = movieService.search(title, genre, year);
    res.render("search", { movies: movieResult, title, genre, year });
});

router.get("/404", (req, res) => {
    res.render("404");
});

module.exports = router;