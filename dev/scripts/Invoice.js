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

    openTab(e) {
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
                
                    <li id="recordz" className = { this.props.paid === true ? 'paid' : null }>
                        <h3 className="client-name"> {this.props.clientName} </h3>
                        <h3 className="amount-due"> {this.props.amountDue} </h3>
                        <p className="paragraph date-sent"> {this.props.dateSent} </p>

                        {/* <input type="text" placeholder="payment date" name="paymentDate" onChange= {this.props.handleChange(paymentDate)} value={this.props.paymentDate} /> */}
                        
                        
                        <a className="attachment" href="#0" onClick={() => this.openTab(this.props.currentPdf)}>
                        <img src="public/images/attach_file.png" alt=""/>
                        </a>
                         {/* {this.renderPdf()} */}
                        

                        {/* <object data={this.props.currentPdf} type="pdf" width='400' height='100'></object> */}

                        <input className="paid-button" type="submit" value="paid" onClick={() => this.props.paidInvoice(this.props.firebaseKey, this.props.paid, this.state.paymentDate)} />
                    
                        <button className="remove-button" onClick={() => this.props.removeInvoice(this.props.firebaseKey)}
                        >x</button>
                    </li>
                
                </form>
            </div>
        )
    }
}
    

export default Invoice;