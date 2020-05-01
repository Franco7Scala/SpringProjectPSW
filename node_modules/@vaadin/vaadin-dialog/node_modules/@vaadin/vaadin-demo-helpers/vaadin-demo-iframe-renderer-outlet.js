class VaadinDemoIframeRendererOutlet extends HTMLElement {
  constructor() {
    super();
    this.__windowMessageListener = this._onWindowMessage.bind(this);
    this.__windowPopstateListener = this._onWindowPopstate.bind(this);

    this.__webComponentsReady = new Promise((resolve, reject) => {
      if (window.WebComponents.ready) {
        resolve();
      } else {
        const onWebComponentsReady = () => {
          document.removeEventListener('WebComponentsReady', onWebComponentsReady);
          resolve();
        };

        document.addEventListener('WebComponentsReady', onWebComponentsReady);
      }
    });
  }

  connectedCallback() {
    this.history = [window.location.pathname];
    this.historyIdx = 0;
    this.historyIdxUpdated = false;

    window.addEventListener('message', this.__windowMessageListener);
    window.addEventListener('popstate', this.__windowPopstateListener);

    // notify the parent that the iframe renderer is ready
    this._postPopstateMessage();
  }

  disconnectedCallback() {
    window.removeEventListener('message', this.__windowMessageListener);
    window.removeEventListener('popstate', this.__windowPopstateListener);
  }

  _postMessage(type, detail) {
    window.parent.postMessage({
      type: type,
      id: window.frameElement.name,
      detail: detail
    }, window.location.origin);
  }

  _postPopstateMessage() {
    this._postMessage('iframe-popstate', {
      pathname: window.location.pathname,
      hasBack: this.historyIdx > 0,
      hasForward: this.historyIdx < this.history.length - 1
    });
  }

  _onWindowMessage(event) {
    if (event.origin === window.location.origin) {
      switch (event.data.type) {
        case 'set-template':
          this.__webComponentsReady.then(() => {
            this._setDemoComponentsRoot();
            this.setInnerHtmlWithScripts(event.data.html);
            this.history = ['/'];
            this._activateHistoryEntry(0);
          });
          break;
        case 'set-url':
          this.history[this.historyIdx + 1] = event.data.url;
          this.history.length = this.historyIdx + 2; // truncate the array
          this._activateHistoryEntry(this.historyIdx + 1);
          break;
        case 'go-back':
          // do not use window.history.back() here because that could affect other iframes
          if (this.historyIdx > 0) {
            this._activateHistoryEntry(this.historyIdx - 1);
          }
          break;
        case 'go-forward':
          // do not use window.history.forward() here because that could affect other iframes
          if (this.historyIdx < this.history.length - 1) {
            this._activateHistoryEntry(this.historyIdx + 1);
          }
          break;
        default:
          // no-op
          // console.log(`unknown message type: ${event.data.type}`);
      }
    }
  }

  _activateHistoryEntry(historyIdx) {
    this.historyIdx = historyIdx;
    this.historyIdxUpdated = true;
    window.history.pushState(null, document.title, this.history[historyIdx]);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  _onWindowPopstate(event) {
    if (this.historyIdxUpdated) {
      this.historyIdxUpdated = false;
    } else {
      this.historyIdx += 1;
      this.history[this.historyIdx] = window.location.pathname;
      this.history.length = this.historyIdx + 1; // truncate the array
    }
    this._postPopstateMessage();
  }

  _setDemoComponentsRoot() {
    Vaadin.Demo = Vaadin.Demo || {};
    Vaadin.Demo.componentsRoot = window.frameElement.dataset.demoComponentsRoot;
  }

  setInnerHtmlWithScripts(html) {
    this.innerHTML = html;
    const scripts = this.querySelectorAll('script');
    for (let i = 0; i < scripts.length; i += 1) {
      const script = document.createElement('script');
      ['type', 'async', 'defer', 'noModule', 'text'].forEach(
        prop => script[prop] = scripts[i][prop]
      );
      if (scripts[i].src) {
        script.src = scripts[i].src;
      }
      scripts[i].parentNode.insertBefore(script, scripts[i]);
      scripts[i].parentNode.removeChild(scripts[i]);
    }
  }
}

window.customElements.define('vaadin-demo-iframe-renderer-outlet', VaadinDemoIframeRendererOutlet);
