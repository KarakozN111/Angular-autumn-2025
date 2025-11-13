import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ItemsService } from '../../../services/items';
import { ItemCard } from '../item-card/item-card';

@Component({
  selector: 'items-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemCard, RouterLink],
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css']
})
export class ItemsList implements OnInit {
  items: any[] = [];
  q = '';
  loading = false;

  constructor(private itemsSvc: ItemsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.q = params.get('q') || '';
      this.fetch();
    });
  }

  fetch() {
    this.loading = true;
    this.itemsSvc.getItems(this.q).subscribe(data => {
      this.items = data;
      this.loading = false;
    });
  }

  onSearch(term: string) {
    this.router.navigate([], { queryParams: { q: term || null }, queryParamsHandling: 'merge' });
  }
}
