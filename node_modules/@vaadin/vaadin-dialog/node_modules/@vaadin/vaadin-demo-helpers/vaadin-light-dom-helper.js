import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';

export const LightDomHelper = {
  querySelectorAsync(selector, context) {
    if (!context) {
      context = document;
    }
    return new Promise((resolve, reject) => {
      const element = context.querySelector(selector);
      if (element) {
        resolve(element);
      } else {
        const observer = new MutationObserver(() => {
          const element = context.querySelector(selector);
          if (element) {
            observer.disconnect();
            resolve(element);
          } else {
            reject('no element matched the selector even after the first observed mutation');
          }
        });
        observer.observe(context, {childList: true});
      }
    });
  },

  querySlotContentAsync(selector, slot) {
    const matchesFn = HTMLElement.prototype.matches
      ? HTMLElement.prototype.matches
      : HTMLElement.prototype.msMatchesSelector;

    const query = (slot, selector) => {
      const assignedNodes = slot.assignedNodes();
      for (let i = 0; i < assignedNodes.length; i += 1) {
        const element = assignedNodes[i];
        if (element instanceof HTMLElement && matchesFn.call(element, selector)) {
          return element;
        }
      }

      return null;
    };

    return new Promise((resolve, reject) => {
      const element = query(slot, selector);
      if (element) {
        resolve(element);
      } else {
        const observer = new FlattenedNodesObserver(slot, (info) => {
          const element = query(slot, selector);
          if (element) {
            observer.disconnect();
            resolve(element);
          } else {
            reject('no element matched the selector even after the first observed mutation');
          }
        });
      }
    });
  }
};
