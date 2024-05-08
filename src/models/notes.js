const mongoose = require('mongoose');
import Signup from './signup';

let notesSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Signup
    },
    author_name:{
        type:String
    },
    title: {
        type: String
    },
    tag: {
        type: [String],
        default: []
    },
    url: {
        type: String,
        required: true
    },
    share: {
        type: Number,
        default: 0
    },
    favorite: {
        type: Number,
        default: 0
    },
    like: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    comments: {
        type:String,  ///after creating  schema of add refrence of comments schema same for view and like
        //type:mongoose.Schema.Types.ObjectId
        //ref="Comment"
    }
},{timestamps:true});
mongoose.models = {};
const Notes = mongoose.models.notes || mongoose.model('notes', notesSchema);  
export default Notes;