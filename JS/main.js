let imagenes = ['Imagenes/imagen1.jpg', 'Imagenes/imagen2.jpg', 'Imagenes/imagen3.jpg', 'Imagenes/imagen4.jpg', 'Imagenes/imagen5.jpg'],
cont = 1;


let adelante = document.getElementById('ade'),
atras = document.getElementById('atr'),
img = document.getElementById('imagen'),
direccion = 'D',
timer = setInterval( () => {
    if(direccion == 'D'){
        Imagen(1);
    } 
    if(direccion == 'A'){
        Imagen(-1);
    } 
} , 3000);

function Atras(){
    //alert('Boton atras pulsado');
    direccion = 'A';
    Imagen(-1);
}

function Adelante(){
    //alert('Boton adelante pulsado');
    direccion = 'D';
    Imagen(1);
}

/*adelante.addEventListener('click', () =>{
    
});


atras.addEventListener('click', ()=>{
    
});*/

function Imagen (incremento) {
    cont += incremento;      
    if(cont < 0) cont = 4;
    if(cont > 4) cont = 0;
    //console.log('imagen' + (cont+1));
    img.setAttribute('src',imagenes[cont]);
    console.log(imagenes[cont]);
    //img.src = imagenes[cont ];
    clearInterval(timer);
    timer = setInterval( () => {
    if(direccion == 'D'){
        Imagen(1);
    } 
    if(direccion == 'A'){
        Imagen(-1);
    } 
    }, 3000)
}


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Instancia de los elementos en el dom 
let nombre = document.getElementById('Nombre'),
apellido = document.getElementById('Apellidos'),
adress = document.getElementById('Direccion'),
telefono = document.getElementById('Telefono'),
btn = document.getElementById('Accion'),
body= document.getElementsByTagName('body'),
fila,
celda,
contador = 0,
datos = new Array(),
Tabla = document.getElementById('Tabla'),
objetoDatos = new Object();

//finacion que se ejecuta en el evento click del boton 
function hacer(){
    //obtener datos guardados en storage
    datos = ObtenerStorage();
    //se verifica si habia datos en storage
    if( datos == undefined){
        //obtener datos de los textbox
        //objetos con los datos capturados de los textbox 
        objetoDatos.Nombre = nombre.value;
        objetoDatos.Apellidos = apellido.value; 
        objetoDatos.Direccion = adress.value;
        objetoDatos.Telefono = telefono.value
        datos[contador] = objetoDatos;
        //crear tabla mandando como paramentro los datos
        CrearTabla(datos);
    }else{
        //crear tabla con los datos que ya se habian guardado en storage
        CrearTabla(datos);
    }
    SendLocalstorage(datos);
    //console.log(event.target);
}

// funcion que se llama al evento del boton eliminar
function Eliminar(event){
    console.log(event.target);
    //se obtiene el boton que lansa el evento
    let btn = event.target,
    //se accede al padre del elemnto, en este caso, se referncia a la fila que contiene dicho boton
    padre = btn.parentNode,
    //se accede a los hijos del componente al que se refencio antes, se obtiene un arreglo de elementos
    hijo = padre.children,
    clave = hijo.innerText;
    console.log(hijo[0].parentNode.rowIndex);
    //se optiene el indice del elemento para sacar del arreglo el elemento con el mismo indice
    //en el espacion que fue seleccionado para eliminarse se iguala al elemento siguiente y el ultimo elemento se borra 
    datos[hijo[0].parentNode.rowIndex -1 ] = datos[hijo[0].parentNode.rowIndex];
    datos[hijo[0].parentNode.rowIndex] = null;
    //se elimina de la tabla el hijo seleccionado, en este caso el padre el elemento boton
    Tabla.removeChild(padre);

    //se recorre el arreglo para identificar el primer espacio vacio e iniciar el contador en esa pocicsion
    for(let i=0;i<=contador;i++){
        if (datos[i] == null){
            contador = i;
        }
    }

    /*console.log(btn );
    console.log(padre);
    console.log(hijo);
    console.log(clave);*/
    
}

function CrearTabla(data){
    datos = data;
    //condicion para evitar que se repita la primera fila con cada evento del boton
    if(document.getElementById('1') == null){
        //se crea elemento tr
        fila = document.createElement('tr');
        //se le agrega un un atributo id con valor 1
        fila.setAttribute('id', '1');
        //se agrega elemento tr como hijo del elemnto table
        Tabla.appendChild(fila);
        //ciclo para sacar datos del arreglo de objetos y crear los identificadores de las columnas
        for(dato in datos[contador]){
            //crear elemnto td
            celda = document.createElement('td');
            // agregar un valor al elemento antes creado
            celda.innerHTML = dato;
            // colocar elemento como hijo del elemento tr
            fila.appendChild(celda);
        }
    }
    
    //se cera un nuevo elemento tr
    fila = document.createElement('tr');
    fila.setAttribute('id','fila' + contador);
    Tabla.appendChild(fila);

    //ciclo para recorrer los datos en el arreglo
    for(dato in datos[contador]){
        //se crea una nueva celad
        celda = document.createElement('td');
        //se le agrega un valor a la celda
        celda.innerHTML = datos[contador][dato];
        //se agrega la celda a la fila
        fila.appendChild(celda);
    } 

    //creacion de un elemento boton para la eliminaion de los registros
    let boton = document.createElement('button');
    //se le agreag un valor al elemento
    boton.innerText = 'Eliminar';
    // se agrega un atrivito class con valor eliminar
    boton.setAttribute('class','eliminar');
    //se agreag un evento al boton y una funcion
    boton.setAttribute('onClick','Eliminar(event)')
    // se agrega elemento a la fila
    fila.appendChild(boton);
    contador++;
}

function SendLocalstorage(arr){
    if(typeof(Storage) !== 'undefined'){
        localStorage.setItem('Datos',JSON.stringify(arr));
    }else{
        alert('Localstorage no disponible para este navegador');
    }
} 

/*function ObtenerDatos(){
    

    return datos;
}*/

function ObtenerStorage(){
    let d ;
    if(typeof(Storage) !== 'undefined'){
        d = JSON.parse(localStorage.getItem('Datos'));
        if(d != null){
            return d;
        }
        localStorage.clear();
        return;
    }else{
        alert('Localstorage no disponible para este navegador');
    }
}

function Cargar(){
    let r = ObtenerStorage();
    if(r == null){
        return;
    }else{
        for(dato in datos){
            CrearTabla(r);

        }
    }
}

/*const GenerarTabla = (Dato) => {

}*/