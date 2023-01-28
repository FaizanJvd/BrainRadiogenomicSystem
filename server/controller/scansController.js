const Scans = require("../model/ScansSchema");
module.exports = {
  addScans: async (req, res) => {
    try {
      const scans = new Scans(req.body);
      await scans.save();
      res.status(201).json({ message: "Scans Uploaded Successfully" });
    } catch (err) {
      res.status(422).json({ message: "Internal Server Error" });
    }
  },
  getScans: async (req, res) => {
    try {
      const scans = await Scans.findOne({ patient: req.body.patient });
      if (scans != null) {
        res.status(201).send(scans);
      } else {
        res.status(422).json({ message: "No Scans Available" });
      }
    } catch (err) {
      res.status(422).json({ message: "Internal Server Error" });
    }
  },
};
