import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.html',
  styleUrl: './item-card.css'
})
export class ItemCard {
  @Input() item: any;

  constructor(private router: Router) {}
//2
  open() {
    this.router.navigateByUrl(`/items/${this.item.id}`); //перенаправляет юзера на другую страницу 
  }
}