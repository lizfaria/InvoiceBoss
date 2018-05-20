import React from 'react';

class Invoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentDate: '' 
        }; 
    

    this.openTab = this.openTab.bind(this);
    this.renderPdf = this.renderPdf.bind(this);
    };

    openTab(e) {
        window.open(this.props.pdfUrl);
    };

    renderPdf(pdf) {
        let markup = [];
        if(this.props.pdfUrl !== undefined) {
            markup.push (
                <a href="#0" onClick={() => this.openTab()}>OpenPdf</a>
            );
        }
        return markup;
    };

    render() {
        return (
            <div>
                <form>
                <ul>
                    <li className = { this.props.paid === true ? 'paid' : null }>
                        <p> {this.props.clientName} - {this.props.amountDue} - {this.props.dateSent} </p>
                        {/* <input type="text" placeholder="payment date" name="paymentDate" onChange={this.handleChange} value={this.props.paymentDate}/> */}
                        
                        <div>
                        {this.renderPdf()}
                        </div>

                        <input type="submit" value="paid" onClick={() => this.props.paidInvoice(this.props.firebaseKey, this.props.paid)} />
                                        
                            <button onClick={() => this.props.removeInvoice(this.props.firebaseKey)}
                            >Remove X</button>
                    </li>
                </ul>
                </form>
            </div>
        )
    }
}
    

export default Invoice;