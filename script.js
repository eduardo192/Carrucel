if('serviceWorker' in navigator){

    
        navigator.serviceWorker.register('/sw.js')
        .then((registration) => console.log("Registrado: " + registration.scope))
        .catch((error) => console.error(error));
}

// CHECAR LINK https://medium.com/samsung-internet-dev/pwa-series-service-workers-los-b%C3%A1sicos-de-la-experiencia-offline-14592542c738