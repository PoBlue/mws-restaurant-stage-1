registerServiceWorker = () => {
    if (!navigator.serviceWorker) return;

    navigator.serviceWorker.register('service_woker.js').then(function (reg) {
        console.log('hava worker');
    }).catch(function (error) {
        console.log('Registration Service work failed with' + error);
    });
}