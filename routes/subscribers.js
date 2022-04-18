const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');
// configure RESTful endpoints

// get all users
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// get one user
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber);
});
// create a new user 
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    });

    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// update one user
// put updates all the information for the
// subscriber, not just what is changed
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name;
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }

    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// delete one user
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove();
        res.json({ message: "deleted subscriber" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get a subscriber given the id
async function getSubscriber(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannot find subscriber' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.subscriber = subscriber;
    next();
}

module.exports = router;