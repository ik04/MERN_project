const express = require("express")
const router = express.Router()
const Subscriber = require("../models/Subscribers")

//CRUD
//READ
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
router.get("/:id", (req, res) => {
  res.send(req.params.id)
})

//CREATE
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedTo: req.body.subscribedTo,
  })
  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
//UPDATE
router.patch("/:id", (req, res) => {})
module.exports = router
