registerServiceWorker = () => {
  if (!navigator.serviceWorker) return;

  navigator.serviceWorker.register('js/service_woker.js').then(function(reg) {
    console.log('hava worker');
  });
}