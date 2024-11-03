class Personaje{
  static contador = 0;
  constructor(name,clase){
    this._vida = 20
    this._name = name;
    this._clase = clase;
    this._numero = ++Personaje.contador
  }

  

  get numeroCreacion(){
    console.log(this._numero);
  }

  saludo(){
    console.log(`Hola soy ${this.name} y esta es mi clase: ${this.clase}`)
  }

  desarmado(){
    console.log(`Ataco con la mano desnuda!`)
  }

  takeDamage(ataque,defensa){
    const newDamage = ataque - defensa;
    console.log(`El ataque cuasa una ${newDamage} despues de que tu oponente se defendiera con ${defensa} puntos de defensa.`)
    this._vida = this._vida - newDamage
    console.log(`Ahora ${this._name} esta a ${this._vida} de puntos de vida`)
  }
}

class Guerrero extends Personaje{
  constructor(_name,_clase,_vida){
    super(_name,_clase,_vida);
    this._ataque = 7 + Math.floor(Math.random()*5);
    this._defensa= 8 + Math.floor(Math.random()*5);
    this._velocidad =3 + Math.floor(Math.random()*5);
    this._armas=[{
      nombre:'Espada',
      damage: 4,
    },{
      nombre:'Hacha',
      damage: 5,
    }]
  }

  UsarArma(){
    let arma = this._armas[Math.floor(Math.random()*2)]
    console.log(`se usa el arma ${arma.nombre}`)
    return arma.damage
  }
}

class Mago extends Personaje{
  constructor(_name,_clase,_vida){
    super(_name,_clase,_vida);
    this._ataque = 5 + Math.floor(Math.random()*5);
    this._defensa= 3 + Math.floor(Math.random()*5);
    this._velocidad =1 + Math.floor(Math.random()*5);
    this._hechizos=[
      {
        nombre:'Bola de Fuego',
        damage:10
      },
      {
        nombre:'Estaca de hielo',
        damage:8
      }
    ];
  }

  lanzarHechizo(){
    let hechizo = this._hechizos[Math.floor(Math.random()*2)]
    console.log(`se lanza ${hechizo.nombre}. `)
    return hechizo.damage
  }
}

class Arquero extends Personaje{
  constructor(_name,_clase,_vida){
    super(_name,_clase,_vida);
    this._ataque = 8 + Math.floor(Math.random()*5);
    this._defensa= 1 + Math.floor(Math.random()*5);
    this._velocidad =4 + Math.floor(Math.random()*5);
    this.flechas=10;
    this._damageFlechas = 3 + Math.floor(Math.random()*(5-1)+1)
  }

  dispararFlecha(){
    if(this.flechas>1){
      console.log('Usaste todas tus flechas, no tienes nada!');
      return 0
    }else{
    --this.flechas
    console.log(`se dispara una flecha hace un total de ${this._ataque} daño`)
    return this._damageFlechas
    }
  }
}

function action(player1,player2){
  let dice = Math.floor(Math.random()*(2-1)+1)
  console.log(`Miren, ${player1._name} va a atacar a ${player2._name}`)
  if(dice === 1){
    player1.desarmado;
    player2.takeDamage(player1._ataque,player2._defensa)
  }
  if(dice === 2){
    if(player1.clase === "Guerrero"){
      player2.takeDamage(player1.UsarArma,player2._defensa)
    }else if(player1.clase === "Mago"){
      player2.takeDamage(player1.lanzarHechizo,player2._defensa)
    }else if(player1.clase === "Arquero"){
      player2.takeDamage(player1.dispararFlecha,player2._defensa)
    }
  }
}

let jugadores = [];

jugadores.push(new Guerrero('Grog','Guerrero'));
jugadores.push(new Guerrero('Cloud','Guerrero'));
jugadores.push(new Mago('Aerith','Mago'));
jugadores.push(new Mago('Zatanna','Mago'));
jugadores.push(new Arquero('Katniss','Arquero'));

let orden = jugadores.sort((a,b)=>{
  return b._velocidad - a._velocidad;
})

action(orden[0],orden[1])