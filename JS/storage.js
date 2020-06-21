let numeroCuenta = document.getElementById('NumeroCuenta'),
nombre = document.getElementById('Nombre'),
apellido = document.getElementById('Apellidos'),
FechaNacimiento = document.getElementById('FechaNacimiento'),
telefono = document.getElementById('Telefono'),
correo = document.getElementById('correo'),
btn = document.getElementById('Accion'),
body= document.getElementsByTagName('body'),
fila,
celda,
contador = 0,
datos = [],
Tabla = document.getElementById('Tabla'),
objetoDatos = {};

//finacion que se ejecuta en el evento click del boton 
function hacer(){
    //obtener datos guardados en storage
    //datos = ObtenerStorage();
    //se verifica si habia datos en storage
    //objetos con los datos capturados de los textbox 
    objetoDatos = {
        Numero_Cuenta : numeroCuenta.value,
        Nombre : nombre.value,
        Apellido : apellido.value,
        Fecha_Nacimiento : FechaNacimiento.value,
        Telefono : telefono.value
    };

    
    datos[contador] = objetoDatos;

    
    //condicion para evitar que se repita la primera fila con cada evento del boton
    if(document.getElementById('1') == null){
        
        for(dato in datos[contador]){
            
            console.log(datos[contador]);
            /*//crear elemnto td
            celda = document.createElement('td');
            // agregar un valor al elemento antes creado
            celda.innerHTML = dato;
            // colocar elemento como hijo del elemento tr
            fila.appendChild(celda);*/
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
        console.log(datos[contador][dato]);
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


    //se define si el navegador soporta localstorage 
    if(typeof(Storage) !== 'undefined'){
        // se manda el arreglo de objetos al storage con id Datos
        localStorage.setItem('Datos',JSON.stringify(datos));
    }else{
        alert('Localstorage no disponible para este navegador');
    }

    contador++;
}

function Eliminar(event){
    //limpiamos el sorage
    localStorage.removeItem('Datos');

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

    localStorage.setItem('Datos',JSON.stringify(datos));

    /*console.log(btn );
    console.log(padre);
    console.log(hijo);
    console.log(clave);*/
    
}

function Cargar(){
    //alert('Evento cargar');
    
    
    if(typeof(Storage) !== 'undefined'){
        // se manda el arreglo de objetos al storage con id Datos
        if(localStorage.getItem('Datos') != null){
            datos = JSON.parse(localStorage.getItem('Datos'));
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
            for(let i=0; i < datos.length;i++){
                //se cera un nuevo elemento tr
                fila = document.createElement('tr');
                //fila.setAttribute('id','fila' + i);
                Tabla.appendChild(fila);

                //ciclo para recorrer los datos en el arreglo
                for(dato in datos[i]){
                    //se crea una nueva celad
                    celda = document.createElement('td');
                    //se le agrega un valor a la celda
                    celda.innerHTML = datos[i][dato];
                    //se agrega la celda a la fila
                    fila.appendChild(celda);
                }
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
    
        }
    }else{
        alert('Localstorage no disponible para este navegador');
    }
}