var emitted = [];

window.addDemoReadyListener = function(demoId, callback) {
  const listenerFunction = function(evt) {
    const snippet = evt.detail.host.shadowRoot.querySelector(demoId);
    const sdRenderer = snippet.shadowRoot.querySelector('vaadin-demo-shadow-dom-renderer');
    if (sdRenderer) {
      window.removeEventListener('VaadinDemoReady', listenerFunction);
      emitted.push(demoId);
      callback(sdRenderer.shadowRoot, snippet.querySelector('template').content);
    }
  };

  window.addEventListener('VaadinDemoReady', listenerFunction);
};

window.DemoReadyEventEmitter = superClass => {
  return class extends superClass {
    ready() {
      super.ready();
      // We need to delay since `ready` is executed before `_showDemo` and script tags
      // might not be loaded yet (non Chrome browsers);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('VaadinDemoReady', {
          bubbles: true,
          detail: {host: this}
        }));
      }, 50);
    }
  };
};

