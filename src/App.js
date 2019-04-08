import React, { Component } from 'react';
import './App.css';
import Spinner from "./spinner"
class App extends Component {
    constructor(){
        super();
        this.state ={
            isLoading:true,
            users:[],
            error:null
        }
    }
    fetDataNew(){
//        fetch(`https://jsonplaceholder.typicode.com/users`)
//            .then(res => res.json())
//            .then(data => 
//              this.setState({
//                    users:data,
//                    isLoading:false
//              })
//            )
//            .catch(error => 
//                this.setState({
//                    error, isLoading:false
//                })
//            )
        const url = `https://ghibliapi.herokuapp.com/films`
        fetch(url)
        .then(res => {
            if(res.status === 200){
                console.log('Success');
                return res.json()
            }else if(res.status === 408){
                console.log("Went wrong");
                return this.setState({
                    errfound:true
                })
            }else if(res.status === 404){
                console.log("page not found");
                return this.setState({
                    errfound:true
                })
            }        
        })
        .then(data =>
            this.setState({
                users:data,
                isLoading:false
            })
        )
        .catch(error =>
            this.setState({
                isLoading:false
            })
        )
    }
    componentDidMount(){
        this.fetDataNew();
    }
  render() {
      const {error, isLoading, users, errfound} = this.state
      if(errfound){
          return(
           <p>Something went wrong</p>
          )
      }
    return (
      <div className="App">
       {error ? <p>error.message</p> : null}
        {!isLoading ? (
            users.map(user => {
                const {id, title, description, people} = user
                return (
                    <div key={id}>
                        <table cellspacing='10' cellpadding="10">
                            <tbody>
                                <tr>
                                <td>UserName:{id}</td>
                                <td>Name:{title}</td>
                                <td>Email:{description}</td>
                                <td>Email:{people}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            })
        ) : (
        <Spinner />
        )}
      </div>
    );
  }
}

export default App;
