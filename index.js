class Personaje {
  constructor(name, clase) {
    this._vida = 10;
    this._name = name;
    this._clase = clase;
  }

  saludo() {
    console.log(`Hola soy ${this._name} y esta es mi clase: ${this._clase}`);
  }

  desarmado() {
    console.log(`Ataco con la mano desnuda!`);
  }

  takeDamage(ataque, defensa) {
      let newDamage =
      Math.floor(Math.random() * ataque) - Math.floor(Math.random() * defensa);
    if (newDamage < 1) {
      console.log(`${this._name} logro esquivar el ataque. No sufrio daño!`)
    }else{
      console.log(
        `El ataque cuasa un ${newDamage} de daño despues de que tu oponente se defendiera con ${defensa} puntos de defensa.`
      );
      if((this._vida - newDamage)<1){
        this._vida = 0;
      }else{
        this._vida = this._vida - newDamage;
      }
      console.log(`Ahora ${this._name} esta a ${this._vida} de puntos de vida`);
      }
    } 
  }

class Guerrero extends Personaje {
  constructor(_name, _clase, _vida) {
    super(_name, _clase, _vida);
    this._ataque = 7;
    this._defensa = 2;
    this._velocidad = 3;
    this._armas = [
      {
        nombre: "Espada",
        damage: 4,
      },
      {
        nombre: "Hacha",
        damage: 5,
      },
    ];
  }

  UsarArma(objetivo) {
    let arma = this._armas[Math.floor(Math.random() * this._armas.length)];
    let damage = arma.damage
    console.log(`${this._name} va a utilizar ${arma.nombre} para atacar a ${objetivo._name}`);
    return damage;
  }
}

class Mago extends Personaje {
  constructor(_name, _clase, _vida) {
    super(_name, _clase, _vida);
    this._ataque = 5;
    this._defensa = 3;
    this._velocidad = 2;
    this._hechizos = [
      {
        nombre: "Bola de Fuego",
        damage: 10,
      },
      {
        nombre: "Estaca de hielo",
        damage: 8,
      },
    ];
  }

  lanzarHechizo(objetivo) {
    let hechizo = this._hechizos[Math.floor(Math.random() * this._hechizos.length)];
    let damage = hechizo.damage
    console.log(`${this._name} va a utilizar ${hechizo.nombre} para atacar a ${objetivo._name}`);
    return damage;
  }
}

class Arquero extends Personaje {
  constructor(_name, _clase, _vida) {
    super(_name, _clase, _vida);
    this._ataque = 3;
    this._defensa = 1;
    this._velocidad = 4;
    this.flechas = 3;
    this._damageFlechas = 4;
  }

  dispararFlecha() {
    if (this.flechas < 1) {
      return 0;
    } else {
      --this.flechas;
      console.log(`${this._name} dispara una flecha. Ahora tiene ${this.flechas} flechas.`)
      let damage = this._damageFlechas
      return damage;
    }
  }
}

function action(player1, player2) {
  let dice = Math.floor(Math.random() * 2);
  let accion;
  console.log(`Miren, ${player1._name} va a atacar a ${player2._name}`);
  if (dice === 0) {
    player1.desarmado();
    player2.takeDamage(player1._ataque, player2._defensa);
  }else
  if (dice === 1) {
    if (player1._clase === "Guerrero") {
      accion = player1.UsarArma(player2);
      player2.takeDamage(accion, player2._defensa);
    } else if (player1._clase === "Mago") {
      accion = player1.lanzarHechizo(player2);
      player2.takeDamage(accion, player2._defensa);
    } else if (player1._clase === "Arquero") {
      accion = player1.dispararFlecha();
      if(accion === 0){
        console.log(`No tienes flechas, no puedes hacer nada`)
      }else{
        console.log(`${player1._name} dispara una flecha`)
        player2.takeDamage(accion, player2._defensa);
      }
    }
  }
}

function game(jugadores) {
  let dice1;
  let dice2;
  let orden;
  do {
    orden = jugadores.sort((a, b) => {
      return (
        Math.floor(Math.random() * b._velocidad) -
        Math.floor(Math.random() * a._velocidad)
      );
    });
    dice1=0;
    dice2=0;
    do{
      dice1= Math.floor(Math.random() * jugadores.length);
      dice2 = Math.floor(Math.random() * jugadores.length);
    }while(dice1 === dice2);
    action(
      orden[dice1],
      orden[dice2]
    );
    jugadores.forEach((element, index) => {
      if (element._vida === 0) {
        console.log(`Oh no, ${element._name} murio.`);
        jugadores.splice(index,1);
      }
    });
  }while(jugadores.length > 1);
  console.log(`${jugadores[0]._name} gana la gran batalla!`)
} 

let jugadores = [];

jugadores.push(new Guerrero("Guts", "Guerrero"));
jugadores.push(new Guerrero("Cloud", "Guerrero"));
jugadores.push(new Mago("Aerith", "Mago"));
jugadores.push(new Mago("Zatanna", "Mago"));
jugadores.push(new Arquero("Katniss", "Arquero"));

game(jugadores);
