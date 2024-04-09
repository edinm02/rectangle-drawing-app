import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RectangleComponent } from './rectangle/rectangle.component';


@NgModule({
  declarations: [AppComponent, RectangleComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule], 
  bootstrap: [AppComponent]
})
export class AppModule {}
