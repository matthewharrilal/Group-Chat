const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MessageSchema = new Schema ({
    content: {
        type: String,
        required: true
    },
    clapCount: {
        type: Number,
        default: 0
    },
    author: {
       type: Schema.Types.ObjectId,
       ref: "User",
       required: true
    }
})