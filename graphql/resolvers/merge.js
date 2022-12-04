const Event=require('../../models/event');
const User=require('../../models/user');
const transformEvent=(event)=>{
    return {
        ...event._doc,
        _id:event.id,
        date:new Date(event._doc.date).toISOString(),
        creator:user.bind(this,event.creator)

    }
}

const transformBooking=(booking)=>{
    return   {
           ...booking._doc,
           _id:booking.id,
           user:user.bind(this,booking._doc.user),
           event:singleEvent.bind(this,booking._doc.event),
           createdAt:new Date(booking._doc.createdAt).toISOString(),
           updatedAt:new Date(booking._doc.updatedAt).toISOString()
       };
   
   }
   

const events=eventIds=>{
    return Event.find({_id:{$in:eventIds}})
    .then(events=>{
        return events.map(event=>{

            return transformEvent(event);
        })
    })
    .catch(err=>{
        throw err;
    })
}

const singleEvent= async eventId=>{
    try{
const event=await Event.findById(eventId);
return transformEvent(event);
    }catch(err){
        throw err
    }
}

const user=userId=>{
    return User.findById(userId)
    .then(user=>{
        return{...user._doc,_id:user.id,createdEvents:events.bind(this,user._doc.createdEvents)}
    })
    .catch(err=>{
        throw err;
    })
}

//exports.user=user;
//exports.events=events;
//exports.singleEvent=singleEvent;

exports.transformEvent=transformEvent;
exports.transformBooking=transformBooking;