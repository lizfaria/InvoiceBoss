import React from 'react';
import Invoice from './Invoice';


const FinalInvoice = (props) => {
    return (
        <div>
            <ul>
                <li>
                    <p> {props.clientName} - {props.amountDue} - {props.dateSent} - {props.paymentDate} </p>
                </li>
            </ul>
        </div>
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