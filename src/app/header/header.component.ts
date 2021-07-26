import { Component, OnInit } from '@angular/core';

import { DataStorageService } from '../share-between/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed: Boolean;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  onSaveRecipes() {
    this.dataStorageService.saveRecipes();
  }

}
