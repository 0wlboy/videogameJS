class Personaje{
  static contador = 0;
  constructor(name,clase){
    this.name = name;
    this.clase = clase;
    this._numero = ++Personaje.contador
  }

  get numeroCreacion(){
    console.log(this._numero);
  }

  saludo(){
    console.log(`Hola soy ${this.name} y esta es mi clase: ${this.clase}`)
  }

  ataqueSimple(ataque){
    console.log(`Atacas con la mano desnuda, causas ${ataque} de daño.`)
  }
}

class Guerrero extends Personaje{
  constructor(name,clase){
    super(name,clase);
    this._vida = 20 + Math.floor(Math.random()*5);
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
    console.log(`se usa el arma ${arma.nombre}, hace un total de ${arma.damage} daño. `)
  }
}

class Mago extends Personaje{
  constructor(name,clase){
    super(name,clase);
    this._vida = 15 + Math.floor(Math.random()*5);
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
    console.log(`se lanza ${hechizo.nombre}, hace un total de ${hechizo.damage} daño. `)
  }
}

class Arquero extends Personaje{
  constructor(name,clase){
    super(name,clase);
    this._vida = 10 + Math.floor(Math.random()*5);
    this._ataque = 8 + Math.floor(Math.random()*5);
    this._defensa= 1 + Math.floor(Math.random()*5);
    this._velocidad =4 + Math.floor(Math.random()*5);
    this.flechas=10;
  }

  dispararFlecha(){
    --this.flechas
    console.log(`se dispara una flecha hace un total de ${this._ataque} daño. Te quedan un total de ${this.flechas}`)
  }
}

let jugadores = [];

jugadores.push(new Guerrero('Grog','Guerrero'));
jugadores.push(new Guerrero('Cloud','Guerrero'));
jugadores.push(new Mago('Aerith','Mago'));
jugadores.push(new Mago('Zatanna','Mago'));
jugadores.push(new Arquero('Katniss','Arquero'));

let orden;

orden = jugadores.reverse((a,b) => {
  return b._velocidad - a._velocidad;
})

orden.forEach(element =>{
  console.log(element.name)
})


