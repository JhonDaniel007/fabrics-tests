import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-with-messures',
  templateUrl: './with-messures.component.html',
  styleUrls: ['./with-messures.component.scss']
})
export class WithMessuresComponent implements OnInit {

  constructor() { }

  canvas!: fabric.Canvas

  ngOnInit(): void {

    this.canvas = new fabric.Canvas('canvas', {
      // Configuraciones opcionales de Fabric.js
    });

    this.createGroupShape();

  }



  createGroupShape() {
    const width = 100;
    const height = 50;
    const x = 50;
    const y = 50;

    // Crear el polígono
    const points = [
      { x: x, y: y },
      { x: x + width, y: y },
      { x: x + width, y: y + height },
      { x: x, y: y + height },
    ];
    let polygon = new fabric.Polygon(points, {
      fill: 'blue', // Puedes personalizar el color del polígono
    });

    // Crear el texto
    let text = new fabric.Text('Texto', {
      left: x + width / 2, // Ajusta la posición a la derecha del polígono
      top: y + height + 2,
      fontSize: 18,
      fill: 'black', // Puedes personalizar el color del texto
    });

    // Agrupar el polígono y el texto en un objeto de grupo
    let group = new fabric.Group([polygon, text], {
      selectable: true, // Puedes configurar la propiedad selectable según tus necesidades
    });

    // Agregar el grupo al canvas
    this.canvas.add(group);
  }

  /*/ Función para actualizar el texto
  updateText(newText: string) {
    this.text.set('text', newText);
    this.canvas.renderAll(); // Renderizar el canvas para reflejar los cambios
  }*/



}
