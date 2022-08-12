import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../cart.service';
import { Product } from '../products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  items = this.cartService.getItems();

  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) { }

  orderSummary = () => {
    const itemNames = this.items.map((obj) => {
      return obj.name
    })
    return itemNames.join(', ');
  }

  removeItem(product: Product) {
    this.cartService.removeItem(product);
  }


  onSubmit(): void {
    //Process Checkout data here
    if (this.items.length === 0) {
      return window.alert('No items in cart!')
    }
    window.alert(`Your order of item(s): ${this.orderSummary()} ${this.items.length > 1 ? 'has' : 'have'} been submitted to ${this.checkoutForm.value.name} at ${this.checkoutForm.value.address}`);
    this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }
}
