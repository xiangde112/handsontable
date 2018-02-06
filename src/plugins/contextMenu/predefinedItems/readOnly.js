import { checkSelectionConsistency, markLabelAsSelected } from './../utils';
import * as C from './../../../i18n/constants';

export const KEY = 'make_read_only';

export default function readOnlyItem() {
  return {
    key: KEY,
    name() {
      let label = this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_READ_ONLY);
      let atLeastOneReadOnly = checkSelectionConsistency(this.getSelectedRange(), (row, col) => this.getCellMeta(row, col).readOnly);

      if (atLeastOneReadOnly) {
        label = markLabelAsSelected(label);
      }

      return label;
    },
    callback() {
      let range = this.getSelectedRange();
      let atLeastOneReadOnly = checkSelectionConsistency(range, (row, col) => this.getCellMeta(row, col).readOnly);

      range.forAll((row, col) => {
        this.setCellMeta(row, col, 'readOnly', !atLeastOneReadOnly);
      });
      this.render();
    },
    disabled() {
      return !(this.getSelectedRange() && !this.selection.selectedHeader.corner);
    },
  };
}
