// on page load: render 1. h1 2.form with clientname/date/hours/amountdue/ text inputs and submit input & form 3. h2s - unpaid, and paid
// submit input has event handler which saves data to page in a list under unpaid section
// saved li has a new text input for date paid and submit. When this is submitted, the li is moved to paid section and user generated input is saved as a p
// when unpaid li text input is submitted and paid===true, input is saved as a p and button dissapears.


import React from 'react';
import ReactDOM from 'react-dom';
import Invoice from './Invoice';
import FinalInvoice from './finalInvoice';
import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDd4aY-M0s0Nzar4G5JFv_OUaPfW20gPMI",
    authDomain: "invoiceboss.firebaseapp.com",
    databaseURL: "https://invoiceboss.firebaseio.com",
    projectId: "invoiceboss",
    storageBucket: "invoiceboss.appspot.com",
    messagingSenderId: "414613297676"
};

firebase.initializeApp(config);

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            clientName: '',
            amountDue: '',
            dateSent: '',
            // pdfUrl:'',
            records: [],
            paidRecords: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.paidInvoice = this.paidInvoice.bind(this);
        this.removeInvoice = this.removeInvoice.bind(this);
        this.showCreate = this.showCreate.bind(this);
    }

    componentDidMount() {
        const dbRef = firebase.database().ref('records');
        dbRef.on('value', (snapshot) => {
            // console.log(snapshot.val());
            // when we set set (or re - set) the state of our component, we need to create a variable that will store the new state we want to introduce to our app
            const recordArray = [];
            // store our response inside of a data variable so that it's  easier to reference later
            const data = snapshot.val();

            for (let recordkey in data) {
                // console.log(recordkey);
                // console.log(data[recordkey]);
                data[recordkey].key = recordkey;
                recordArray.push(data[recordkey]);

            }
            // console.log(recordArray)

            const paid = recordArray.filter((record) => {
                return record.paid === true;
            })

            const unpaid = recordArray.filter((record) => {
                return record.paid === false;
            })

            this.setState({
                records: unpaid,
                paidRecords: paid
            })

        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const records = {
            clientName: this.state.clientName,
            amountDue: this.state.amountDue,
            dateSent: this.state.dateSent,
            pdfUrl: this.state.pdfUrl,
            paid: false
        };

        const dbRef = firebase.database().ref('records');
        dbRef.push(records);

        this.setState({
            clientName: '',
            amountDue: '',
            dateSent: '',
            // pdfUrl:''
        });

        // PDF UPLOAD
        const file = this.file.files[0];
        console.log(file)
        const pdfUrl = this.state.value;
        const storageRef = firebase.storage().ref('uploads');
        const pdfUrl = storageRef.child(this.file.files[0].name);

        pdfUrl.put(file).then((snapshot) => {
            pdfUrl.getDownloadURL().then((url) => {
                console.log(url)
                this.setState({
                    pdfUrl: url
                })
            })
        });

    };

    handleChange(e) {
        // update the state that matches the input user types in
        // if the value in `e.target.name` is ===  lientName, the expression [e.target.name]: e.target.value will update the  clientName property in our state
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    removeInvoice(keyToRemove) {
        // in order to remove todo we need to know where in the db it lives
        // using the parameter key `keyToRemove` we create a refernce to that location and call the `.remove()` method to it 
        firebase.database().ref(`records/${keyToRemove}`).remove();
    }

    paidInvoice(keyToUpdate, paid) {
        firebase.database().ref(`records/${keyToUpdate}`)
            .update({
                paid: !paid
            })
    }

    showCreate(e) {
        e.preventDefault();
        this.overlay.classList.toggle('show');
        this.createUserModal.classList.toggle('show');
    }

    createuser(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <header>
                    <h1>Get Money</h1>
                    <nav>
                        <a href="" onClick={this.showCreate}>Create Account</a>
                    </nav>
                </header>

                <div className="overlay" ref={ref => this.overlay = ref}></div>

                <form action="" onSubmit={this.handleSubmit}>
                    <input type="file" name="pdfUrl" ref={(ref) => { this.file = ref }} onChange={this.handleChange} />
                    {/* <input type="submit" value="submit" /> */}

                    <input type="text" name="clientName" onChange={this.handleChange} placeholder="Client Name" value={this.state.clientName} />
                    <input type="text" name="amountDue" onChange={this.handleChange} placeholder="Amount Due" value={this.state.amountDue} />
                    <input type="text" name="dateSent" onChange={this.handleChange} placeholder="Date Invoice sent" value={this.state.dateSent} />
                    <input type="submit" value="add to records" />
                </form>

                <h2>Unpaid Invoices</h2>
                <ul>
                    {/* `.map()` method iterates over records, and for each one of them, return record item componenet. */}
                    {this.state.records.map((recordItem) => {
                        // here we pass and props to our TodoItem component anything that we want 
                        return <Invoice
                            key={recordItem.key}
                            dateSent={recordItem.dateSent}
                            clientName={recordItem.clientName}
                            amountDue={recordItem.amountDue}
                            pdfUrl={recordItem.pdfUrl}
                            firebaseKey={recordItem.key}
                            removeInvoice={this.removeInvoice}
                            paidInvoice={this.paidInvoice}
                            paymentDate={this.paymentDate} />
                    })}
                </ul>
                <h2>Paid Invoices</h2>
                <ul>
                    {/* `.map()` method iterates over records, and for each one of them, return record item componenet. */}
                    {this.state.paidRecords.map((recordItem) => {
                        // here we pass and props to our TodoItem component anything that we want 
                        return <FinalInvoice
                            key={recordItem.key}
                            dateSent={recordItem.dateSent}
                            clientName={recordItem.clientName}
                            amountDue={recordItem.amountDue}
                            uploads={recordItem.uploads}
                            firebaseKey={recordItem.key}
                            removeInvoice={this.removeInvoice}
                            paidInvoice={this.paidInvoice}
                            paymentDate={this.paymentDate}
                        />
                    })}
                </ul>

                <div className="createUserModal modal" ref={ref => this.createUserModal = ref}>
                    <div className="close">
                        <i className="fa fa-times"></i>
                    </div>
                    <form action="" onSubmit={this.createUser}>
                        <div>
                            <label htmlFor="createEmail">Email:</label>
                            <input type="text" name="createEmail" ref={ref => this.createEmail = ref} />
                        </div>
                        <div>
                            <label htmlFor="createPassword">Password:</label>
                            <input type="password" name="password" ref={ref => this.createPassword = ref} />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input type="password" name="confirmPassword" ref={ref => this.confirmPassword = ref} />
                        </div>
                        <input type="submit" value="Create" />
                    </form>
                </div>
            </div>
        )
    }
}

------

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
        window.open(this.props.pdfUrl);
    };

    // renderPdf() {
    //     let markup = [];
    //     if(this.props.pdfUrl !== undefined) {
    //         markup.push (
    //             <a href="#0" onClick={() => this.openTab(this.props.pdfUrl)}>OpenPdf</a>
    //         );
    //     }
    //     return markup;
    // };

    render() {
        return (
            <div>
                <form>
                    <ul>
                        <li className={this.props.paid === true ? 'paid' : null}>
                            <p> {this.props.clientName} - {this.props.amountDue} - {this.props.dateSent} </p>
                            {/* <input type="text" placeholder="payment date" name="paymentDate" onChange={this.handleChange} value={this.props.paymentDate}/> */}

                            <div>
                                <a href="#0" onClick={() => this.openTab(this.props.pdfUrl)}>OpenPdf</a>
                                {/* {this.renderPdf()} */}
                            </div>

                            <input type="submit" value="paid" onClick={() => this.props.paidInvoice(this.props.firebaseKey, this.props.paid)} />

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

ReactDOM.render(<App />, document.getElementById('app'));
