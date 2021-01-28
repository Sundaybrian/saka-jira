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
router.use("/jobStatus", require("./jobStatus/jobStatus.routes"));
router.use("/industry", require("./industry/industry.routes"));

module.exports = router;
