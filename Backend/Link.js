const mongoose = require('mongoose');
const linkSchema = new mongoose.Schema({
    url: { type: String, required: true, unique:true},
    children: [
        {  
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Linkdata22313456'  
    }
    ]
});
const Linkdata22313456= mongoose.model('Linkdata22313456', linkSchema);
module.exports = Linkdata22313456;