const mongoose =  require('mongoose');


const prisesSchema = new mongoose.Schema({
    username:{type:String},
    prise:{type:String},
    priseDate: {type: String},
    priseCategory:{
        type:String,
        enum:['Car', 'Phone', 'Ticket', 'Other']
    }
});

const Tickets = mongoose.model('Prisest', prisesSchema);

module.exports = Prises;
