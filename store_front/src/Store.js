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
      data3: {},
      date: ""
    }
  }

  componentDidMount() {
    //Hardcoded user id to save time
    let user_name = localStorage.getItem('user')
    let cusId = 1;
    if (user_name === 'customer2') {
      cusId = 2;
    }

    this.getDate();

    axios.all([
      axios.get('api/products'),
      axios.get('api/customersales/' + cusId),
      axios.get('api/special/' + cusId)
    ]).then(axios.spread((res, salesRes, specialRes) => {
      this.setState({
        data: res.data,
        data2: salesRes.data,
        data3: specialRes.data
      });
    }));

  }
  /*
   decode = jwt.verify(token, "your secret or key");  
    let userId = decode.id  
    console.log(userId)  
  */
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

    let special_valid = this.state.data2.user_id;
    let seasonFactor = 0.9;
    let amountFactor = 0.85;
    let specialFactor = 0.7;
    //Determine the type of discount
    let discount;
    const months = month === 1 || month === 6;
    if (months) {
      discount = 'seasonal'
    } if (this.state.data2.amount_of_sales >= 100) {
      discount = 'amount'
      //In case both discounts apply, validate higher discount  
    } if (this.state.data2.amount_of_sales >= 100 && months) {
      discount = 'amount'
    } else if (special_valid && specialFactor < amountFactor && specialFactor < seasonFactor) {
      discount = 'special'
      specialFactor = this.state.data2.price_factor;
    }


    //Case for different types of discounts

    let component;
    let discType;
    switch (discount) {
      case 'seasonal':
        component = seasonFactor;
        discType = 'Seasonal (10%)';
        break;
      case 'amount':
        component = amountFactor;
        discType = 'Amount of sales discount (15%)'
        break;
      case 'special':
        component = specialFactor;
        discType = 'Special Discount (30%)'
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
              <th>Normal Price</th>
              <th>Reduced Price</th>
              <th>Discount type</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((result) => {
              return (
                <tr key={result.id}>
                  <td> {result.name} </td>
                  <td><CurrencyFormat value={result.price} displayType={'text'} thousandSeparator={true} suffix={'€'} fixedDecimalScale={true} decimalScale={2} /></td>
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

        <p>*Seasonal discounts are valid on January and June (10%)</p>
        <p>*If you have more that 100 previous sales, Amount of sales discount is valid (15%)</p>
        <p>*Special discount is set to (30%)</p>
        <p>*Highest discount applies </p>
      </div>
    )
  };
}



export default Store;