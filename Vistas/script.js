class Tablero{
    tuplas;
    columnas;
    posiciones=[];

    constructor (tuplas,columnas,posiciones){
        this.tuplas=tuplas;
        this.columnas=columnas;
        this.posiciones=posiciones;
    }

    crearTablero(){
        let tabla= '<table class="box2">';
        for(let i=1; i<this.tuplas; i++){
            tabla=tabla+'<tr id="'+i+'" >';
            for(let j=1; j<this.columnas; j++){
                tabla=tabla+'<td><button id="celda'+i+j+'" data-tupla="'+i+'" data-columna="'+j+'" onclick="situar(this)"></button></td>';
            }
            tabla=tabla+'</tr>';
        }
        tabla=tabla+'</table>';
        console.log(tabla);
        document.getElementById("tablero").innerHTML = tabla;
        
        ocultarBotones();


    }

    ocultarBotones() {
        const div = document.getElementById('tablero');
        const botones = div.getElementsByTagName('button');
        for (let i = 0; i < botones.length; i++) {
          botones[i].style.display = 'none';
        }
    }
      

    cargarPosicion(posicion){
        this.posiciones.push(posicion);
    }


}

class Posicion{
    tupla;
    columna;
    tipo;
    grande;
    ancho;
    
    constructor(tupla,columna,tipo,grande,ancho){
        this.tupla=tupla;
        this.columna=columna;
        this.tipo=tipo;
        this.grande=grande;
        this.ancho=ancho;
    }

}

const tablero = new Tablero(7,15,);
tablero.crearTablero();

class Barco{
    tipo;
    grande;
    ancho;

    constructor (tipo){
        this.tipo=tipo;
        
        switch (tipo) {
            case "grande":
                this.grande=6;
                this.ancho=2;
            break;
            case "mediano":
                this.grande=3;
                this.ancho=2;
            break;
            case "chico":
                this.grande=2;
                this.ancho=1;
            break;
            case "barquito":
                this.grande=1;
                this.ancho=1;
            break;
        }
    }

}

function elegirBarco(valor){

    tipo = valor.value;
    const barco = new Barco(tipo);
    console.log(barco.tipo, barco.grande, barco.ancho);
}

function situar(celda){
    tupla = celda.getAttribute('data-tupla');
    columna = celda.getAttribute('data-columna');
    console.log(tupla, columna);
    posicion=new Posicion(tupla,columna,barco.tipo,barco.grande,barco.ancho);
    console.log(posicion);
    cargarPosicion(posicion);
}