const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();
const { Genre, validateGenre } = require('../models/genre');

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres)

})

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)
    if (!genre) return res.status(404).send("This Genre is not found")
    res.send(genre)
})

router.post('/', auth, async (req, res) => {

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const genre = new Genre({
        name: req.body.name
    });
    await genre.save();
    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!genre) return res.status(404).send("This Genre with given ID was not found");
    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)

    if (!genre) return res.status(404).send("This Genre with given ID was not found");

    res.send(genre);
});



module.exports = router;