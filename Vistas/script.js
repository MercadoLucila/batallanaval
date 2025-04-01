class Tablero{
    tuplas;
    columnas;

    constructor (tuplas,columnas){
        this.tuplas=tuplas;
        this.columnas=columnas;
    }

    crearTablero(){
        let tabla= '<table class="tabla2">';
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
    }

    colocarBarco(tipo,grande,tupla,columna){

    }

}

const tablero = new Tablero(9,9);
tablero.crearTablero();

class Barco{
    tipo;
    grande;

    constructor (tipo){
        this.tipo=tipo;
        
        switch (tipo) {
            case "grande":
                this.grande=6;
            break;
            case "mediano":
                this.grande=3;
            break;
            case "chico":
                this.grande=2;
            break;
            case "barquito":
                this.grande=1;
            break;
        }
    }
}

function elegirBarco(valor){
    tipo = valor.value;
    const barco = new Barco(tipo);
    console.log(barco.tipo, barco.grande);
}

function situar(celda){
    tupla = celda.getAttribute('data-tupla');
    columna = celda.getAttribute('data-columna');
    console.log(tupla, columna);
    colocarBarco(barco.tipo,barco.grande,tupla,columna);
}