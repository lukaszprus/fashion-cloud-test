import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { TileComponent } from './tile/tile.component';
import { DetailComponent } from './detail/detail.component';
import { SorterComponent } from './sorter/sorter.component';
import { FiltersComponent } from './filters/filters.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    TileComponent,
    DetailComponent,
    SorterComponent,
    FiltersComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
