const router = require("express").Router();

//router.get('/',(req,res) => (res.send('Hello world')));

router.use("/contacts", require("./contactsRoute"));

module.exports = router;
