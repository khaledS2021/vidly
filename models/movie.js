const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');


const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 200
    }
    , genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        required: true,
        type: Number,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        required: true,
        type: Number,
        min: 0,
        max: 255
    }
}))

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(200).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
    };
    return Joi.validate(movie, schema);
}

exports.Movie = Movie
exports.validateMovie = validateMovie