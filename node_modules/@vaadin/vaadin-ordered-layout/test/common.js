import { updateStyles } from '@polymer/polymer/lib/mixins/element-mixin.js';

export const getCoords = (node) => {
  const {top, right, bottom, left} = node.getBoundingClientRect();
  return {top, right, bottom, left};
};

export const getCustomCSSPropertyValue = (element, propertyName) => {
  return window.ShadyCSS
    ? window.ShadyCSS.getComputedStyleValue(element, propertyName)
    : getComputedStyle(element).getPropertyValue(propertyName);
};

export const getComputedCSSPropertyValue = (element, propertyName) => {
  const helper = element.cloneNode(true);
  helper.classList.add('helper');
  document.body.appendChild(helper);

  const customStyle = document.createElement('custom-style');
  const style = document.createElement('style');
  style.textContent = `.helper { width: var(${propertyName}) !important }`;
  customStyle.appendChild(style);
  document.body.appendChild(customStyle);
  updateStyles();

  const result = getComputedStyle(helper).width;
  document.body.removeChild(helper);
  document.body.removeChild(customStyle);

  return result;
};
