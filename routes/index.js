const router = require("express").Router();
const apiRoutes = require("./api/travellerRoutes");

router.use("/api", apiRoutes);

module.exports = router;
