class Tablero{
    tuplas;
    columnas;
    barcoGrande;
    barcoMediano;
    barcoChico;
    barquito;

    constructor (tuplas,columnas,barcoGrande,barcoMediano,barcoChico,barquito){
        this.tuplas=tuplas;
        this.columnas=columnas;
        this.barcoGrande=barcoGrande;
        this.barcoMediano=barcoMediano;
        this.barcoChico=barcoChico;
        this.barquito=barquito;
    }

    crearTablero(){
        let total=this.barcoGrande+this.barcoMediano+this.barcoChico+this.barquito;
        document.getElementById("cantidad_barcos").innerHTML = total;
        document.getElementById("colocacion").innerHTML = "Aun no has elegido ningun barco para colocar";
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
        
        document.getElementById("cantidad_grande").innerHTML = this.barcoGrande;
        document.getElementById("cantidad_mediano").innerHTML = this.barcoMediano;
        document.getElementById("cantidad_chico").innerHTML = this.barcoChico;
        document.getElementById("cantidad_barquito").innerHTML = this.barquito;

        const div = document.getElementById('tablero');
        const botones = div.getElementsByTagName('button');
        for (let i = 0; i < botones.length; i++) {
            botones[i].disabled = true;
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

const tablero = new Tablero(7,14,1,2,2,1);
tablero.crearTablero();
let barcoGrande=tablero.barcoGrande;
let barcoMediano=tablero.barcoMediano;
let barcoChico=tablero.barcoChico;
let barquito=tablero.barquito;
let total=barcoGrande+barcoMediano+barcoChico+barquito;
let barco;
let posiciones= [];

function elegirBarco(valor){
    document.getElementById("colocacion").innerHTML = "Coloca el barco!";
    const div = document.getElementById('tablero');
        const botones = div.getElementsByTagName('button');
        for (let i = 0; i < botones.length; i++) {
            botones[i].disabled = false;
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

    tupl = celda.getAttribute('data-tupla');
    column = celda.getAttribute('data-columna');
    tupla = parseInt(tupl);
    columna = parseInt(column);
    console.log("columna:",columna);
    if(barco.grande>1){
        longitud=parseInt(columna)+parseInt(barco.grande-1);
    }else{
        longitud=parseInt(columna);
    }
    console.log("Longitud:",longitud);
    if(longitud<=tablero.columnas){
        if(barco.ancho==2){
            for(let i=0; i<barco.grande ; i++){
                posicion=new Posicion(tupla,columna+i,barco.tipo,barco.grande,barco.ancho);
                console.log(posicion);
                posiciones.push(posicion);
                console.log(posiciones);
                posicion=new Posicion(tupla+1,columna+i,barco.tipo,barco.grande,barco.ancho);
                console.log(posicion);
                posiciones.push(posicion);
                console.log(posiciones);
            }
        }else{
            for(let i=0; i<barco.grande ; i++){
                posicion=new Posicion(tupla,columna+i,barco.tipo,barco.grande,barco.ancho);
                console.log(posicion);
                posiciones.push(posicion);
                console.log(posiciones);
            }
        }
        let cantidadId = "cantidad_" + barco.tipo;
            switch (barco.tipo) {
                case "grande":
                    barcoGrande=barcoGrande-1;
                    if (barcoGrande===0){
                        deshabilitarBoton(barco.tipo);
                    }
                    document.getElementById(cantidadId).innerHTML=barcoGrande;
                break;
                case "mediano":
                    barcoMediano=barcoMediano-1;
                    if (barcoMediano===0){
                        deshabilitarBoton(barco.tipo);
                    }
                    document.getElementById(cantidadId).innerHTML=barcoMediano;
                break;
                case "chico":
                    barcoChico=barcoChico-1;
                    if (barcoChico===0){
                        deshabilitarBoton(barco.tipo);
                    }
                    document.getElementById(cantidadId).innerHTML=barcoChico;
                break;
                case "barquito":
                    barquito=barquito-1;
                    if (barquito===0){
                        deshabilitarBoton(barco.tipo);
                    }
                    document.getElementById(cantidadId).innerHTML=barquito;
                break;
            }
        total=barcoGrande+barcoMediano+barcoChico+barquito;
        document.getElementById("cantidad_barcos").innerHTML = total;
        document.getElementById("colocacion").innerHTML = "Barco colocado, elige un nuevo barco para situar";
    }else{
        alert("El barco es demasiado largo, ubícalo más a la izquierda");
    }
    
    pintarColocados();
        
}  

function deshabilitarBoton(tipo){
    let botones= document.querySelectorAll(`button[value="${tipo}"]`);
    botones.forEach(boton=>{
        boton.disabled=true;
    })
}

function pintarColocados(){
    const div = document.getElementById('tablero');
    const botones = div.getElementsByTagName('button');
    for(let i = 0; i<botones.length;i++){
        fil=botones[i].getAttribute('data-tupla');
        colu=botones[i].getAttribute('data-columna');
        fila=parseInt(fil);
        colum=parseInt(colu);
                
        let coincide = posiciones.some(pos => pos.tupla === fila && pos.columna === colum);
    
        if (coincide){
            botones[i].classList.add("barco-colocado");
            console.log(botones[i].classList);
        }
    }

    deshabilitarTablero(botones);
}

function deshabilitarTablero(botones){
    for (let i = 0; i < botones.length; i++) {
        botones[i].disabled = true;
    }

    if(total==0){
        cuentaAtras();
    }
}

function cuentaAtras(){
    
}