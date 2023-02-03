//deconstruct Schema, model from mongoose module
//import objectId to use with the _id filed so that i can create a new unique id.

const {Schema, model} = require('mongoose')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: String,
            required: true
        },
        reactionBody: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAt => moment(createdAt).format("MM/DD/YYYY hh:mm:ss")
        }
    });

reactionSchema.set('toJSON',
    { getter: true, virtuals: true});

reactionSchema.set('toObject', 
    { getter: true, virtuals: true});


const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLenght: 500
        },
        createdAt: {
                type: Date,
                default: Date.now,
                get: createdAt => moment(createdAt).format("MM/DD/YYYY hh:mm:ss")
        },

        userName: {
            type: String,
            required: true
        },
        reactions:[reactionSchema]
    },  
);

    thoughtSchema.set('toJSON',
        { getter: true, virtuals: true});
    
    thoughtSchema.set('toObject', 
        { getter: true, virtuals: true});

        
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;