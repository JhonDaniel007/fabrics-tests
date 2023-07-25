import { Component, OnInit, ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { DinamicComponent } from '../dinamic/dinamic.component';

@Component({
  selector: 'app-progressive',
  templateUrl: './progressive.component.html',
  styleUrls: ['./progressive.component.scss']
})
export class ProgressiveComponent implements OnInit {

  //----------
  
  // Variables para almacenar la posición del mouse
  mouseX: number = 0;
  mouseY: number = 0;

  // Variable para almacenar la referencia al componente dinámico
  miComponenteRef!: ComponentRef<DinamicComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  ngOnInit() {
    // Agregar evento de clic al documento
    document.addEventListener('click', (event) => this.onDocumentClick(event));
    
    console.log('init')
  }

  onDocumentClick(event: MouseEvent) {
    // Obtener las coordenadas del mouse
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    console.log('document click')
    // Crear el componente dinámicamente
    this.createMiComponente();
  }

  createMiComponente() {
    // Resuelve el componente y crea el componente dinámicamente
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DinamicComponent);
    this.miComponenteRef = componentFactory.create(this.injector);

    // Establece la posición del componente
    this.setPosition();

    // Agrega el componente al DOM
    this.appRef.attachView(this.miComponenteRef.hostView);
    const domElem = (this.miComponenteRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    const doc = document.getElementById('container');
    //document.body.appendChild(domElem);
    doc!.appendChild(domElem);
    console.log('Append Child')
  }

  setPosition() {
    // Establece las coordenadas X e Y del componente
    const componentElement = (this.miComponenteRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    componentElement.style.left = this.mouseX + 'px';
    componentElement.style.top = this.mouseY + 'px';
  }


  //-------


}
