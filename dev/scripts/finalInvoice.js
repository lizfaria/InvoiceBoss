import React from 'react';
import Invoice from './Invoice';
import App from './app';


const FinalInvoice = (props) => {
    return (
            <li className="paidInvoice__listItem">
                <p className="paragraph"> {props.clientName} - {props.amountDue} - {props.dateSent} </p>
                
            <a className="link" href="#0" onClick={() => this.openTab(this.props.currentPdf)}>OpenPdf</a>

            <button className="button" onClick={() => props.removeInvoice(props.firebaseKey)}
                >X</button>
            </li>
    )
};

// class FinalInvoice extends React.Component {
//     render() {
//         return (
//             <div>
//                 {animals.map((animal, index, orgArray) => {
//                     return (
//                         <div className="pet" key={index}>
//                             <p>{animal.name}</p>
//                             <img src={animal.picture} alt="" />
//                         </div>
//                     )
//                 })}
//             </div>
//         );
//     }
// }


export default FinalInvoice;