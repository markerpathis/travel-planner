const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Trip } = require("../../models");

router.post("/", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
