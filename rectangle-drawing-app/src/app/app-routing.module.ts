import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RectangleComponent } from './rectangle/rectangle.component';

const routes: Routes = [
  { path: 'rectangle', component: RectangleComponent },
  { path: '', redirectTo: '/rectangle', pathMatch: 'full' }, // Default route redirects to RectangleComponent
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
