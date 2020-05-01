import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { LightDomHelper } from './vaadin-light-dom-helper.js';
import { html as html$0 } from '@polymer/polymer/lib/utils/html-tag.js';
let instanceIndex = 0;
class VaadinDemoIframeRenderer extends PolymerElement {
  static get template() {
    return html$0`
    <style>
      :host {
        display: flex;
        flex-direction: column;
      }

      .toolbar {
        flex: none;
        display: flex;
        background-color: #f2f3f7;
        border-bottom: 1px solid #ced0dd;
        padding: 0.8rem 1rem .8rem .8rem;
      }

      [hidden] {
        display: none;
      }

      .back,
      .forward,
      .url {
        flex: none;
        height: 30px;
        box-sizing: border-box;
      }

      .back,
      .forward {
        line-height: 33px;
        background: #f2f3f7;
        border: none;
        width: 30px;
        transition: all ease-in .1s;
      }

      .forward {
        /* give space for the focus outline ring (chrome) */
        margin-left: 5px;
      }

      .back:hover,
      .forward:hover {
        background: #dfe1ea;
        border-radius: 3px;
      }

      .back[disabled],
      .forward[disabled] {
        opacity: .5;
      }

      .back[disabled]:hover,
      .forward[disabled]:hover {
        background: none;
      }

      .back svg,
      .forward svg {
        width: 14px;
        height: auto;
      }

      .url {
        flex-grow: 1;
        border-radius: 3px;
        outline: none;
        box-shadow: none;
        border: 1px solid #ced0dd;
        padding: 5px 10px;
        line-height: 30px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 14px;
        margin-left: 10px;
        transition: all ease-in .1s;
      }

      .url:focus {
        border: 1px solid #9ec5ef;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .08);
      }

      #demo {
        flex: auto;
        display: block;
        width: 100%;
        border: 0;
      }
    </style>

    <div class="toolbar" hidden\$="[[noToolbar]]">
      <button class="back" disabled="[[!hasBack]]" on-click="_onBackClicked">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
          <title>icon-arrow-left</title>
          <polyline points="20.6 8 5.62 24.1 20.6 40.2" fill="none" stroke="#686f75" stroke-linecap="round" stroke-miterlimit="10" stroke-width="6"></polyline>
          <line x1="7.53" y1="24.1" x2="42.33" y2="24.1" fill="none" stroke="#686f75" stroke-linecap="round" stroke-miterlimit="10" stroke-width="6"></line>
        </svg>

      </button>
      <button class="forward" disabled="[[!hasForward]]" on-click="_onForwardClicked">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
          <title>icon-arrow-right</title>
          <polyline points="27.35 40.2 42.33 24.1 27.35 8" fill="none" stroke="#686f75" stroke-linecap="round" stroke-miterlimit="10" stroke-width="6"></polyline>
          <line x1="40.42" y1="24.1" x2="5.62" y2="24.1" fill="none" stroke="#686f75" stroke-linecap="round" stroke-miterlimit="10" stroke-width="6"></line>
        </svg>
      </button>
      <input class="url" value="[[url]]" on-change="_onUrlEdited">
    </div>

    <iframe id="demo" name="[[id]]" src="[[src]]" data-demo-components-root\$="[[demoComponentsRoot]]"></iframe>
`;
  }

  static get is() {
    return 'vaadin-demo-iframe-renderer';
  }

  static get properties() {
    return {
      id: {
        type: String,
        value: () => {
          return `vaadin-demo-iframe-${instanceIndex++}`;
        }
      },
      demoComponentsRoot: {
        type: String
      },
      src: {
        type: String,
        value: 'about:blank'
      },
      url: {
        type: String,
        value: '/'
      },
      hasBack: Boolean,
      hasForward: Boolean,
      noToolbar: Boolean
    };
  }

  constructor() {
    super();
    this.__windowMessageListener = this._onWindowMessage.bind(this);
    this.__iframeReady = new Promise((resolve, reject) => {
      this.__resolveIframeReady = resolve;
      this.__rejectIframeReady = reject;
    });
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('message', this.__windowMessageListener);
  }

  disconnectedCallback() {
    window.removeEventListener('message', this.__windowMessageListener);
    super.disconnectedCallback();
  }

  ready() {
    super.ready();
    LightDomHelper.querySelectorAsync('slot', this)
      .then(slot => {
        return LightDomHelper.querySlotContentAsync('template', slot);
      })
      .then(template => {
        this._showDemo(template);
      })
      .catch(error => {
        throw new Error('vaadin-demo-iframe-renderer requires a <template> child');
      });
  }

  _postIframeMessage(message) {
    this.__iframeReady.then((iframe) => {
      iframe.contentWindow.postMessage(message, window.location.origin);
    }).catch((error) => {
      console.error(`demo iframe failed to load: ${error}`);
    });
  }

  _onWindowMessage(event) {
    if (event.origin === window.location.origin &&
        event.data.type === 'iframe-popstate' &&
        event.data.id === this.id) {
      this.__resolveIframeReady(this.$.demo);

      const detail = event.data.detail;
      this.url = detail.pathname;
      this.hasBack = detail.hasBack;
      this.hasForward = detail.hasForward;
    }
  }

  _onBackClicked() {
    this._postIframeMessage({type: 'go-back'});
  }

  _onForwardClicked() {
    this._postIframeMessage({type: 'go-forward'});
  }

  _onUrlEdited(event) {
    let url = (event.target.value || '').trim();
    if (url === '') {
      url = '/';
    }
    event.target.value = url;
    this._postIframeMessage({type: 'set-url', url: url});
  }

  _showDemo(template) {
    this._postIframeMessage({type: 'set-template', html: template.innerHTML});
  }
}
customElements.define(VaadinDemoIframeRenderer.is, VaadinDemoIframeRenderer);
