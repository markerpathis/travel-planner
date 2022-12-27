const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Traveller, Location, Trip } = require("../../models");

// GET all travellers
router.get("/", async (req, res) => {
  try {
    const travellerData = await Traveller.findAll();
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const travellerData = await Traveller.findByPk(req.params.id, {
      include: [{ model: Location, as: "planned_trips" }],
    });

    if (!travellerData) {
      res.status(404).json({ message: "No traveller found for this id" });
    }
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newTraveller = await Traveller.create(req.body);
    res.status(200).json(newTraveller);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedTraveller = await Traveller.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedTraveller) {
      res.status(200).json(deletedTraveller);
    } else {
      res.status(404).json({ message: "No traveller found with this id" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
