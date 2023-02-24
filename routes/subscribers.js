const express = require("express")
const router = express.Router()
const Subscriber = require("../models/Subscribers")

//mongo not working properly with postman

//CRUD
//READ
router.use(express.json())
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get("/:id", getSub, (req, res) => {
  res.send(res.subscriber)
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
    res.status(400).json({ message: error.message })
  }
})
//UPDATE
router.patch("/:id", getSub, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name
  }
  if (req.body.subscribedTo != null) {
    res.subscriber.subscribedTo = req.body.subscribedTo
  }
  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete("/:id", getSub, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.json({ message: "sub deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//middleware
async function getSub(req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      res.status(404).json({ message: "Subscriber not found" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
  res.subscriber = subscriber
  next()
}

module.exports = router
