import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Producto {
  nombre: string;
  enlace: string;
}

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
})
export class BuscadorComponent implements OnInit {
  @ViewChild('searchResults', { static: true }) searchResults!: ElementRef;

  searchQuery: string = '';
  items: Producto[] = [];
  filteredItems: Producto[] = [];
  resultsMessage: string = '';

  constructor(private renderer: Renderer2, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/Categorias', true);

    xhr.onload = () => {
      if (xhr.status === 200) {
        const categorias: string[] = JSON.parse(xhr.responseText);
        this.obtenerProductosPorCategorias(categorias);
      } else {
        console.error('Error al obtener las categorías:', xhr.statusText);
      }
    };

    xhr.onerror = () => {
      console.error('Error de red al obtener las categorías.');
    };

    xhr.send();
  }

  obtenerProductosPorCategorias(categorias: string[]) {
    categorias.forEach(categoria => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `http://localhost:3000/productos/${categoria}`, true);

      xhr.onload = () => {
        if (xhr.status === 200) {
          const productos: any[] = JSON.parse(xhr.responseText);
          this.items.push(...productos.map(producto => ({
            nombre: producto.nombre,
            enlace: producto.enlace
          })));
          this.search();
        } else {
          console.error(`Error al obtener los datos de la categoría ${categoria}:`, xhr.statusText);
        }
      };

      xhr.onerror = () => {
        console.error(`Error de red al obtener los datos de la categoría ${categoria}.`);
      };

      xhr.send();
    });
  }

  onInputChange(event: any) {
    this.searchQuery = event.target.value;
    this.search();
  }

  search() {
    this.filteredItems = this.filterItems();
    this.updateResults();
  }

  filterItems(): Producto[] {
    if (this.searchQuery.trim() === '') {
      return this.items;
    }

    const searchTerms = this.searchQuery.toLowerCase().split(' ');

    return this.items.filter(item => {
      const lowerCaseItem = item.nombre.toLowerCase();
      return searchTerms.every(term => lowerCaseItem.includes(term));
    });
  }

  updateResults() {
    const resultsContainer = this.searchResults.nativeElement;

    // Limpiar el contenido anterior
    while (resultsContainer.firstChild) {
      resultsContainer.removeChild(resultsContainer.firstChild);
    }

    if (this.filteredItems.length > 0) {
      this.resultsMessage = 'Resultados de la búsqueda:';
      this.filteredItems.forEach(item => {
        const imageElement = this.renderer.createElement('img');
        this.renderer.setAttribute(imageElement, 'src', `${item.enlace}`);
        this.renderer.setStyle(imageElement, 'width', '250px');
        this.renderer.setStyle(imageElement, 'height', '350px');
        this.renderer.setStyle(imageElement, 'border', '2px solid #444');

        const linkElement = this.renderer.createElement('a');
        this.renderer.setAttribute(linkElement, 'href', `http://localhost:4200/producto/${item.nombre}`);
        this.renderer.appendChild(linkElement, imageElement);

        const itemElement = this.renderer.createElement('div');
        this.renderer.addClass(itemElement, 'search-item');
        this.renderer.appendChild(itemElement, linkElement);
        this.renderer.appendChild(resultsContainer, itemElement);
      });
    } else {
      this.resultsMessage = 'No se encontraron resultados.';
    }
  }

  irAHome() {
    this.router.navigate(['/home']);
  }
}
