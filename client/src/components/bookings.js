import React, { Component } from 'react';
import setAuthToken from '../authToken';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
class bookings extends Component {
  
    state={
        books:[],
        length:0
    }
    
    componentDidMount(){
        let uid= this.props.location.state.id;
        //console.log(uid);
        //console.log(sendData);
        fetch('/users/bookdata/'+uid,{
            method:"GET",
            headers:{
               "Content-Type":"application/json"
            }
        }).then(r=>r.json()).then(res=>{
             //console.log(res + typeof(res));
             console.log(res);
            let x= res.bookdata.length;
            x=x/2;
            console.log(x);
             this.setState({
                 ...this.state,
                 books:res.bookdata,
                 length:x
             })
             /*console.log(res);
             console.log(this.state.books);*/


        }).catch(err=>{
             console.log(err);
        })
    }

    signOuthandler = () => {
        // Remove token from local storage
        localStorage.removeItem("jwtToken");
        // Remove auth header for future requests
        setAuthToken(false);
        // Set current user to empty object {} which will set isAuthenticated to false
        this.props.location.state.id='';
        this.props.history.push('/login');
      };

    render() {
       
      if(!this.props.location.state)
      {
          this.props.history.push('/login');
          return(<h1>wtf</h1>)
      }
      else
        {
        if((this.props.location.state.token!==axios.defaults.headers.common["Authorization"]))
        {localStorage.removeItem("jwtToken");
          setAuthToken(false);
          this.props.history.push('/login');
        }

        let dArray= this.state.books.map(el=>{
            return( 
            <div  key={el.id} >
             <div >
               <div className="card">
                 <span className="card-title center" style={{color:'red'}}>{el.name}</span>
               <div className="card-content">
                   <p>Your appointment with Dr.{el.name} is confirmed.
                       Please visit the doctor on this date and time {el.time}.
                      You can contact him with this number {el.phone}</p>
                 </div>
                
               </div>
             </div>
           </div>
           )
            });
            console.log(dArray.length);
        return(
          <div >
              <nav>
                <div class="nav-wrapper">
        
                <ul id="nav-mobile" class="left ">
         
               <li><a onClick={this.signOuthandler} style={{fontSize:'20px'}}>SIGN OUT</a></li>
          
              </ul>
            </div>
            </nav>
           <h2 style={{color:'blue',alignItems:'center'}}>Here are your appointments :</h2>
           <div style={{display:'flex',width:'70%'}} >
           <div className="row" style={{ flex:'1',}}>
           <div className="col s7 offset-s7" >{dArray.slice(0,this.state.length)}</div>
          </div>
          <div className="row" style={{flex:'1'}}>
         <div className="col s7 offset-s7" >{dArray.slice(this.state.length)}</div>
         </div>
         </div>

          </div>
        )
        }
    }
}

export default withRouter(bookings);