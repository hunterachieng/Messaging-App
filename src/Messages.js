import React,{ Component, Fragment } from "react";
import Talk from "talkjs";

export default class Messages extends Component{
    constructor(props){
        super(props);
        this.inbox = undefined;
        let currentUser;
        const currentTalkJsUser = localStorage.getItem("currentUser");
         if(currentTalkJsUser){
             currentUser = JSON.parse(currentTalkJsUser);
         }
         this.state =  {currentUser}
    }
    componentDidMount(){
        const {currentUser} = this.state;
        //initiating talk js
        Talk.ready
        .then(() =>{
            const me = new Talk.User(currentUser);
            //creating a new talk session

            if(!window.talkSession){
                window.talkSession = new Talk.Session({
                    appId:"txZrSJqK",
                    me: me
                })

            
            }
            this.inbox = window.talkSession.createInbox();
            this.inbox.mount(this.container);
                })
                .catch(error => console.log(error));
    }
    render(){

        return(
            <Fragment>
                <div className = "inbox-container" ref = {container =>this.container=container}>
                    Loading ...
                </div>
            </Fragment>
        )
    }
}