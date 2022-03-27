const express = require('express');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const { Rental, validateRental } = require('../models/rental');
const router = express.Router();
const Fawn = require('fawn');

Fawn.init('mongodb://localhost/vidly')

router.get('/', async (req, res) => {
    const rentals = await Rental.find();
    res.send(rentals);
})

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id)
    if (!rental) return res.status(404).send('Rental With given id not found...')
    res.send(rental);
})

router.post('/', async (req, res) => {
    const { error } = validateRental(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid Movie...');
    if (movie.numberInStock == 0) return res.status(400).send('Movie not in stock...');

    const customer = await Customer.findById(req.body.customerId)
    if (!customer) return res.status(400).send('Invalid Customer...')

    const rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold,
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        }
    })
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();
    } catch (ex) {
        res.status(500).send('Something failed while saving rental')
    }
    res.send(rental);

})

module.exports = router