import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from '../modals/modal/modal.component';
import { MealService } from './meals.service';
import { MessageService } from '../service/message.service';
import { Meal } from '../models/meal';
import { Data } from '../models/data';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit {
  mealList: Meal[] = [];
  selectedMeal?: Meal;
  data?: Data;
  quantityMeal: number = 0;

  constructor(private mealService: MealService,
    private messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openAddNewModal() {
    this.data = { title: 'Add New', action: 'add', id: 0, name: '', count: 0 }
    this.openModal();
  }

  openEditModal(id: number) {
    let _i = this.mealList.findIndex(x => x.id === id);
    this.selectedMeal = this.mealList[_i];
    this.data = {
      title: 'Edit Meal', action: 'edit',
      id: this.selectedMeal.id, name: this.selectedMeal.name, count: this.selectedMeal.count
    }
    this.openModal();
  }

  openDeleteModal(id: number) {
    let _i = this.mealList.findIndex(x => x.id === id);
    this.selectedMeal = this.mealList[_i];
    this.data = {
      title: 'Delete', action: 'delete',
      id: this.selectedMeal.id, name: this.selectedMeal.name, count: this.selectedMeal.count
    }
    this.openModal();
  }

  openModal() {
    const modalRef = this.modalService.open(ModalComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
      });

    modalRef.componentInstance.fromParent = this.data;
    modalRef.result.then((result) => {
      switch (result.action) {
        case 'add': {
          this.addMeal(result.name)
          break;
        }
        case 'edit': {
          this.updateMeal(result);
          break;
        }
        case 'delete': {
          this.deleteMeal(result);
          break;
        }
        default: {
          break;
        }
      }

    }, (reason) => {
    });
  }

  addMeal(name: string) {
    if (name === '' || this.mealList.find(x => x.name === name) != null) {
      this.onReset({mess: 'The name is null or has existed', kindMess: 'alert-danger'})
      
      return
    }
    this.mealService.searchMeal(name).subscribe((data: any) => {
      this.quantityMeal += 1;
      let _count = 0;
      if (data.meals != null) {
        _count = data.meals.length;
      }
      this.mealList.push({ 'id': this.quantityMeal, 'name': name, 'count': _count });
      this.onReset({mess: `The meal ${name} has been created`, kindMess: 'alert-info'})
    });
  }

  updateMeal(result: Data) {
    let _newName = result.name
    let _count = 0;
    let _i = this.mealList.findIndex(x => x.id === result.id);
    console.log(result);
    if (result.name === null || result.name === '') {
      this.onReset({mess: `Please check again, the system found that the meal is null`, kindMess: 'alert-danger'});
      return;
    } else if (this.mealList[_i].name === _newName
      || this.mealList.find(x => x.name === result.name) != null) {
      this.onReset({mess: `Please check again, the system found that the meal name ${this.mealList[_i].name} has nothing update or the name you change has already existed`, kindMess: 'alert-danger'});
      return;
    } else {
      this.mealService.searchMeal(_newName).subscribe((data: any) => {
        if (data.meals != null) {
          _count = data.meals.length;
        }
        this.mealList[_i].name = _newName;
        this.mealList[_i].count = _count;
        this.onReset({mess: `The meal name ${result.name} updated `, kindMess: 'alert-info'});
      });
    }
  }

  deleteMeal(result: Data) {
    let _i = this.mealList.findIndex(x => x.id === result.id);
    this.mealList.splice(_i, 1);
    this.onReset({mess: `The meal name ${result.name} deleted `, kindMess: 'alert-info'})
    console.log(this.mealList);
  }

  onReset(data: any) {
    this.messageService.add(data);
  }
}
