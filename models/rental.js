const mongoose = require('mongoose');
const Joi = require('joi');

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 4,
                maxlength: 200
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50,
            },
            isGold: {
                type: Boolean,
                default: false
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255,
                trim: true,
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            },
        }),
        required: true,
    },
    dateOut: {
        type: Date,
        default: Date.now,
        required: true,
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}))

function validateRental(rental) {
    const schema = {
        customerId: Joi.objectID().required(),
        movieId: Joi.objectID().required()
    }
    return Joi.validate(rental, schema);
}

exports.Rental = Rental
exports.validateRental = validateRental