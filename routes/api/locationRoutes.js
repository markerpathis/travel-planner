const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Location, Traveller } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const locaionData = await Location.findAll();
    res.status(200).json(locaionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const locaionData = await Location.findByPk(req.params.id, {
      include: [{ model: Traveller, as: "location_travellers" }],
    });

    if (!locaionData) {
      res.status(404).json({ message: "No location found for this id" });
    }
    res.status(200).json(locaionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newLocation = await Location.create(req.body);
    res.status(200).json(newLocation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedLocation = await Location.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedLocation) {
      res.status(200).json(deletedLocation);
    } else {
      res.status(404).json({ message: "No location found with this id" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
