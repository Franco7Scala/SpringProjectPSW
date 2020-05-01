(() => {
  window.Vaadin = window.Vaadin || {};
  Vaadin.Demo = Vaadin.Demo || {};
  Vaadin.Demo.moduleStorage = Vaadin.Demo.moduleStorage || [];

  Vaadin.Demo.import = url => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;

      script.onload = () => {
        document.body.removeChild(script);
        resolve(Vaadin.Demo.moduleStorage.pop());
      };

      script.onerror = () => {
        document.body.removeChild(script);
        reject(new Error('Failed to load module script with URL ' + url));
      };

      document.body.appendChild(script);
    });
  };
})();
