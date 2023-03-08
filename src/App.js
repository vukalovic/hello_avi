import React, { Component } from 'react';
import Messages from "./Messages";
import Input from "./Input";
import './App.css';

function randomImeAlgebra() {
  const imena = ['Antonia', 'Santo', 'Bruno', 'Daniel', 'Dean', 'Valentina', 'Matej', 'Mario', 'Mladen', ];
  const prezimena = ['Vukalović', 'Tessari', 'Rehak', 'Jursik', 'Hudek', 'Vujević', 'Nemeth', 'Maljak', 'Ivošević'];
  const ime = imena[Math.floor(Math.random() * imena.length)];
  const prezime = prezimena[Math.floor(Math.random() * prezimena.length)];
  return `${ime} ${prezime}`;
}

function randomBoja() {
  return `#${Math.floor(Math.random() * 0xFFFFFF).toString(16)}`;
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomImeAlgebra(),
      color: randomBoja(),
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("UimN5qQN7un6YQ2Y", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-tonja");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-tonja",
      message
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>HELLO AVI</h1>
          
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }
}

export default App;
