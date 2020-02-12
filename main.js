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


    adelante.addEventListener('click', () =>{
        direccion = 'D';
        Imagen(1);
    });


    atras.addEventListener('click', ()=>{
        direccion = 'A';
        Imagen(-1);
    });

    function Imagen (incremento) {
        cont += incremento;      
        if(cont < 0) cont = 4;
        if(cont > 4) cont = 0;
        console.log('imagen' + (cont+1));
        img.src = imagenes[cont ];
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
    