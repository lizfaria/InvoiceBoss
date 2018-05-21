import React from 'react';


class Invoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        paymentDate: ''
        }; 
    

    this.openTab = this.openTab.bind(this);
    // this.renderPdf = this.renderPdf.bind(this);
    };

    openTab() {
        window.open(this.props.currentPdf);
    };

    // renderPdf(e) {
    //     let markup = [];
    //     if(this.props.currentPdf !== undefined) {
    //         markup.push (
    //             <a href="#0" onClick={() => this.openTab(this.props.currentPdf)}>OpenPdf</a>
    //         );
    //     } else (
    //             <p>no pdf</p>
    //     )
    //     return markup;
    // };

    render() {
        return (
            <div>
                <form>
                <ul>
                    <li className = { this.props.paid === true ? 'paid' : null }>
                        <p> {this.props.clientName} - {this.props.amountDue} - {this.props.dateSent} </p>

                        {/* <input type="text" placeholder="payment date" name="paymentDate" onChange= {this.props.handleChange(paymentDate)} value={this.props.paymentDate} /> */}
                        
                        <div>
                        <a href="#0" onClick={() => this.openTab(this.props.currentPdf)}>OPEN PDF</a>
                         {/* {this.renderPdf()} */}
                        </div>

                        <object data={this.props.currentPdf} type="pdf" width='400' height='400'></object>

                        <input type="submit" value="paid" onClick={() => this.props.paidInvoice(this.props.firebaseKey, this.props.paid, this.state.paymentDate)} />
                    
                        <button onClick={() => this.props.removeInvoice(this.props.firebaseKey)}
                        >X</button>
                    </li>
                </ul>
                </form>
            </div>
        )
    }
}
    

export default Invoice;