import { Component, OnInit } from '@angular/core';
import { RectangleConfigService } from '../services/rectangle-config.service.js';
import { RectangleDimensions } from './rectangle-dimensions.model';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.css']
})
export class RectangleComponent implements OnInit {
  loadingError: boolean = false; 
  errorOnSavingDimensions: boolean = false;
  dimensions: RectangleDimensions;
  isResizing:boolean = false;
  initialX = 0;
  initialY = 0;
  width = 0;
  height = 0;

  onMouseDown(event: MouseEvent): void {
    this.isResizing = true;
    this.initialX = event.clientX;
    this.initialY = event.clientY;
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isResizing) {
      const deltaX = event.clientX - this.initialX;
      const deltaY = event.clientY - this.initialY;
      this.width += deltaX;
      this.height += deltaY;
      this.initialX = event.clientX;
      this.initialY = event.clientY;
    }
  }

  onMouseUp(): void {
    if (this.isResizing) {
      this.isResizing = false;
      // Call the updateDimensions method from RectangleConfigService
      this.rectangleConfigService.updateDimensions({ width: this.width, height: this.height }).subscribe(
        () => {
          console.log('Dimensions updated successfully');
        },
        error => {
          console.error('Error updating dimensions:', error);
          this.errorOnSavingDimensions = true;
        }
      );     
    }
  }
  
  calculatePerimeter(): number {
    return 2 * (this.width + this.height);
  }
  constructor(private rectangleConfigService: RectangleConfigService) {}

  ngOnInit(): void {
    this.rectangleConfigService.getInitialDimensions().subscribe(dimensions => {
      this.dimensions = dimensions;
      this.width = dimensions.width; // Initialize width with fetched value
      this.height = dimensions.height; // Initialize height with fetched value
      },
      error => {
        console.error('Error fetching initial dimensions:', error);
        this.loadingError = true;
      }
    );
  }
}
