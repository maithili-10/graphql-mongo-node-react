const Event=require('../../models/event');
const {user}=require('./merge');
const {transformEvent}=require('./merge');

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

    createEvent:(args)=>{
        
        const event=new Event({
            title:args.eventInput.title,
               description:args.eventInput.description,
               price:+args.eventInput.price,
                date:new Date(args.eventInput.date),
                creator:'638ad3150f755f747759b95f'
        });
        let createdEvent;
    return event.save()
    .then(result=>{
        createdEvent=transformEvent(result);
      return User.findById('638ad3150f755f747759b95f')
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