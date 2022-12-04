import React,{Component} from 'react';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import './Events.css'
export default class EventsPage extends Component{
    state = {
        creating: false,
        events: [],
        isLoading: false,
        selectedEvent: null
      };
      startCreateEventHandler = () => {
        this.setState({ creating: false });
      };
      modalConfirmHandler = () => {
        this.setState({ creating: false });
       
        }

        modalCancelHandler = () => {
            this.setState({ creating: false, });
          };
    
    render(){
        return(
            <React.Fragment>
                   {(this.state.creating || this.state.selectedEvent) && <Backdrop />}
            {/* <Modal title="ADD EVENT" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>
                <p>Share your own event</p></Modal>    */}
                 <div className='events-control'>
                <p>Share your own events</p>
<button className='btn' onClick={this.startCreateEventHandler}>Create Event</button>
            </div>
            </React.Fragment>
           
           
        )
    }
}