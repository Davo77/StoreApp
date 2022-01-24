import React from 'react';
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';
import './App.css';


class Store extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      data2: {},
      date: ""
    }
  }



  componentDidMount() {
    //Hardcoded user id to save time
    let cusId = 1;
    this.getDate();

    axios.all([
      axios.get('api/products'),
      axios.get('api/customersales/' + cusId)
    ]).then(axios.spread((res, salesRes) => {
      this.setState({ data: res.data, data2: salesRes.data });
      console.log('SALES RES:');
    }));

  }

  //set todays date for seasonal discounts
  getDate = () => {
    let today = new Date()
    let month = today.getMonth() + 1,
      date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    this.setState({ date })
    this.setState({ month })
  }


  render() {
    let today = new Date()
    let month = today.getMonth() + 1;

    //Determine the type of discount
    let discount;
    if (month === 2 || 6) {
      console.log('MONTH IN FUNC(): ' + month);
      discount = 'seasonal'
    } if (this.state.data2.amount_of_sales >= 100) {
      console.log('SALES STATE:' + this.state.data2.amount_of_sales);
      discount = 'amount'
    } else {
      discount = 'noDiscount'
    }

    //Case for different types of discounts
    let component;
    let discType;
    switch (discount) {
      case 'seasonal':
        component = 0.9;
        discType = 'Seasonal';
        break;
      case 'amount':
        component = 0.85;
        discType = 'Amount of sales discount'
        break;
      default:
        component = 1;
        discType = 'No Discount'

        console.log('Component END: ' + component);
    }

    return (
      <div className="maincontainer">
        <p>Today is: {this.state.date}</p>

        <p>Your amount of previous sales is: {this.state.data2.amount_of_sales}</p>

        <h1>Welcome to generic store</h1>
        <table>
          <thead>

            <tr>
              <th>Product</th>
              <th> Price</th>
              <th>Discount type</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((result) => {
              return (
                <tr key={result.id}>
                  <td> {result.name} </td>
                  <td >
                    <font color="green">
                      <CurrencyFormat value={result.price * component} displayType={'text'} thousandSeparator={true} suffix={'€'} fixedDecimalScale={true} decimalScale={2} />
                    </font>
                  </td>
                  <td> {discType} </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <p>*Seasonal discounts are valid on January and June</p>
      </div>
    )
  };
}



export default Store;