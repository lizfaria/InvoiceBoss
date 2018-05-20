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
  storageBucket: "",
  messagingSenderId: "414613297676"
};

firebase.initializeApp(config);

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      clientName: '',
      amountDue: '',
      dateSent: '',
      files: '',
      file:'',
      selectedFile: '',
      uploads: '',
      records: [],
      paidRecords:[] 
  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.paidInvoice = this.paidInvoice.bind(this);
    this.handleFileUpload = this.handleFileUpload(this);
    this.handleFileSelected = this.handleFileSelected(this);
    
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
    uploads: this.state.uploads,
    paid: false
  };

 


  const dbRef = firebase.database().ref('records');
  dbRef.push(records);

  
    // const filename = selectedFile.name;
    // const Ref = firstorageebase.storage.ref('/invoicepdfs' + filename);
    // var uploadTask = storageRef.put(selectedFile)



  this.setState({
    clientName: '',
    amountDue: '',
    dateSent: '',
    uploads: ''
  });


  console.log('clicked')
};




handleChange(e) {
    // update the state that matches the input user types in
    // if the value in `e.target.name` is ===  lientName, the expression [e.target.name]: e.target.value will update the  clientName property in our state
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFileSelected(e) {
    this.setState({
      value: e.target.value
    }); 
  }

  handleFileUpload(e) {

    const file = this.file.files[0];
    console.log(this.file)
    const pdfURL = this.state.value;
    const storageRef = firebase.storage().ref('uploads');
    const pdf = storageRef.child(this.file.files[0].name);
    pdf.put(file).then((snapshot) => {
      this.setState({
        pdfURL: url
      });
    })
    
  }

  

  paidInvoice(keyToUpdate, paid) {
    firebase.database().ref(`records/${keyToUpdate}`)
    .update({
      paid: !paid
    })
  }


render() {
  return (
    <div>
      <h1>Get Money</h1>
      <form action="#" onSubmit={this.handleFileUpload}>
        <input type="file" name="uploads" ref={(ref)=> { this.file = ref }} onChange={this.handleFileSelected} />
        <input type="submit" value="upload"/>
      </form>
      <form action="" onSubmit={this.handleSubmit}>
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
            uploads={recordItem.uploads}
            firebaseKey={recordItem.key}
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
            paidInvoice={this.paidInvoice}
            paymentDate={this.paymentDate}
            />
        })}
      </ul>

    </div>
  )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
