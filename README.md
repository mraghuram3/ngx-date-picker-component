# ngx-date-picker-component

Angular Directive to add virtual scroll.

Live Demo : https://mraghuram3.github.io/#/ngx-date-picker-component

## Installation

To install this library, run:

```bash
$ npm install ngx-date-picker-component --save
```


## Usage

Import `NgxDatePickerModule ` in the root module

```ts
import { NgxDatePickerModule  } from 'ngx-date-picker-component';

@NgModule({
  imports: [
    // ...
    NgxDatePickerModule,
    ...
  ]
})
```

In your template

```html
<ngx-date-picker [mode]="'dropdown'" [format]="'DD-MM-YYYY'" (selected)="selectedDate($event)"></ngx-date-picker>
```

- **[mode]**: string.

  'dropdown' and 'inline' can be passed to enable respective mode.

- **[format]**: string.

  To change the date format of the displayed selected date. 

- **(selected)="selectedDate($event)"**:

  On selecting a date event with the selected date object will be emitted. 


## License

MIT © [Raghu Ram M](mailto:mraghuram3@gmail.com)