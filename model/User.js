// Use Mongoose to create schema and stamp out model
// Import mongoos, using destructuring to unpack schema and model method

const { Schema, model} = require( "mongoose");

//define the shape of our data

const userSchema = new Schema(
    {
        userName: {
            type: String,
            uniqe: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            uniqe: true,
            required: [true, "Please fill a valid email address"],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
        },
        thoughts: [

            {
                // Array of _id values referenceing the Thought model
                type: Schema.Types.ObjectId,
                ref: "thought"
            }
        ],
        friends: [

            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//Create a virtual called (friendCount) that retrieves the length of the user's (friends) array field on query.

userSchema
    .virtual('friendCount')
    // Getter
    .get(function() {
        return this.friends.length;
    });

    const User = model('user', userSchema);
    
    module.exports = User;
