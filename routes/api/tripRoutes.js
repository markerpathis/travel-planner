const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Trip } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newTrip = await Trip.create(req.body);
    res.status(200).json(newTrip);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedTrip = await Trip.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedTrip) {
      res.status(200).json(deletedTrip);
    } else {
      res.status(404).json({ message: "No trip found with this id" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
