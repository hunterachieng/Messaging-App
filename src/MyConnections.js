import React, {Component} from 'react';
import Talk from 'talkjs';
import dummyUsers from './Users.json';

export default class MyConnections extends Component{
    constructor(props){ 
        super(props);
        let currentUser;
        const currentTalkJsUser = localStorage.getItem("currentUser");
        if(currentTalkJsUser){
            currentUser = JSON.parse(currentTalkJsUser);
        }
        this.state = {currentUser};

           }
           handleClick(userId){
            //getting the two users to participate in a chat
            const {currentUser} = this.state;
            const user = dummyUsers.find(user =>user.id===userId);

            //initializing the talk.js
            Talk.ready
            .then(()=>{
                //create the users to participate in the chat
                const me = new Talk.User(currentUser);
                const other = new Talk.User(user);

                //create a talk session if none exists
                if(!window.talkSession){
                    window.talkSession = new Talk.Session({
                        appId:"txZrSJqK",
                        me :me
                    });
                    }
                    //getting or creating a conversation ID
                    const conversationId = Talk.oneOnOneId(me,other);
                    const conversation = window.talkSession.getOrCreateConversation(conversationId);

                    //setting conversation participants to the users created
                    conversation.setParticipant(me);
                    conversation.setParticipant(other);

                    //creating and mounting a chatbox

                    this.chatbox = window.talkSession.createChatbox(conversation);
                    this.chatbox.mount(this.container);
            })
            .catch(error => console.log(error));

        }
    render(){
        const {currentUser} = this.state;
        return(
            <div className = "users">
                <div className = "current-user-container">
                    {currentUser && 
                    <div>
                        <picture className= "current-user-picture">
                            <img src = {currentUser.photoUrl} alt = {currentUser.name}/>
                        </picture>
                        <div className = "current-user-info">
                            <h3>{currentUser.name}</h3>
                            <p>{currentUser.description}</p>
                        </div>
                    </div>
                    }
                </div>
                <div className ="users-container">
                    
                    <ul>
                        {dummyUsers.map(user =>
                          <li className = "user" key = {user.id}>
                              <picture className = "user-picture">
                                  <img src = {user.photoUrl} alt = {user.name} />
                                  </picture>
                                  <div className="user-info-container">
                                      <div className="user-info">
                                          <h4>{user.name}</h4>
                                          <p>{user.description}</p>
                                      </div>
                                      <div className = "user-action">
                                       <button onClick={userId=>this.handleClick(user.id)}>Message</button>
                                      </div>
                                  </div>                            

                          </li>  
                        )}
                    </ul>
                    <div className = "chatbox-container" ref = {c=> this.container = c}> 
                    <div id="talkjs"><i></i></div>
                    </div>
                    
                </div>
            </div>
        )
    }


}