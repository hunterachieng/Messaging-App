import React, {Component} from 'react';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            description : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        const target = e.target;
        this.setState({[target.name] : target.value})
    }
    handleSubmit(e){
        e.preventDefault();
        const {name, email, description} = this.state;
        // creating a random number for the user's Id

        let randomNumber = Math.ceil(Math.random ()* 10000);
        const userDetails = {
            name,
            email,
            description,
            id: randomNumber,
            role : "Member",
            photoUrl: "https://randomuser.me/api/portraits/women/29.jpg",
            }
            //storing user details into the browser's local storage
            localStorage.setItem("currentUser", JSON.stringify(userDetails))

            //Redirecting to the networks page
            this.props.history.push("/myconnections");

              }
              render(){
                return(
                    <div className = "login-container">
                        <div className = "login-forms">
                            <form onSubmit = {this.handleSubmit}>
                              <p>New User? Login</p>
                              <input type = "text" name = "name" onChange = {this.handleChange} placeholder ="Name" className = "input" required/>
                              <input type = "email" name = "email" onChange = {this.handleChange} placeholder = "Email" className = "input" required />
                              <textarea  type = "text" name = "description" onChange = {this.handleChange} placeholder = "What Do You Do?" className = "input textarea"/>
                              <input type = "submit" className = "button" placeholder = "submit" />
                            </form>

                        </div>

                    </div> 
                )
            }
}