const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title : {
        type : String,
        required:[true, 'Please enter Title']
    },
    content : {
        type : String,
        required : [true, 'Please enter content']
    }
});

module.exports = mongoose.model("Note", NoteSchema);