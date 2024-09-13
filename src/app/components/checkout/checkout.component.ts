import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { state } from '@angular/animations';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgFor, NgIf, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  theForm!: FormGroup;
  totalPrice!: number;
  itemsInCart!: number;
  sameAddress = false;
  years: number[] = [];
  months: string[] = [];
  states!: { name: string; provinces: string[] }[];
  creditCardTypes!: string[];
  selectedState!: { name: string; provinces: string[] };

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.setInitialValues();
    this.createForm();
    this.selectedState = this.states[0];
    this.theForm
      .get('shippingAddress.state')!
      .valueChanges.subscribe((data) => {
        this.selectedState = this.states.find((state) => state.name === data)!;
      });

    this.cartService.totalPrice.subscribe((totalPrice) => {
      this.totalPrice = totalPrice;
    });
    this.cartService.itemsInCart.subscribe((itemsInCart) => {
      this.itemsInCart = itemsInCart;
    });
    this.cartService.updateCartTotals();
  }
  onSubmit() {
    console.log(this.theForm.value);
  }


  createForm() {
    this.theForm = new FormGroup({
      customer: new FormGroup({
        firstName: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z]{4,20}'),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z]{4,20}'),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.maxLength(30),
        ]),
      }),
      shippingAddress: new FormGroup({
        street: new FormControl('', [
          Validators.required,
          Validators.pattern("[a-zA-Z0-9.,' ]{3,64}"),
        ]),
        city: new FormControl('', [
          // Validators.required,
          Validators.pattern('[a-zA-Z ]{3,20}'),
        ]),
        state: new FormControl([this.states[0]], [Validators.required]),
        province: new FormControl('', [Validators.required]),
        zipcode: new FormControl('', [Validators.pattern('[0-9]{5}')]),
      }),
      billingAddress: new FormGroup({
        street: new FormControl('', [
          Validators.required,
          Validators.pattern("[a-zA-Z0-9.,' ]{3,64}"),
        ]),
        city: new FormControl('', [
          // Validators.required,
          Validators.pattern('[a-zA-Z ]{3,20}'),
        ]),
        state: new FormControl([this.states[0]], [Validators.required]),
        province: new FormControl('', [Validators.required]),
        zipcode: new FormControl('', [Validators.pattern('[0-9]{5}')]),
      }),
      creditCard: new FormGroup({
        creditCardType: new FormControl(this.creditCardTypes[0], [
          Validators.required,
        ]),
        creditCardName: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z ]{5,25}'),
        ]),
        creditCardNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{16}'),
        ]),
        creditCardCCV: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.maxLength(3),
        ]),
        creditCardExpYear: new FormControl('', [Validators.required]),
        creditCardExpMonth: new FormControl('', [Validators.required]),
      }),
    });
  }
  setDates() {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 20 }, (_, index) => currentYear + index);
    this.months = Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString('default', { month: 'long' })
    );
  }
  setProvinces() {
    this.states = [
      {
        name: 'Tanger-Tetouan-Al Hoceima',
        provinces: [
          'Prefecture of Tanger-Assilah',
          "Prefecture of M'diq-Fnideq",
          'Tetouan Province',
          'Chefchaouen Province',
          'Al Hoceima Province',
          'Larache Province',
          'Fahs-Anjra Province',
          'Ouezzane Province',
        ],
      },
      {
        name: 'Oriental',
        provinces: [
          'Prefecture of Oujda-Angad',
          'Nador Province',
          'Berkane Province',
          'Driouch Province',
          'Guercif Province',
          'Taourirt Province',
          'Jerada Province',
          'Figuig Province',
        ],
      },
      {
        name: 'Fès-Meknès',
        provinces: [
          'Prefecture of Fès',
          'Prefecture of Meknès',
          'Sefrou Province',
          'Boulemane Province',
          'El Hajeb Province',
          'Ifrane Province',
          'Moulay Yacoub Province',
          'Taza Province',
          'Taounate Province',
        ],
      },
      {
        name: 'Rabat-Salé-Kénitra',
        provinces: [
          'Prefecture of Rabat',
          'Prefecture of Salé',
          'Prefecture of Skhirate-Témara',
          'Kénitra Province',
          'Sidi Kacem Province',
          'Sidi Slimane Province',
          'Khémisset Province',
        ],
      },
      {
        name: 'Béni Mellal-Khénifra',
        provinces: [
          'Béni Mellal Province',
          'Azilal Province',
          'Fquih Ben Salah Province',
          'Khénifra Province',
          'Khouribga Province',
        ],
      },
      {
        name: 'Casablanca-Settat',
        provinces: [
          'Casablanca Prefecture',
          'Mohammedia Prefecture',
          'Nouaceur Province',
          'Médiouna Province',
          'Benslimane Province',
          'Berrechid Province',
          'Settat Province',
          'El Jadida Province',
          'Sidi Bennour Province',
        ],
      },
      {
        name: 'Marrakesh-Safi',
        provinces: [
          'Prefecture of Marrakesh',
          'Al Haouz Province',
          'Chichaoua Province',
          'Essaouira Province',
          'Kelâat Sraghna Province',
          'Rehamna Province',
          'Safi Province',
          'Youssoufia Province',
        ],
      },
      {
        name: 'Drâa-Tafilalet',
        provinces: [
          'Errachidia Province',
          'Ouarzazate Province',
          'Midelt Province',
          'Tinghir Province',
          'Zagora Province',
        ],
      },
      {
        name: 'Souss-Massa',
        provinces: [
          'Prefecture of Agadir-Ida Ou Tanane',
          'Inezgane-Aït Melloul Prefecture',
          'Chtouka Aït Baha Province',
          'Taroudant Province',
          'Tiznit Province',
          'Tata Province',
        ],
      },
      {
        name: 'Guelmim-Oued Noun',
        provinces: [
          'Guelmim Province',
          'Assa-Zag Province',
          'Tan-Tan Province',
          'Sidi Ifni Province',
        ],
      },
      {
        name: 'Laâyoune-Sakia El Hamra',
        provinces: [
          'Prefecture of Laâyoune',
          'Boujdour Province',
          'Tarfaya Province',
          'Es-Semara Province',
        ],
      },
      {
        name: 'Dakhla-Oued Ed-Dahab',
        provinces: ['Oued Ed-Dahab Province', 'Aousserd Province'],
      },
    ];
  }
  setCreditCardTypes() {
    this.creditCardTypes = [
      'Visa',
      'MasterCard',
      'American Express',
      'Discover',
      'JCB',
      'Diners Club',
      'UnionPay',
    ];
  }
  setInitialValues() {
    this.setDates();
    this.setCreditCardTypes();
    this.setProvinces();
  }
  copyAddress(event : Event) {
    const checkbox = event.target as HTMLInputElement; 
    if (checkbox.checked) {
      this.theForm
        .get('billingAddress')
        ?.setValue(this.theForm.get('shippingAddress')?.value);
      this.sameAddress = true;
    } else {
      this.sameAddress = false;
      this.theForm.get('shippingAddress')?.reset();
    }
  }
}
