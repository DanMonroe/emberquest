import Component from '@glimmer/component';
import {action} from '@ember/object';

export default class ConfirmationDialogComponent extends Component {

  prompt = null;
  confirmDisabled = false;
  cancelDisabled = false;
  showBusy = false;

  @action
  cancel() {
    if (this.args.onCancel) {
      this.args.onCancel();
    }
  }

  @action
  confirm() {
    if (this.args.onConfirm) {
      this.args.onConfirm();
    }
  }
}
