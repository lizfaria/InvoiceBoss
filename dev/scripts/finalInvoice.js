import React from 'react';
import Invoice from './Invoice';
import App from './app';

// class FinalInvoice extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
          
    //     }
    // }
     // render ()
const FinalInvoice = (props) => {

        return (
                <li id="paidInvoices">
                    <h3 className="client-name"> {props.clientName} </h3>
                    <h3 className="amount-due"> {props.amountDue} </h3>
                    <p className="date-sent">{props.dateSent} </p>
                        
                    <a className="attachment" href="#0" onClick={() => props.openTab(props.currentPdf)}>
                        <img src="public/images/attach_file.png" alt="" />
                    </a>

                    <button className="remove-button" onClick={() => props.removeInvoice(props.firebaseKey)}
                        >X</button>
                </li>
        
        )
    }



export default FinalInvoice;