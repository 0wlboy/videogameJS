class Personaje {
  static contador = 0;
  constructor(name, clase) {
    this._vida = 20;
    this._name = name;
    this._clase = clase;
    this._numero = ++Personaje.contador;
  }

  get numeroCreacion() {
    console.log(this._numero);
  }

  saludo() {
    console.log(`Hola soy ${this.name} y esta es mi clase: ${this.clase}`);
  }

  desarmado() {
    console.log(`Ataco con la mano desnuda!`);
  }

  takeDamage(ataque, defensa) {
    let newDamage =
      Math.floor(Math.random() * ataque) - Math.floor(Math.random() * defensa);
    if (newDamage < 1) {
      newDamage = 0;
    }
    console.log(
      `El ataque cuasa una ${newDamage} despues de que tu oponente se defendiera con ${defensa} puntos de defensa.`
    );
    this._vida = this._vida - newDamage;
    console.log(`Ahora ${this._name} esta a ${this._vida} de puntos de vida`);
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

  UsarArma() {
    let arma = this._armas[Math.floor(Math.random() * 2)];
    console.log(`se usa el arma ${arma.nombre}`);
    return arma.damage;
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

  lanzarHechizo() {
    let hechizo = this._hechizos[Math.floor(Math.random() * 2)];
    console.log(`se lanza ${hechizo.nombre}. `);
    return hechizo.damage;
  }
}

class Arquero extends Personaje {
  constructor(_name, _clase, _vida) {
    super(_name, _clase, _vida);
    this._ataque = 8;
    this._defensa = 1;
    this._velocidad = 4 + Math.floor(Math.random() * 5);
    this.flechas = 10;
    this._damageFlechas = 3 + Math.floor(Math.random() * (5 - 1) + 1);
  }

  dispararFlecha() {
    if (this.flechas > 1) {
      console.log("Usaste todas tus flechas, no tienes nada!");
      return 0;
    } else {
      --this.flechas;
      console.log(
        `se dispara una flecha hace un total de ${this._ataque} daño`
      );
      return this._damageFlechas;
    }
  }
}

function action(player1, player2) {
  let dice = Math.floor(Math.random() * (2 - 1) + 1);
  let damage = 0;
  console.log(`Miren, ${player1._name} va a atacar a ${player2._name}`);
  if (dice === 1) {
    player1.desarmado;
    player2.takeDamage(player1._ataque, player2._defensa);
  }
  if (dice === 2) {
    if (player1.clase === "Guerrero") {
      damage = player1.UsarArma;
      player2.takeDamage(damage, player2._defensa);
    } else if (player1.clase === "Mago") {
      damage = player1.lanzarHechizo;
      player2.takeDamage(damage, player2._defensa);
    } else if (player1.clase === "Arquero") {
      damage = player1.dispararFlecha;
      player2.takeDamage(damage, player2._defensa);
    }
  }
}

/*function round(players){
  let orden;
  orden = players.sort((a,b)=>{
    return (Math.floor(Math.random()* b._velocidad)) - (Math.floor(Math.random() * a._velocidad));
  }
  return orden;
}*/

function game(jugadores) {
  let orden;
  while (jugadores.length > 1) {
    orden = jugadores.sort((a, b) => {
      return (
        Math.floor(Math.random() * b._velocidad) -
        Math.floor(Math.random() * a._velocidad)
      );
    });
    action(
      orden[Math.floor(Math.random() * jugadores.length)],
      orden[Math.floor(Math.random() * jugadores.length)]
    );
    jugadores.forEach((element, index) => {
      if (element._vida < 1) {
        console.log(`Oh no, ${element._name} murio.`);
        jugadores = jugadores.slice(index);
      }
    });
  }
}

let jugadores = [];

jugadores.push(new Guerrero("Guts", "Guerrero"));
jugadores.push(new Guerrero("Cloud", "Guerrero"));
jugadores.push(new Mago("Aerith", "Mago"));
jugadores.push(new Mago("Zatanna", "Mago"));
jugadores.push(new Arquero("Katniss", "Arquero"));

game(jugadores);
