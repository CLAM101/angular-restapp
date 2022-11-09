import { Component, OnInit } from '@angular/core';
import { AccmgmtService } from '../accmgmt.service';
import { Observable, of } from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { MenuItem } from '../interfaces';

@Component({
  selector: 'app-menuadd',
  templateUrl: './menuadd.component.html',
  styleUrls: ['./menuadd.component.scss'],
})
export class MenuaddComponent implements OnInit {
  menuForm!: FormGroup;
  imageData!: string | null;
  rest!: object;
  // categories!: FormArray;

  constructor(
    private accmgmtService: AccmgmtService,
    private builder: FormBuilder,
    private authService: AuthService
  ) {}

  get categories() {
    return this.menuForm.controls['categories'] as FormArray;
  }

  get addons(): FormArray {
    return this.menuForm.controls['addons'] as FormArray;
  }

  get relatedsides() {
    return this.menuForm.controls['relatedsides'] as FormArray;
  }

  getRest(): void {
    this.accmgmtService.getRest().subscribe((rest) => {
      console.log('get rest result', rest);
      this.rest = rest;
    });
  }

  addCategory() {
    const categoryForm = this.builder.group({
      category: ['', Validators.required],
    });

    this.categories.push(categoryForm);

    console.log('categories value after add', this.categories.value);
  }

  addAddon() {
    const addOnForm = this.builder.group({
      addonname: ['', Validators.required],
      addonoptions: this.builder.array([]),
    });

    this.addons.push(addOnForm);
  }

  addAddonOption(i: number) {
    const addOnOptionForm = this.builder.group({
      option: this.builder.control<string>(''),
    });

    this.addonOptions(i).push(addOnOptionForm);

    console.log('addons with options', this.addons.value);
  }

  addonOptions(addonFormIndex: number): FormArray {
    return (this.addons.get(`${addonFormIndex}`) as FormGroup).controls[
      'addonoptions'
    ] as FormArray;
  }

  addSide() {
    const sideForm = this.builder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: this.builder.control<NonNullable<any>>('', Validators.required),
      imageName: this.builder.control<string>('', Validators.required),
    });

    this.relatedsides.push(sideForm);
  }

  deleteCategory(categoryIndex: number) {
    this.categories.removeAt(categoryIndex);
  }

  deleteAddOn(addOnIndex: number) {
    this.addons.removeAt(addOnIndex);
  }

  deleteAddOnOption(addOnIndex: number, addOnOptionIndex: number) {
    const addOnOption = (this.addons.get(`${addOnIndex}`) as FormGroup)
      .controls['addonoptions'] as FormArray;

    addOnOption.removeAt(addOnOptionIndex);
  }

  deleteSide(sideIndex: number) {
    this.relatedsides.removeAt(sideIndex);
  }

  onFileSelect(event: Event) {
    console.log('file selected', (event.target as HTMLInputElement).files![0]);
    const file = (event.target as HTMLInputElement).files![0];

    this.menuForm.patchValue({
      image: file,
      imageName: (event.target as HTMLInputElement).files![0].name,
    });

    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }

    console.log('menu form on file select', this.menuForm);
  }

  onFileSelectSide(event: Event, i: number) {
    console.log('file selected', (event.target as HTMLInputElement).files![0]);
    const file = (event.target as HTMLInputElement).files![0];
    console.log('on file select side index', i);
    console.log('related sides before change', this.relatedsides.value[i]);

    this.relatedsides.value[i].image = file;
    this.relatedsides.value[i].imageName = (
      event.target as HTMLInputElement
    ).files![0].name;

    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }

    console.log('related sides afetr change', this.relatedsides.value[i]);
    console.log('menu form on file select', this.menuForm);
  }

  createMenuItem({
    name,
    price,
    description,
    categories,
    image,
    imageName,
    relatedsides,
    addons,
    itemType,
  }: MenuItem) {
    this.accmgmtService
      .createMenuItem({
        name,
        price,
        description,
        categories,
        image,
        relatedsides,
        addons,
        itemType,
        imageName,
      })
      .subscribe((response) => {
        console.log('response on create Menu Item method', response);
      });
  }

  // onSubmit() {
  //   console.log('menu form on submit', this.menuForm.value);
  // }

  onSubmit() {
    console.log('form value on submit', this.menuForm.value);

    const menuItem: object = {
      name: this.menuForm.value.name!,
      price: this.menuForm.value.price!,
      description: this.menuForm.value.description!,
      categories: this.menuForm.value.categories!,
      image: this.menuForm.value.image!,
      imageName: this.menuForm.value.imageName!,
      relatedsides: this.menuForm.value.relatedsides!,
      itemType: this.menuForm.value.itemType!,
      addons: this.menuForm.value.addons!,
    };

    this.createMenuItem(menuItem);

    // this.menuForm.reset();
  }

  // addImage(name: string, image: File) {
  //   this.authService.addImage(name, image).subscribe((imageData) => {
  //     const profile: Profile = {
  //       _id: imageData._id,
  //       title: imageData.title,
  //       email: imageData.email,
  //       rating: imageData.rating,
  //       imagePath: imageData.imagePath,
  //       description: imageData.description,
  //     };
  //     console.log('update image response', profile);
  //   });
  // }

  ngOnInit(): void {
    this.getRest();
    this.menuForm = this.builder.group({
      name: this.builder.control<string>('', Validators.required),
      price: this.builder.control<string>('', Validators.required),
      description: this.builder.control<string>('', Validators.required),
      itemType: this.builder.control<string>('', Validators.required),
      image: this.builder.control<NonNullable<any>>('', Validators.required),
      imageName: this.builder.control<string>('', Validators.required),
      categories: this.builder.array([]),
      relatedsides: this.builder.array([]),
      addons: this.builder.array([]),
    });
  }
}
