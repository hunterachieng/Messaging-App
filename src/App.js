import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import './App.css';
import Login from './Login';
import MyConnections from './MyConnections';
import Messages from './Messages';

export default class App extends Component {
  
    render(){
      return(
         <div>
           <Router>
           <nav className = "navbar">
             <ul className = "navbar-list">
               <li className= "navbar-item">
                <Link to = "/myconnections" className = "navbar-link"> My Connections</Link>
               </li>
               <li className = "navbar-item">
               <Link to = "/messages" className = "navbar-link"> Messages</Link>
                 </li>
             </ul>
           </nav>

           <Route path = "/" exact component={Login}/>
           <Route path = "/myconnections" exact component ={MyConnections}/>
           <Route path = "/messages" exact component = {Messages} />
           </Router>
         </div>
      )
    }
  
}


