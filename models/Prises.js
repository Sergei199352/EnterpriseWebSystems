const mongoose =  require('mongoose');


const prisesSchema = new mongoose.Schema({
    username:{type:String},
    prise:{type:String},
    priseDate: {type: String},
    priseTime:{type:String},
    priseCategory:{
        type:String,
        enum:['Car', 'Phone', 'Ticket', 'Other']
    },
    draw:{type:Boolean, default:false}
});

const Prises = mongoose.model('Prise', prisesSchema);

module.exports = Prises;
