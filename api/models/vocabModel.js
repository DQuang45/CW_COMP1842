const e = require('express');
const moogoose = require('mongoose');

const Schema = moogoose.Schema;

const VocabSchema = new Schema(
    {
        key: { 
            type: String, 
            required: 'Issue Code cannot be blank' 
        },
        value: { 
            type: String, 
            required: 'Response cannot be blank'
        },
        category: { 
            type: String, 
            required: 'Category cannot be blank'
        }
    },
    {collection: 'vocab'}
);

module.exports = moogoose.model('Vocab', VocabSchema);