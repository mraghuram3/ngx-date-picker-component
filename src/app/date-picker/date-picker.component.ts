import { Component, OnInit, EventEmitter, Output, Input, HostListener, ElementRef } from '@angular/core';
import * as moment_ from 'moment';

const moment = moment_;
@Component({
  selector: 'ngx-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  dropdown = false;
  today: Date = new Date();
  selecteddate: Date;
  selecteddateIntext = 'DD/MM/YYYY';
  selectedDateDisplayFormat = 'DD/MM/YYYY';
  _mode = 'dropdown';

  @Input('mode')
  set mode(mode: string) {
    this._mode = mode;
  }

  @Input('format')
  set format(format: string) {
    this.selectedDateDisplayFormat = format;
    if (this.selecteddate != null ) {
      this.selecteddateIntext = moment(this.selecteddate).format(this.selectedDateDisplayFormat);
    } else {
      this.selecteddateIntext = format;
    }
  }



  @Output()
  selected: EventEmitter<Date> = new EventEmitter<Date>();
  currentMonth: number;
  currentMonthInWords: string;
  currentYear: number;
  monthArr: DateObject[] = [];
  week1: number[] = [];
  week2: number[] = [];
  week3: number[] = [];
  week4: number[] = [];
  week5: number[] = [];
  week6: number[] = [];

  start: any;
  end: any;

  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  weekObject: any[];

  constructor(private el: ElementRef) {
    this.today.setHours(0, 0, 0, 0);
    this.generateCurrent(this.today);
  }

  ngOnInit() {
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.dropdown = false;
    }
  }
  generateCurrent(currentday: Date) {
    this.currentMonth = moment(currentday).month() + 1;
    this.currentMonthInWords = this.monthNames[this.currentMonth - 1];
    this.currentYear = moment(currentday).year();
    this.start = moment(currentday).startOf('month');
    this.end = moment(currentday).endOf('month').subtract(1, 'days');
    this.generateDaysOfMonth();
  }

  generateDaysOfMonth() {
    let start = this.start;
    const end = this.end;
    this.monthArr = [];
    this.monthArr.push(this.createDateObj(start));
    while (start < end ) {
      start = moment(start).add(1, 'days');
      let dateobj = new DateObject();
      dateobj  = this.createDateObj(start);
      this.monthArr.push(dateobj);
    }
  //  console.log(this.monthArr);
    this.generateWeeks();
  }

  createDateObj(start: any): DateObject {
    const dateobj = new DateObject();
    dateobj.date = start.toDate();
    dateobj.weekDay = start.day();
    dateobj.day = start.date();
    dateobj.month = start.month();
    dateobj.year = start.year();
    return dateobj;
  }
  generateWeeks() {
    this.weekObject = [];
    this.weekObject.push([null, null, null, null, null, null, null]);
    this.weekObject.push([null, null, null, null, null, null, null]);
    this.weekObject.push([null, null, null, null, null, null, null]);
    this.weekObject.push([null, null, null, null, null, null, null]);
    this.weekObject.push([null, null, null, null, null, null, null]);
    this.weekObject.push([null, null, null, null, null, null, null]);
    const len = this.monthArr.length;
    let i = 0;
    let j = 0;
    for (let k = 0; k < len; k++) {
      const day = this.monthArr[k].weekDay;
      if (day === 6 ) {
        this.weekObject[i][day] = this.monthArr[k];
        i++;
      } else {
        this.weekObject[i][day] = this.monthArr[k];
      }
    }
    console.log(this.weekObject);
  }

  changeInYear() {
    this.start = moment(this.start).set('year', this.currentYear);
    this.generateCurrent(this.start);
  }
  increaseMonth() {
    this.start = moment(this.start).add(1, 'month');
    this.generateCurrent(this.start);
  }
  decreaseMonth() {
    this.start = moment(this.start).subtract(1, 'month');
    this.generateCurrent(this.start);
  }
  selectedDate(date: DateObject) {
    this.selecteddate = date.date;
    this.selected.emit( this.selecteddate );
    this.selecteddateIntext = moment(date.date).format(this.selectedDateDisplayFormat);
    this.dropdown = false;
  }


  toggle() {
    this.dropdown = !this.dropdown;
    console.log(this.dropdown);
  }
}


export class DateObject {
  date: Date;
  day: number;
  month: number;
  year: number;
  weekDay: number;
}