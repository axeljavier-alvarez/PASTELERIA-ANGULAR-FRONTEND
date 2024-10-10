import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  products = [
    { id: 1, name: "Donas", image: "./img/cafe1.jpg", categoria: "donas", stock: 5, price: 10.00 },
    { id: 2, name: "Pastel Seco", image: "./img/cafe2.jpg", categoria: "PastelSeco", stock: 3, price: 15.00 },
    { id: 3, name: "Pastel Helado", image: "./img/cafe3.jpg", categoria: "PastelHelado", stock: 4, price: 20.00 },
    { id: 4, name: "Brownies", image: "./img/cafe4.jpg", categoria: "Brownies", stock: 6, price: 8.00 },
  ];

  cart: any[] = [];

  ngOnInit(): void {
    this.displayProducts();
  }

  toggleOffcanvas(): void {
    const offcanvasNavbar = document.getElementById('offcanvasNavbar');
    if (offcanvasNavbar) {
      offcanvasNavbar.classList.toggle('show');
    }
  }

  displayProducts(): void {
    // Este método actualizará el DOM, se puede hacer a través del template
  }

  addToCart(productId: number): void {
    const product = this.products.find(p => p.id === productId);

    if (product && product.stock > 0) {
      const existingItem = this.cart.find(item => item.id === productId);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      product.stock--;

      this.updateCart();
      this.displayProducts();
    } else {
      alert('Este producto ya está agotado.');
    }
  }

  removeFromCart(productId: number): void {
    const product = this.products.find(p => p.id === productId);
    const itemInCart = this.cart.find(item => item.id === productId);

    if (itemInCart) {
      product.stock += itemInCart.quantity;
    }

    this.cart = this.cart.filter(item => item.id !== productId);
    this.updateCart();
    this.displayProducts();
  }

  updateQuantity(productId: number, change: number): void {
    const item = this.cart.find(item => item.id === productId);
    const product = this.products.find(p => p.id === productId);

    if (item) {
      if (change > 0 && product.stock > 0) {
        item.quantity++;
        product.stock--;
      } else if (change < 0) {
        item.quantity--;
        product.stock++;
        if (item.quantity <= 0) {
          this.removeFromCart(productId);
        }
      }
      this.updateCart();
      this.displayProducts();
    }
  }

  updateCart(): void {
    // Este método actualizará el DOM, se puede hacer a través del template
  }

  checkout(): void {
    alert("¡Gracias por tu compra!");
    this.cart = [];
    this.updateCart();
    this.displayProducts();
  }

  // Manejo de eventos para el menú y dropdowns
  onMenuToggle(): void {
    const navList = document.querySelector('.nav-list') as HTMLElement;
    if (navList) {
      navList.classList.toggle('show');
    }
  }

  // ... Agregar lógica para dropdown y otros eventos aquí
}