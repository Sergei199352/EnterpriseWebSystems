const mongoose =  require('mongoose');


const ticketSchema = new mongoose.Schema({
    username:{type:String},
    prise:{type:String},
    ticketId: {type: String},
    priseDate: {type: String},
    priseCategory:{
        type:String,
        enum:['Car', 'Phone', 'Ticket', 'Other']
    },
    priseId:{type:String},
    email:{
        type:String,
        default:'No email'
    
    },
    winner:{
        type:Boolean,
        default:false
    
    },
    priseActive:{
        type:Boolean,
        default:true
    
    }
});

const Tickets = mongoose.model('Ticket', ticketSchema);

module.exports = Tickets;
