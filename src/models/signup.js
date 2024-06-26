const mongoose = require('mongoose');
const signupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
});

mongoose.models = {};
const Signup = mongoose.models.signup || mongoose.model('signup', signupSchema);  
export default Signup;