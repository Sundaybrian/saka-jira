const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "API - 👋🌎🌍🌏",
    });
});

router.use("/accounts", require("./auth/auth.routes"));
router.use(
    "/subscriptionType",
    require("./subcriptionType/subscriptionType.routes")
);

module.exports = router;
