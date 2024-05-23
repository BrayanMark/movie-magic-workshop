const router = require("express").Router(); 
const movieService = require("../services/movieService");
const castService = require("../services/castService");
const { isAuth } = require("../middleware/authMiddleware");

const { getErrorMessage } = require("../utils/errorUtils");
router.get("/create", isAuth, (req, res) => {
    res.render("create");
});

router.post("/create", isAuth, async (req, res) => {
  const newCreatedMovie = { ...req.body, owner: req.user._id, }; // current user creator data

  try {
    await movieService.create(newCreatedMovie);
    res.redirect("/");
  } catch (err) {
    const message = getErrorMessage(err);
    res.render("create", { error: message });
  }
});

router.get("/movies/:movieId", async (req, res) => {
    const movieId = req.params.movieId;

    try {      
      const movie = await movieService.getOne(movieId).lean();
      const isOwner = movie.owner == req.user?._id;
      movie.rating = new Array(Number(movie.rating)).fill(true);
      res.render("movie/details", { movie, isOwner });
    } catch (err) {
      const message = getErrorMessage(err);
      res.render("movie/details", { error: message });
    }

});

router.get("/movies/:movieId/attach", isAuth, async (req, res) => {

  try {
    const movie = await movieService.getOne(req.params.movieId).lean();
    const casts = await castService.getAll().lean();
    res.render("movie/attach", { ...movie, casts });
  } catch (err) {
    const message = getErrorMessage(err);
    res.render("movie/attach", { error: message });
  }

});

router.post("/movies/:movieId/attach", isAuth, async (req, res) => {
    const castId = req.body.cast;

    try {      
      const movie = await movieService.getOne(req.params.movieId);
      movie.casts.push(castId);
      await movie.save();
      res.redirect(`/movies/${movie._id}/attach`);
    } catch (err) {
      const message = getErrorMessage(err);
      res.render("movie/attach", { error: message });
    }

});

router.get("/movies/:movieId/edit", isAuth, async (req, res) => {
   
  try {
    const movie = await movieService.getOne(req.params.movieId).lean();
    res.render("movie/edit", { movie });
  } catch (err) {
    const message = getErrorMessage(err);
    res.render("movie/edit", { error: message });
  }

});

router.post("/movies/:movieId/edit", isAuth, async (req, res) => {
    const editedMovie = req.body;

    try {
      await movieService.edit(req.params.movieId, editedMovie);
      res.redirect(`/movies/${req.params.movieId}`);
    } catch (err) {
      const message = getErrorMessage(err);
      res.render("movie/edit", { ...editedMovie , error: message });
    }
});

router.get("/movies/:movieId/delete", isAuth, async (req, res) => {
  try {
    await movieService.delete(req.params.movieId);
    res.redirect("/");
  } catch (err) {
    const message = getErrorMessage(err);
    res.render("movie/details", { error: message });
  }
});

module.exports = router;