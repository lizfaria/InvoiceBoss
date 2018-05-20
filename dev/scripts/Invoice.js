import React from 'react';


class Invoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentDate: '' 
        };
      
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
        console.log(e.target.value)
        console.log(this)
        this.setState ({
            [e.target.name]: e.target.value
        })
        // update the state that matches the input user types in
        // if the value in `e.target.name` is === user, the expression [e.target.name]: e.target.value will update the user property in our state
        // this.setState({
        //     [e.target.name]: e.target.value
        // }); 
    };

    // handleChange(e) {
    //     setState({
    //         [e.target.name]: this.e.target.value
    //     });

    // handleSubmit(e) {
    //         e.preventDefault();
    //         const records = {
    //             clientName: this.state.clientName,
    //             amountDue: this.state.amountDue,
    //             dateSent: this.state.dateSent,
    //             paid: false
    //         };

    //         const dbRef = firebase.database().ref('records');
    //         dbRef.push(records);

            

    //         console.log('clicked')
    //     };
    //     console.log(e.target.value)
    

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
                    <li className = { this.props.paid === true ? 'paid' : null } >
                        <p> {this.props.clientName} - {this.props.amountDue} - {this.props.dateSent} - {this.props.uploads} </p>
                        {/* <input type="text" placeholder="payment date" name="paymentDate" onChange={this.handleChange} value={this.props.paymentDate}/> */}
                        <input type="submit" value="paid" onClick={() => this.props.paidInvoice(this.props.firebaseKey, this.props.paid)} />
                    </li>
                </ul>
                </form>
            </div>
        )
    }
}
    

export default Invoice;