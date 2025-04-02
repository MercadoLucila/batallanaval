class Tablero{
    tuplas;
    columnas;

    constructor (tuplas,columnas){
        this.tuplas=tuplas;
        this.columnas=columnas;
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
        
        const div = document.getElementById('tablero');
        const botones = div.getElementsByTagName('button');
        for (let i = 0; i < botones.length; i++) {
          botones[i].style.display = 'none';
        }

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

const tablero = new Tablero(7,14);
tablero.crearTablero();
let barco;
let posiciones= [];

function elegirBarco(valor){
    const div = document.getElementById('tablero');
        const botones = div.getElementsByTagName('button');
        for (let i = 0; i < botones.length; i++) {
          botones[i].style.display = '';
        }
    tipo = valor.value;
    let barco = new Barco(tipo);
    console.log(barco.tipo, barco.grande, barco.ancho);

    for (let i = 0; i < botones.length; i++) {
        botones[i].setAttribute('data-barco', JSON.stringify(barco));
    }
}

function situar(celda){
    let barcoData = celda.closest('#tablero').querySelector('button').getAttribute('data-barco');

    if (!barcoData) {
        console.error("No hay un barco seleccionado.");
        return;
    }
    let barco = JSON.parse(barcoData);

    console.log(barco);
    tupla = celda.getAttribute('data-tupla');
    columna = celda.getAttribute('data-columna');
    posicion=new Posicion(tupla,columna,barco.tipo,barco.grande,barco.ancho);
    console.log(posicion);
    posiciones.push(posicion);
    console.log(posiciones);

    const div = document.getElementById('tablero');
        const botones = div.getElementsByTagName('button');
        /*for(let i = 0; i<botones.length;i++){
            fila=botones[i].getAttribute('data-tupla');
            colum=botones[i].getAttribute('data-celda')
            if()
        }
            */
        
}

/*for (let i = 0; i < botones.length; i++) {
    botones[i].style.display = '';
}
    