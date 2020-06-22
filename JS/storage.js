let numeroCuenta = document.getElementById('NumeroCuenta'),
nombre = document.getElementById('Nombre'),
apellido = document.getElementById('Apellidos'),
FechaNacimiento = document.getElementById('FechaNacimiento'),
telefono = document.getElementById('Telefono'),
correo = document.getElementById('correo'),
btn = document.getElementById('Accion'),
body= document.getElementsByTagName('body'),
cache = document.getElementById('divBorrarCahe'),
btnBorrarCache = document.getElementById('btnBorrarCache'),
btnNuevoRegistro = document.getElementById('btnNuevoRegistro'),
fila,
celda,
contador = 0,
contadorCache = 0,
datos = [],
datosCache=[],
Tabla = document.getElementById('Tabla'),
objetoDatos = {};

//finacion que se ejecuta en el evento click del boton 
function hacer(){
    //obtener datos guardados en storage
    //objetos con los datos capturados de los textbox 
    objetoDatos = {
        Numero_Cuenta : numeroCuenta.value,
        Nombre : nombre.value,
        Apellido : apellido.value,
        Fecha_Nacimiento : FechaNacimiento.value,
        Telefono : telefono.value,
        correo: correo.value
    };

    
    datos[contador] = objetoDatos;

    
    //condicion para evitar que se repita la primera fila con cada evento del boton
        
    //se cera un nuevo elemento tr
    fila = document.createElement('tr');
    fila.setAttribute('id','fila' + contador);
    Tabla.appendChild(fila);

    //ciclo para recorrer los datos en el arreglo
    for(dato in datos[contador]){
        
        //se crea una nueva celad
        celda = document.createElement('td');
        //se le agrega un valor a la celda
        console.log("Segundo for" + datos[contador][dato]);
        celda.innerHTML = datos[contador][dato];
        //se agrega la celda a la fila
        fila.appendChild(celda);
    } 

    //creacion de un elemento boton para la eliminaion de los registros
    let boton = document.createElement('button');
    //se le agreag un valor al elemento
    boton.innerText = 'Eliminar';
    // se agrega un atrivito class con valor eliminar
    boton.setAttribute('class',"btn btn-danger");
    //se agreag un evento al boton y una funcion
    boton.setAttribute('onClick','Eliminar(event)')
    // se agrega elemento a la fila
    fila.appendChild(boton);


    //se define si el navegador soporta localstorage 
    if(typeof(Storage) !== 'undefined'){
        // se manda el arreglo de objetos al storage con id Datos
        localStorage.setItem("Datos",JSON.stringify(datos));
    }else{
        alert('Localstorage no disponible para este navegador');
    }

    document.getElementById('NumeroCuenta').value = "";
    document.getElementById('Nombre').value = "";
    document.getElementById('Apellidos').value = "";
    document.getElementById('FechaNacimiento').value = "";
    document.getElementById('Telefono').value = "";
    document.getElementById('correo').value = "";
    document.getElementById('NumeroCuenta').focus();

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
    
    datosCache.push(datos[hijo[0].parentNode.rowIndex -1]);
    datos.splice(hijo[0].parentNode.rowIndex -1 ,1);
    //se elimina de la tabla el hijo seleccionado, en este caso el padre el elemento boton
    Tabla.removeChild(padre);

    //se recorre el arreglo para identificar el primer espacio vacio e iniciar el contador en esa pocicsion
    for(let i=0;i<=contador;i++){
        if (datos[i] == null){
            contador = i;
        }
    }

    localStorage.setItem('Cache',JSON.stringify(datosCache));
    localStorage.setItem('Datos',JSON.stringify(datos));
    contadorCache++;
}

function Cargar(){
    Tabla.innerHTML = "";
    btnBorrarCache.hidden = true;
    btnNuevoRegistro.hidden = false;
    document.getElementById('NumeroCuenta').focus();
    if(typeof(Storage) !== 'undefined'){
        // se manda el arreglo de objetos al storage con id Datos
        if(localStorage.getItem('Datos') != null){
            datos = JSON.parse(localStorage.getItem('Datos'));
            //condicion para evitar que se repita la primera fila con cada evento del boton
          
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

                if(datos[i][dato] == null || datos[i][dato] == undefined ){
                    return;
                }
                contador = i +1 ;
                //creacion de un elemento boton para la eliminaion de los registros
                let boton = document.createElement('button');
                //se le agreag un valor al elemento
                boton.innerText = 'Eliminar';
                // se agrega un atrivito class con valor eliminar
                boton.setAttribute('class','btn btn-danger');
                //se agreag un evento al boton y una funcion
                boton.setAttribute('onClick','Eliminar(event)')
                // se agrega elemento a la fila
                fila.appendChild(boton);
            } 

            
    
        }
    }else{
        alert('Localstorage no disponible para este navegador');
    }
}

function VaciarCache(){
    localStorage.removeItem('Cache');
    datosCache = [];
    papelera();
}

function papelera() {
    btnBorrarCache.removeAttribute("hidden");
    btnNuevoRegistro.hidden = true;
    Tabla.innerHTML = " ";
    
    if(localStorage.getItem('Cache') != null){
        datosCache = JSON.parse(localStorage.getItem('Cache'));

        for(i=0; i<datosCache.length; i++){
            //se cera un nuevo elemento tr
            fila = document.createElement('tr');
            //fila.setAttribute('id','fila' + i);
            Tabla.appendChild(fila);

            for (const dato in datosCache[i]) {
                console.log(dato);
                //se crea una nueva celad
                celda = document.createElement('td');
                //se le agrega un valor a la celda
                celda.innerHTML = datosCache[i][dato];
                //se agrega la celda a la fila
                fila.appendChild(celda);
            }

            //creacion de un elemento boton para la eliminaion de los registros
            let boton = document.createElement('button');
            //se le agreag un valor al elemento
            boton.innerText = 'Restaurar';
            // se agrega un atrivito class con valor eliminar
            boton.setAttribute('class',"btn btn-success");
            //se agreag un evento al boton y una funcion
            boton.setAttribute('onClick','Restaurar(event)')
            // se agrega elemento a la fila
            fila.appendChild(boton);

        }
        
    }   
}

function Restaurar(event){
    if(localStorage.getItem('Datos') != null){
        datos = JSON.parse(localStorage.getItem('Datos'));
    }
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
    datos.push(datosCache[hijo[0].parentNode.rowIndex -1]);
    datosCache.splice(hijo[0].parentNode.rowIndex -1 ,1);
    //se elimina de la tabla el hijo seleccionado, en este caso el padre el elemento boton
    Tabla.removeChild(padre);
    localStorage.setItem('Datos',JSON.stringify(datos));
    localStorage.setItem('Cache',JSON.stringify(datosCache));
}
