import Component from '@ember/component';

import createFocusTrap from 'focus-trap';

import layout from './epm-modal';

export default Component.extend({
  layout,
  classNames: ['epm-modal'],

  didInsertElement() {
    this._super(...arguments);

    this.focusTrap = createFocusTrap(this.element, {
      clickOutsideDeactivates: false,
      // clickOutsideDeactivates: true,

      onDeactivate: () => {
        this.focusTrap.deactivate({ onDeactivate: null });
        this.modal.close();
      },
    });

    this.focusTrap.activate();
  },

  willRemoveElement() {
    if (this.focusTrap) {
      this.focusTrap.deactivate({ onDeactivate: null });
    }

    this._super(...arguments);
  },

  actions: {
    close(result) {
      this.focusTrap.deactivate({ onDeactivate: null });
      this.modal.close(result);
    },
  },
});
