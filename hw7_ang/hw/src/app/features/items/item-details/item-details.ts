import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ItemsService } from '../../../services/items';

@Component({
  selector: 'item-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-details.html',
  styleUrls: ['./item-details.css'] 
})
export class ItemDetails implements OnInit {
  item: any;
  loading = false;
  itemId!: number;

  constructor(
    private route: ActivatedRoute,// доступ к параметрам маршрута чтобы узнать какой товар выбран
    private itemsSvc: ItemsService,// сервис для работы с апи чтобы получить данные товара 
    private location: Location//сервис управляющий историей браузера 
  ) {}
//3
  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');//paramMap.get('id') — достаёт параметр :id из URL.
    const id = Number(idParam); 
    this.itemId = id;
    if (!isNaN(id)) {
      this.loading = true;
      this.itemsSvc.getItemById(id).subscribe({
        next: (data) => {
          this.item = data;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    }
  }

  back() {
    this.location.back();
  }
}
