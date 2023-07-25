import { KeyValue } from '@angular/common';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {

  @ViewChild('canvasView', { static: true }) canvasElement!: ElementRef;

  canvas!: fabric.Canvas;
  isDrawing: boolean = false;
  isPlaced:boolean = false;
  lastX: number = 0 ;
  lastY: number = 0;
  walls: fabric.Object[] = []; // Array para almacenar las paredes existentes en el canvas

  ngOnInit() {
    this.canvas = new fabric.Canvas(this.canvasElement.nativeElement, {
      selection: false,
    });

    // Agregar eventos de clic y movimiento al canvas
    this.canvas.on('mouse:down', (event) => this.onCanvasMouseDown(event));
    this.canvas.on('mouse:move', (event) => this.onCanvasMouseMove(event));
    this.canvas.on('mouse:up', (event) => this.onCanvasMouseUp(event));
  }

  onCanvasMouseDown(event: fabric.IEvent) {
    this.isDrawing = true;
    const pointer = this.canvas.getPointer(event.e);
    this.lastX = pointer.x;
    this.lastY = pointer.y;
  }

  onCanvasMouseMove(event: fabric.IEvent) {
    if (!this.isDrawing) return;

    const pointer = this.canvas.getPointer(event.e);
    const currentX = pointer.x;
    const currentY = pointer.y;

    // Verificar colisiones con las paredes existentes
    const isColliding = this.checkCollisionWithWalls(currentX, currentY);

    // Si no hay colisión, dibujar la nueva pared
    if (!isColliding) {
      /*const wall = new fabric.Line([this.lastX, this.lastY, currentX, currentY], {
        stroke: 'black',
        strokeWidth: 5,
        selectable: false,
      });*/

       // Cargar la imagen de la pared desde los activos
    const imageUrl = '../assets/a.jpg';

    fabric.Image.fromURL(imageUrl, (img) => {
      // Crear el objeto de la pared en la posición del clic
      const wall = img.set({ left: currentX, top: currentY, selectable: true });

      // Agregar la pared al canvas
      this.canvas.add(wall);
      this.walls.push(wall);
      this.canvas.setActiveObject(wall);
      this.isDrawing = false;
    });

      //this.canvas.add(wall);
    }

    // Actualizar las coordenadas de inicio para el próximo segmento de pared
    this.lastX = currentX;
    this.lastY = currentY;
  }

  onCanvasMouseUp(event: fabric.IEvent) {
    this.isDrawing = false;
  }

  checkCollisionWithWalls(x: number, y: number): boolean {
    for (const wall of this.walls) {
      // Verificar si el punto (x, y) está contenido dentro del segmento de la pared
      if (this.pointIsInsideWall(x, y, wall)) {
        return true; // Hay colisión
      }
    }
    return false; // No hay colisión
  }

  pointIsInsideWall(x: number, y: number, wall: fabric.Object): boolean {
    const points = wall.getCoords();
    const x1 = points[0].x;
    const y1 = points[1].y;
    const x2 = points[2].x;
    const y2 = points[3].y;

    // Calcular las distancias desde el punto (x, y) a los extremos del segmento
    const d1 = this.distance(x, y, x1, y1);
    const d2 = this.distance(x, y, x2, y2);

    // Calcular la longitud del segmento
    const segmentLength = this.distance(x1, y1, x2, y2);

    // Permitir una tolerancia para la colisión (ajustar este valor según tus necesidades)
    const tolerance = 10;

    // Verificar si el punto está dentro de la longitud del segmento y dentro de la tolerancia
    return d1 + d2 >= segmentLength - tolerance && d1 + d2 <= segmentLength + tolerance;
  }

  distance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}