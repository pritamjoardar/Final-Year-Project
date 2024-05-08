const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    tag: {
        type: String,
        required: true,
    },

    url: {
        type: String,
        required: true
    },
    
    shere: {
        type: Number,
        required: true
    },
});

mongoose.models = {};
const Upload = mongoose.models.signup || mongoose.model('upload', uploadSchema);  
export default Upload;