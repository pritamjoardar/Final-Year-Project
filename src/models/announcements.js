const mongoose = require('mongoose');
const announcementSchema = new mongoose.Schema({
    announcement_text: {
        type: String,
        required: true,
    },
    publish_date: {
        type: Date,
        default: new Date()
    },
});
mongoose.models = {};
const Announcement = mongoose.model('announcement', announcementSchema);  
export default Announcement;