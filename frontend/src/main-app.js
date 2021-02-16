import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-ordered-layout/src/vaadin-horizontal-layout.js';
import '@vaadin/vaadin-app-layout/src/vaadin-app-layout.js';
import '@vaadin/vaadin-ordered-layout/src/vaadin-vertical-layout.js';
import '@vaadin/vaadin-tabs/src/vaadin-tabs.js';
import '@polymer/iron-pages/iron-pages.js';
import '@vaadin/vaadin-tabs/src/vaadin-tab.js';
import './user-registration.js'
import './products-search.js'


class MainApp extends PolymerElement {

    static get template() {
        return html`
<style include="shared-styles">
                :host {
                    display: block;
                    height: 100%;
                }
            </style>
<vaadin-vertical-layout style="width: 100%; height: 100%;">
 <vaadin-horizontal-layout class="header" style="width: 100%; flex-basis: var(--lumo-size-l); flex-shrink: 0; background-color: var(--lumo-contrast-10pct);">
  <label style="flex-grow: 1; text-align: center; align-self: center;">Fake Store</label>
 </vaadin-horizontal-layout>
 <vaadin-vertical-layout class="content" style="width: 100%; flex-grow: 1; flex-shrink: 1; flex-basis: auto;">
  <vaadin-tabs style="align-self: center;" orientation="horizontal" selected="{{page}}">
   <vaadin-tab selected>
     Home 
   </vaadin-tab>
   <vaadin-tab>
     Products 
   </vaadin-tab>
   <vaadin-tab>
     Users 
   </vaadin-tab>
  </vaadin-tabs>
  <vaadin-vertical-layout class="content" style="width: 100%; flex-grow: 1; flex-shrink: 1; flex-basis: auto;">
   <iron-pages selected="[[page]]" style="width: 100%;">
    <div style="width: 100%;">
     <h1 style="text-align: center;">Welcome to Fake Store!</h1>
    </div>
    <div>
     <products-search id="productsSearch"></products-search>
    </div>
    <div>
     <user-registration id="userRegistration"></user-registration>
    </div>
   </iron-pages>
  </vaadin-vertical-layout>
  <vaadin-horizontal-layout class="footer" style="width: 100%; flex-basis: var(--lumo-size-l); flex-shrink: 0; background-color: var(--lumo-contrast-10pct);"></vaadin-horizontal-layout>
 </vaadin-vertical-layout>
</vaadin-vertical-layout>
`;
    }

    static get is() {
        return 'main-app';
    }

    static get properties() {
        return {
            // Declare your properties here.
        };
    }
}

customElements.define(MainApp.is, MainApp);
