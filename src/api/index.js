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
router.use("/skill", require("./skill/skill.routes"));
router.use(
    "/proposalStatus",
    require("./proposalStatus/proposalStatus.routes")
);
router.use("/paymentType", require("./paymentType/paymentType.routes"));
router.use("/freelancer", require("./freelancer/freelancer.routes"));

module.exports = router;
