import React, { Component } from 'react';
import Messages from "./Messages";
import Input from "./Input";
import './App.css';

function randomName() {
  const imena = ['Mia', 'Lucija', 'Nika', 'Rita', 'Ema', 'Mila', 'Marta', 'Sara', 'Ana', 'Dora', 'Eva', 'Elena', 'Lana', 'Petra', 'Iva', 'Klara', 'Lara', 'Marija', 'Lea', 'Hana', 'Ena', 'Franka', 'Tena', 'Leona', 'Laura', 'Emili', 'Maša', 'Una', 'Vita', 'Lena', 'Luka', 'David', 'Jakov', 'Ivan', 'Roko', 'Petar', 'Mateo', 'Niko', 'Matej', 'Fran', 'Josip', 'Noa', 'Mihael', 'Borna', 'Toma', 'Filip', 'Leon', 'Karlo', 'Marko', 'Lovro', 'Jan', 'Ivano', 'Vito', 'Šimun', 'Teo', 'Lukas', 'Ante', 'Nikola', 'Gabriel', 'Leo'];
  const prezimena = ['Horvat', 'Kovačević', 'Babić', 'Marić', 'Jurić', 'Novak', 'Kovačić', 'Knežević', 'Vuković', 'Marković', 'Matić', 'Petrović', 'Tomić', 'Pavlović', 'Kovač', 'Božić', 'Grgić', 'Blažević', 'Perić', 'Pavić', 'Radić', 'Šarić', 'Lovrić', 'Filipović', 'Vidović', 'Jukić', 'Bošnjak', 'Perković', 'Popović', 'Nikolić', 'Šimić', 'Barišić', 'Bašić', 'Mandić', 'Klarić', 'Živković', 'Lončar', 'Martinović', 'Barić', 'Brkić', 'Galić', 'Jurković', 'Bilić', 'Kos', 'Stanić', 'Lukić', 'Matijević', 'Matković', 'Kralj', 'Janković', 'Novosel', 'Jelić', 'Ćosić', 'Miletić', 'Jurišić', 'Ivanović', 'Katić', 'Lučić', 'Mihaljević', 'Ilić', 'Tadić', 'Posavec', 'Jerković', 'Marinović', 'Ivanković', 'Mikulić', 'Šimunović', 'Ivančić', 'Poljak', 'Jovanović', 'Herceg', 'Marjanović', 'Milić', 'Vidaković', 'Cindrić', 'Marušić', 'Vučković', 'Topić', 'Rukavina', 'Jozić', 'Delić', 'Novaković', 'Varga', 'Pavičić', 'Bogdan', 'Grubišić', 'Đurić', 'Špoljarić', 'Dujmović', 'Vukelić', 'Kolar', 'Burić', 'Štimac', 'Petković', 'Kolarić', 'Petrić', 'Brajković', 'Bačić', 'Jakšić', 'Jović', 'Ivić', 'Stanković', 'Ružić', 'Pranjić', 'Stojanović', 'Antunović', 'Mitrović', 'Lončarić', 'Ban', 'Tolić', 'Josipović', 'Pejić', 'Pintarić', 'Golubić', 'Anić', 'Prpić', 'Tokić', 'Erceg', 'Petričević', 'Budimir', 'Baričević', 'Martić', 'Starčević', 'Vlašić', 'Vrdoljak', 'Mijatović', 'Car', 'Majić', 'Šimunić', 'Horvatić', 'Mlinarić', 'Ljubičić', 'Pavlić', 'Vukić', 'Vlahović', 'Sever', 'Abramović', 'Crnković', 'Mamić', 'Grgurić', 'Ivković', 'Zorić', 'Čović', 'Dragičević', 'Radoš', 'Rašić', 'Orešković', 'Sertić', 'Miličević', 'Ljubić', 'Milković', 'Medved', 'Matošević', 'Andrić', 'Milošević', 'Turković', 'Franić', 'Mišković', 'Balić', 'Šoštarić', 'Mihalić', 'Milanović', 'Jurčević', 'Galović', 'Radošević', 'Rajković', 'Balog', 'Mikić', 'Medić', 'Savić'];
  const ime = imena[Math.floor(Math.random() * imena.length)];
  const prezime = prezimena[Math.floor(Math.random() * prezimena.length)];
  return `${ime} ${prezime}`;
}

function randomColor() {
  return `#${Math.floor(Math.random() * 0xFFFFFF).toString(16)}`;
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
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
          <h1>Heloo AVI</h1>
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
