import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.css'],
})
export class MainCategoryComponent implements OnInit {
  totalGlobal: number = 0;
  totalPerSecond: number = 0;
  clickValue: number = 0;
  perClick: number = 0;
  perSecond: number = 0;
  titlesList: string[] = ['pains', 'pains par seconde', 'pain', 'pain par seconde', 'pain par clic', 'pains par clic', 'Boutique de bonus'];
  breadClicker: string[] = ['assets/img/bread.png', 'Tranche de pain', 'assets/img/bread_boosted.png', 'Tranche de pain x2'];
  categories: { id: number; name: string; price: number; inactive: boolean }[] =
    [];
  descCategories: {
    id: number;
    name: string;
    total: number;
    eachSecond: number;
  }[] = [];
  intervalId = setInterval(() => {
    this.addBreadPerSecondToTotal();
  }, 1000);
  bonusShop: {
    name: string;
    iconPath: string;
    price: number;
    desc: string;
    active: boolean;
    bought: boolean;
  }[] = [];
  constructor() {
    this.clickValue = 1;
    this.perClick = 1;
    this.perSecond = 1;
    this.descCategories = [
      { id: 0, name: 'Clics', total: 0, eachSecond: 0 },
      { id: 1, name: 'Employé(e)s', total: 0, eachSecond: 0 },
      { id: 2, name: 'Fournisseurs', total: 0, eachSecond: 0 },
      { id: 3, name: 'Nouvelles recettes', total: 0, eachSecond: 0 },
      { id: 4, name: 'Succursales', total: 0, eachSecond: 0 },
    ];
    this.categories = [
      { id: 0, name: 'Clic', price: 10, inactive: true },
      { id: 1, name: 'Employé(e)', price: 500, inactive: true },
      { id: 2, name: 'Fournisseur', price: 3000, inactive: true },
      { id: 3, name: 'Nouvelle recette', price: 15000, inactive: true },
      { id: 4, name: 'Succursale', price: 100000, inactive: true },
    ];
    this.bonusShop = [
      {
        name: 'add',
        iconPath: 'assets/icons/plus.png',
        price: 500,
        desc: "Icon du symbole de l'addition",
        active: false,
        bought: false,
      },
      {
        name: 'multiply',
        iconPath: 'assets/icons/multiply.png',
        price: 5000,
        desc: 'Icon du symbole de la multiplication',
        active: false,
        bought: false,
      },
      {
        name: 'recipes',
        iconPath: 'assets/icons/wheat.png',
        price: 50000,
        desc: 'Icon du symbole du blé',
        active: false,
        bought: false,
      },
      {
        name: 'exportation',
        iconPath: 'assets/icons/plane.png',
        price: 500000,
        desc: "Icon du symbole de l'avion",
        active: false,
        bought: false,
      },
    ];
  }

  ngOnInit(): void { }

  onClickBread(): void {
    this.totalGlobal += this.clickValue * this.perClick;
    this.checkIfActive();
  }

  buyItem(itemId: number): void {
    this.totalGlobal -= this.categories[itemId].price;
    this.categories[itemId].price = Math.round(this.categories[itemId].price + (this.categories[itemId].price * 7.5 / 100));
    this.descCategories[itemId].total++;
    if (this.descCategories[itemId].name != "Clics") {
      this.descCategories[itemId].eachSecond = 5 * Math.pow(2, itemId) * this.descCategories[itemId].total;
      this.totalPerSecond += 5 * Math.pow(2, itemId);
    }
    else {
      this.clickValue++;
    }
    this.checkIfActive();
  }

  addBreadPerSecondToTotal(): void {
    if (this.totalPerSecond > 0) {
      this.totalGlobal += this.totalPerSecond * this.perSecond;
    }
    this.checkIfActive();
  }

  checkIfActive(): void {
    for (let button of this.categories) {
      if (button.price <= this.totalGlobal) button.inactive = false;
      else button.inactive = true;
    }
    for (let button of this.bonusShop) {
      if (button.price <= this.totalGlobal && !button.bought) button.active = true;
      else button.active = false;
    }
  }
  buyBonus(itemName: string): void {
    switch (itemName) {
      case 'add':
        if (!this.bonusShop[0].bought && this.totalGlobal - this.bonusShop[0].price >= 0) {
          this.totalGlobal = this.totalGlobal - this.bonusShop[0].price + 1500;
          this.bonusShop[0].bought = true;
          this.bonusShop[0].active = true;
        }
        break;

      case 'multiply':
        if (!this.bonusShop[1].bought && this.totalGlobal - this.bonusShop[1].price >= 0) {
          this.totalGlobal = this.totalGlobal - this.bonusShop[1].price;
          this.perClick = 2;
          this.bonusShop[1].bought = true;
          this.bonusShop[1].active = true;
        }
        break;

      case 'recipes':
        if (!this.bonusShop[2].bought && this.totalGlobal - this.bonusShop[2].price >= 0) {
          this.totalGlobal = this.totalGlobal - this.bonusShop[2].price;
          for(let category of this.descCategories){
            category.total *= 5;
          }
          this.bonusShop[2].bought = true;
          this.bonusShop[2].active = true;
        }
        break;

      case 'exportation':
        if (!this.bonusShop[3].bought && this.totalGlobal - this.bonusShop[3].price >= 0) {
          this.totalGlobal = this.totalGlobal - this.bonusShop[3].price;
          this.perSecond = 2;
          this.bonusShop[3].bought = true;
          this.bonusShop[3].active = true;
        }
        break;
    }
    this.checkIfActive();
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
