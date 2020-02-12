if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js').then(reg => console.log('Registro de SW Exitoso', reg)).catch(err => console.warn('Erro al tratar de registrar al SW', err));
}