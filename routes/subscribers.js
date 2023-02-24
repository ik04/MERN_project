const express = require("express")
const router = express.Router()

//CRUD
//READ
router.get("/", (req, res) => {
  res.send("hello world")
})
router.get("/:id", (req, res) => {
  res.send(req.params.id)
})

//CREATE
router.post("/", (req, res) => {})
//UPDATE
router.patch("/:id", (req, res) => {})
module.exports = router
