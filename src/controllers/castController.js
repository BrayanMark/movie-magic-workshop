const router = require("express").Router();
const { isAuth } = require("../middleware/authMiddleware");
const castService = require("../services/castService");

const { getErrorMessage } = require("../utils/errorUtils");
router.get("/create", (req, res) => {
    res.render("cast/create");
});

router.post("/create", isAuth, async (req, res) => {
    
    const castData = req.body;

        try {
        await castService.create(castData);
        res.redirect("/");
        } catch (err) {
        const message = getErrorMessage(err);
        res.render("cast/create", { ...castData, error: message });
    }
});

module.exports = router;
