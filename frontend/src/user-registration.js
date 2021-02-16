import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-ordered-layout/src/vaadin-vertical-layout.js';
import '@vaadin/vaadin-button/src/vaadin-button.js';
import '@vaadin/vaadin-form-layout/src/vaadin-form-layout.js';
import '@vaadin/vaadin-text-field/src/vaadin-text-field.js';
import '@vaadin/vaadin-form-layout/src/vaadin-form-item.js';

class UserRegistration extends PolymerElement {


    static get template() {
        return html`
<style include="shared-styles">
                :host {
                    display: block;
                    height: 100%;
                }
            </style>
<vaadin-vertical-layout style="width: 100%; height: 100%;">
 <vaadin-form-layout style="margin: var(--lumo-space-s); padding: var(--lumo-space-s);" id="registrationForm">
  <vaadin-form-item>
   <label slot="label">Code</label>
   <vaadin-text-field class="full-width" required has-value invalid id="codeTextField"></vaadin-text-field>
  </vaadin-form-item>
  <vaadin-form-item>
   <label slot="label">First Name</label>
   <vaadin-text-field class="full-width" required has-value invalid id="firstNameTextField"></vaadin-text-field>
  </vaadin-form-item>
  <vaadin-form-item>
   <label slot="label">Last Name</label>
   <vaadin-text-field class="full-width" required has-value invalid id="lastNameTextField"></vaadin-text-field>
  </vaadin-form-item>
  <vaadin-form-item>
   <label slot="label">Email</label>
   <vaadin-text-field class="full-width" required has-value invalid id="emailTextField"></vaadin-text-field>
  </vaadin-form-item>
  <vaadin-form-item>
   <label slot="label">Telephone</label>
   <vaadin-text-field class="full-width" id="telephoneTextField"></vaadin-text-field>
  </vaadin-form-item>
  <vaadin-form-item>
   <label slot="label">Address</label>
   <vaadin-text-field class="full-width" id="addressTextField"></vaadin-text-field>
  </vaadin-form-item>
  <vaadin-form-item>
   <vaadin-button theme="primary" id="submitButton" style="flex-grow: 0; flex-shrink: 1; align-self: center;">
     Submit 
   </vaadin-button>
   <label id="resultLabel"></label>
  </vaadin-form-item>
 </vaadin-form-layout>
</vaadin-vertical-layout>
`;
    }

    static get is() {
        return 'user-registration';
    }

    static get properties() {
        return {
            // Declare your properties here.
        };
    }
}

customElements.define(UserRegistration.is, UserRegistration);
