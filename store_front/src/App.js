import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        data: []
              }
      }
      componentDidMount(){
        //Get all users details in bootstrap table
        axios.get('/api/products').then(res => 
        {
        //Storing users detail in state array object
        this.setState({data: res.data});
      
           }); 
        
        }
        render() {
        return (
     

          <div className="maincontainer">
            
            
           
            <table>
              <thead>
              <h1>Welcome to generic store</h1>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
              {this.state.data.map((result) => {
                return (
                 
                     <tr>
                      
                      <td>{result.name}</td>

                      <td>{result.price}</td>
                  
                      
                    </tr>
                 
                )
              })}
               
                
              </tbody>
            </table>
            
                
  
         
          </div>
          
    )
    };
    }
    export default App;