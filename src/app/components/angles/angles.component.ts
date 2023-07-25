import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-angles',
  templateUrl: './angles.component.html',
  styleUrls: ['./angles.component.scss']
})
export class AnglesComponent implements OnInit {

  constructor() { }

  canvas!:fabric.Canvas;
  isEditing = false;
  selectedChild:fabric.Rect | undefined;
  public angle = 0


  ngOnInit(): void {

    this.canvas = new fabric.Canvas('canvas');

    this.canvas.on('mouse:move', (event)=>this.onMouseMoved(event));
    this.canvas.on('mouse:down',(event)=>this.onMouseClick(event))
    this.canvas.on('selection:created', (event)=>this.onSelectionCreated(event))
    this.canvas.on('selection:updated', (event)=>this.onSelectionCreated(event))
    this.canvas.on('selection:cleared', (event)=>this.onSelectionCleared(event))

  }
  onSelectionCleared(event: fabric.IEvent<MouseEvent>){
    this.isEditing = false
  }

  onSelectionCreated(event: fabric.IEvent<MouseEvent>){
    this.isEditing = true;
    this.selectedChild = this.canvas.getActiveObject() as fabric.Rect;
  
  }

  onMouseMoved(event:fabric.IEvent<MouseEvent>){
    const x = event.pointer?.x
    const y = event.pointer?.y
  
    this.getAngle(x,y)
  }

  onMouseClick(event:fabric.IEvent<MouseEvent>){

    if(this.isEditing) return;
    const x = event.pointer?.x
    const y = event.pointer?.y

    this.selectedChild =  this.createShape(x,y);

    this.canvas.add(this.selectedChild);
    this.canvas.setActiveObject(this.selectedChild);
    this.isEditing = true;

  }

  getAngle(x:number = 0, y:number = 0){

     // obtener las coordenadas del centro del contenedor
     const centerX = this.canvas.width! / 2;
     const centerY = this.canvas.height! / 2;
 
     // obtener las coordenadas del puntero del mouse
     const mouseX = x;
     const mouseY = y;
 
     // calcular el ángulo en radianes usando Math.atan2
     const radians = Math.atan2(mouseY - centerY, mouseX - centerX);
 
     // convertir el ángulo a grados y ajustarlo al rango [0, 360)
     this.angle = (radians * 180 / Math.PI + 360) % 360;

     this.selectedChild!.rotate(this.angle);
     this.canvas.renderAll();

  }

  createShape(x:number = 0, y:number = 0):fabric.Rect{



    const shape = new fabric.Rect({
      top:y,
      left:x,
      width:100,
      height:100,
      centeredRotation:false
    })

    return shape

  }


}
