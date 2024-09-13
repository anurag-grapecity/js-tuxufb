import '@mescius/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexGrid, DataMap } from '@mescius/wijmo.grid';
import {
  InputDate,
  InputTime,
  InputNumber,
  InputColor,
  ComboBox,
  AutoComplete,
  InputMask,
  MultiSelect,
} from '@mescius/wijmo.input';
import { getData, getCountries, getProducts, getNames } from './data';
import './styles.css';

document.readyState === 'complete' ? init() : (window.onload = init);
function init() {
  const flexGrid = new FlexGrid('#theGrid', {
    showMarquee: true,
    selectionMode: 'MultiRange',
    alternatingRowStep: 0,
    autoGenerateColumns: false,
    columns: [
      { header: 'ID', binding: 'id', width: 80, isReadOnly: true },
      {
        header: 'Date',
        binding: 'date',
        format: 'd',
        editor: new InputDate(document.createElement('div')),
      },
      {
        header: 'Time',
        binding: 'time',
        format: 't',
        editor: new InputTime(document.createElement('div'), {
          isEditable: true,
          format: 't',
          step: 30,
        }),
      },
      {
        header: 'Country',
        binding: 'country',
        editor: new ComboBox(document.createElement('div'), {
          itemsSource: getCountries(),
        }),
      },
      {
        header: 'Product',
        binding: 'productId',
        dataMap: new DataMap(getProducts(), 'id', 'name'),
        editor: new AutoComplete(document.createElement('div'), {
          itemsSource: getProducts(),
          selectedValuePath: 'id',
          displayMemberPath: 'name',
        }),
      },
      {
        header: 'Names',
        binding: 'name',
        width: 250,
        editor: new MultiSelect(document.createElement('div'), {
          itemsSource: getNames(),
          showSelectAllCheckbox: true,
        }),
      },
      {
        header: 'Phone',
        binding: 'phone',
        editor: new InputMask(document.createElement('div'), {
          mask: '(000) 000-0000',
        }),
      },
      {
        header: 'Color',
        binding: 'color',
        cellTemplate:
          '<span class="colorbox" style="background:${text};"></span> ${text}',
        editor: new InputColor(document.createElement('div')),
      },
      {
        header: 'Amount',
        binding: 'amount',
        format: 'n2',
        editor: new InputNumber(document.createElement('div'), {
          format: 'n2',
          step: 10,
          min: 0,
          max: 10000,
        }),
      },
      {
        header: 'Premium',
        binding: 'premium',
        cssClass: 'switch',
      },
    ],
    itemsSource: getData(),
  });

  flexGrid.columns.forEach((column) => {
    if (column.editor && column.editor.valueChanged) {
      column.editor.valueChanged.addHandler((s, e) => {
        if (s.isDroppedDown) {
          flexGrid.finishEditing();
        }
      });
    }
  });
}
