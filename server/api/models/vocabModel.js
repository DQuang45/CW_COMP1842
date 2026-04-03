const e = require('express');
const moogoose = require('mongoose');

const Schema = moogoose.Schema;

const VocabSchema = new Schema(
    {
        english: { 
            type: String, 
            required: 'English word cannot be blank' 
        },
        german: { 
            type: String, 
            required: 'German word cannot be blank'
        },
    },
    {collection: 'vocab'}
);

module.exports = moogoose.model('Vocab', VocabSchema);