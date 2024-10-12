import { CanComponentDeactivate } from './../../../guards/cancel.guard';
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from './../../../services/product.service';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, TranslateModule, NgbPopover],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements CanComponentDeactivate {
  theForm: FormGroup;
  selectedImage: File;
  active = true;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.theForm = this.formBuilder.group({
      product: this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(5)]],
        category: ['', [Validators.required]],
        description: ['', [Validators.required]],
        image: ['', [Validators.required]],
        unitPrice: ['', [Validators.required]],
        unitsInStock: ['', [Validators.required]],
        active: [this.active],
      }),
    });
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.theForm.value.product.name);
    formData.append('description', this.theForm.value.product.description);
    formData.append('categoryId', this.theForm.value.product.category);
    formData.append('unitPrice', this.theForm.value.product.unitPrice);
    formData.append('image', this.selectedImage);
    formData.append('unitsInStock', this.theForm.value.product.unitsInStock);
    formData.append('active', this.theForm.value.product.active);

    this.productService.addProduct(formData).subscribe((response) => {
      console.log(' Product added successfully', response);
      this.theForm.reset();
    });
  }

  selectImage(event) {
    this.selectedImage = event.target.files[0];
  }

  canDeactivate() {
    if (this.theForm.dirty) {
      return confirm('Are you sure you want to leave this page?');
    } else {
      return true;
    }
  }
}
