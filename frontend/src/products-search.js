import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-text-field/src/vaadin-text-field.js';
import '@vaadin/vaadin-grid/src/vaadin-grid.js';
import '@vaadin/vaadin-ordered-layout/src/vaadin-horizontal-layout.js';
import '@polymer/iron-icon/iron-icon.js';

class ProductsSearch extends PolymerElement {

    static get template() {
        return html`
<style include="shared-styles">
                :host {
                    display: block;
                    height: 100%;
                }
            </style>
<vaadin-vertical-layout style="width: 100%; height: 100%;">
 <vaadin-vertical-layout class="content" style="width: 100%; flex-grow: 1; flex-shrink: 1; flex-basis: auto;">
  <vaadin-horizontal-layout theme="spacing" style="align-self: center; justify-content: center; margin: var(--lumo-space-s); padding: var(--lumo-space-s);">
   <vaadin-text-field placeholder="product name" id="productNameTextField"></vaadin-text-field>
   <vaadin-button theme="icon" aria-label="Add new" id="searchButton">
    <iron-icon icon="lumo:search"></iron-icon>
   </vaadin-button>
  </vaadin-horizontal-layout>
  <vaadin-grid id="searchResults" style="margin: var(--lumo-space-s); padding: var(--lumo-space-s);"></vaadin-grid>
 </vaadin-vertical-layout>
</vaadin-vertical-layout>
`;
    }

    static get is() {
        return 'products-search';
    }

    static get properties() {
        return {
            // Declare your properties here.
        };
    }
}

customElements.define(ProductsSearch.is, ProductsSearch);
