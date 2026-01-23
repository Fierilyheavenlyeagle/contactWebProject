const router = require("express").Router();
const contacts = require("./contactsRoute");

router.use("/contactAgenda", contacts);

module.exports = router;
