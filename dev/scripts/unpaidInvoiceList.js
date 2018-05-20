import React from 'react';


class Invoice extends React.Component {
    constructor() {
        super();
        this.state = { paymentDate: "" }
    }



    // componentDidMount() {
    //     const dbRef = firebase.database().ref('records');
    //     dbRef.on('value', (snapshot) => {
    //         console.log(snapshot.val());
    //         // when we set set (or re - set) the state of our component, we need to create a variable that will store the new state we want to introduce to our app
    //         const recordArray = [];
    //         // store our response inside of a data variable so that it's  easier to reference later
    //         const data = snapshot.val();
    //         for (let recordkey in data) {
    //             // console.log(recordkey);
    //             // console.log(data[recordkey]);
    //             data[recordkey].key = recordkey;
    //             recordArray.push(data[recordkey]);
    //         }
    //         console.log(recordArray)

    //         this.setState({
    //             paymentDate: ''
    //         })
    //     });
    // }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // handleSubmit(e) {
    //     e.preventDefault();
    //     const records = {
    //         paymentDate: this.state.paymentDate
    //     }

    //     const dbRef = firebase.database().ref('records');
    //     dbRef.push(records);

    //     this.setState({
    //         PaymentDate: '',
    //     });
    // }



    render() {
        return (
            <div>
                <form>
                    <ul>
                        <li className={this.props.paid === true ? 'paid' : null} >
                            <p>{this.props.clientName} - {this.props.amountDue} - {this.props.dateSent} </p>
                            <input type="text" placeholder="payment date" name="paymentDate" onChange={this.props.handleChange} value={this.state.paymentDate} />
                            <input type="submit" value="paid" onClick={() => this.props.paidInvoice(this.props.firebaseKey, this.props.paid, this.props.PaymentDate)} />
                        </li>
                    </ul>
                </form>
            </div>
        )
    }
}


export default Invoice;