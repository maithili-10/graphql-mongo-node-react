const Event=require('../../models/event');
const {user}=require('./merge');
const {transformEvent}=require('./merge');
const User=require('../../models/user')

module.exports={
    events:()=>{
     return Event.find()
     .then(events=>{
    
    return events.map(event=>{
       
        return transformEvent(event);
    });
    
}).catch(err=>{
    throw err;
});

    },

    createEvent:async (args,req)=>{
        if(!req.isAuth){
            throw new Error('unauthenticated!')
        }
        const event=new Event({
            title:args.eventInput.title,
               description:args.eventInput.description,
               price:+args.eventInput.price,
                date:new Date(args.eventInput.date),
                creator:req.userId
        });
        let createdEvent;
    return event.save()
    .then(result=>{
        createdEvent=transformEvent(result);
      return User.findById(req.userId)
            })
        .then(user=>{
            if(!user){
                throw new Error('user not found')
               }
               user.createdEvents.push(event);
               return user.save();
        }) 
        .then(result=>{
            return createdEvent;
        })
        
        
        .catch(err=>{
            console.log(err);
            throw err;
        });
        return event;
    },

}