const express = require("express");
const router = express.Router();
const model = require("../model/authschema");

const verification = require("../controller/auth");

//  Post api
// router.post("/post", verification.SMS);
// Patch api
// router.patch("/patch/:id", verification.patchplan);

module.exports = router;
