"use strict";
const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.json(['😀', '😳', '🙄']);
});
module.exports = router;
//# sourceMappingURL=emojis.js.map