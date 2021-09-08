import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Meal } from 'src/app/models/meal';
import { Data } from 'src/app/models/data';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {
  @Input() fromParent: any;
  data: Data = {
    title: '',
    action: '',
    id: 0,
    name: '',
    count: 0,
  };
  name: string = '';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.data = {
      title: this.fromParent.title,
      action: this.fromParent.action,
      id: this.fromParent.id,
      name: this.fromParent.name,
      count: this.fromParent.count,
    }
    this.name = this.fromParent.name;
  }

  deliveDataToParent(){
    this.data.name = this.name;
    this.activeModal.close(this.data);
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }
}
