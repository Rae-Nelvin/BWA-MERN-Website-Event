const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let categorySchema = Schema(
    {
        name: {
            type: String,
            minLength: [3, 'Name must be at least 3 characters long'],
            maxLength: [20, 'Name must be at most 20 characters long'],
            required: [true, 'Name is required'],
        },
    },
    { timestamps: true }
);

module.exports = model('Category', categorySchema);