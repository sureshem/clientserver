import React, { Component } from 'react';
import './App.css';

class App extends Component {
   constructor(){
       super();
       this.state ={
           addClas:false,
           items:['One','Two','Three'],
           isLoading:true,
           users:[],
           error:null
       }
   }
    addclsClick(){
        this.setState({addClas:!this.state.addClas})
    }
    fetchdata(){
        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                if(res.status === 200){
                    console.log("Success");
                    return res.json();
                }else if(res.status === 408){
                    console.log("Somthing went wrong");
                    return this.setState({ requestFailed: true })
                }
            })
              .then(data => 
                this.setState({
                    users:data,
                    isLoading:false
                })     
              )
           .catch((error) => {
            this.setState({ requestFailed: true })
        })
    console.log("end call api")
    }
    componentDidMount(){
        this.fetchdata();
    }
  render() {
    let adcls = ['inactive'];
    if(this.state.addClas){
        adcls.push('active')
    }
      const { isLoading, requestFailed } = this.state;
      if(requestFailed){
        return( 
            <div className="errorContainer">
                <a className="errorMessage">Opss.. Something went wrong :(</a>
            </div>
        )
    }
    const {users,error} = this.state
    return (
      <div className="App">
       <p className={adcls.join(' ')} onClick={this.addclsClick.bind(this)}>Toggle</p>
        <ul>
        {this.state.items.map((item,index) => 
             <li key={index}>
                {item}
             </li>
            )}
        </ul>
        {error ? <p>error.message</p> : null}
         {!isLoading ? (
            users.map(user => {
                const {username, email, name, website, phone} = user
                return (
                    <ul key = {username}>
                        <li>Username:{username}</li>
                        <li>name:{name}</li>
                        <li>email:{email}</li>
                        <li>phone:{phone}</li>
                        <li>website:{website}</li>
                    </ul>
                )
        })
        ) : (
            <div className="loading">Loading</div>
        )}
      </div>
    );
  }
}

export default App;
