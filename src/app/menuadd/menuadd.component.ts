import { Component, OnInit } from '@angular/core';
import { AccmgmtService } from '../accmgmt.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { MenuItem, Rest } from '../interfaces';

@Component({
  selector: 'app-menuadd',
  templateUrl: './menuadd.component.html',
  styleUrls: ['./menuadd.component.scss'],
})
export class MenuaddComponent implements OnInit {
  menuForm!: FormGroup;
  imageData!: string | null;
  rest!: Rest;
  files: Array<any> = [];
  sideImageData: Array<any> = [];

  // hide show controls for each dropdown
  catIsHidden: [boolean] = [true];
  addIsHidden: [boolean] = [true];
  addOptionIsHidden: [boolean] = [true];
  sideIsHidden: [boolean] = [true];
  typeIsHidden: boolean = true;

  constructor(
    private accmgmtService: AccmgmtService,
    private builder: FormBuilder,
    private authService: AuthService
  ) {}

  //gets categories form array
  get categories() {
    return this.menuForm.controls['categories'] as FormArray;
  }

  // gets addons form array
  get addons(): FormArray {
    return this.menuForm.controls['addons'] as FormArray;
  }

  // gets sides from array
  get relatedsides() {
    return this.menuForm.controls['relatedsides'] as FormArray;
  }

  //fetches logged in restaurant detail
  getRest(): void {
    this.accmgmtService.getRest().subscribe((rest: Rest) => {
      this.rest = rest;
    });
  }

  //shows or hides the categories list
  showList(i: number) {
    this.catIsHidden[i] = !this.catIsHidden[i];
  }

  // shows or hides addons list
  showAddList(x: number) {
    this.addIsHidden[x] = !this.addIsHidden[x];
  }

  // shows or hides addon options list
  showAddOptionList(k: number) {
    this.addOptionIsHidden[k] = !this.addOptionIsHidden[k];
  }

  // shows or hides side options list
  showSide(j: number) {
    console.log('show side index', j);
    this.sideIsHidden[j] = !this.sideIsHidden[j];
  }

  // shows or hides type options list
  showItemType() {
    this.typeIsHidden = !this.typeIsHidden;
  }

  //assigns selected category from dropdown to relevant form field
  selectCat(i: any, y: any): void {
    let cats = (this.menuForm.get('categories') as FormArray).controls[
      i
    ] as FormControl;
    cats.patchValue({
      category: y,
    });

    this.catIsHidden[i] = true;
  }

  // assigns selected addon from dropdown to relevant form field
  selectAddon(x: number, j: any): void {
    let addons = (this.menuForm.get('addons') as FormArray).controls[
      x
    ] as FormControl;

    let relatedOptions = j.addonoptions;

    relatedOptions.forEach((option: { option: string }) => {
      const addOnOptionForm = this.builder.group({
        option: this.builder.control<string>(option.option),
      });

      this.addonOptions(x).push(addOnOptionForm);
    });

    addons.patchValue({
      addonname: j.addonname,
    });

    this.addIsHidden[x] = true;
  }

  // assigns selected addon option from dropdown to relevant form field
  selectAddonOption(k: number, j: any, x: number) {
    let addonOptions = (this.addons.get(`${x}`) as FormGroup).controls[
      'addonoptions'
    ] as FormArray;

    let option = addonOptions.get(`${k}`) as FormControl;

    option.patchValue({
      option: j.option,
    });

    this.addOptionIsHidden[k] = true;
  }

  // assigns selected side option from dropdown to relevant form field
  selectSide(j: number, l: any) {
    const sides = this.relatedsides.get(`${j}`) as FormControl;

    console.log('value on selected side', l);

    sides.patchValue({
      name: l.name,
      price: l.price,
      description: l.description,
      imagePath: l.imagePath,
    });
  }

  // assigns selected type from dropdown to relevant form field
  selectItemType(l: any) {
    const type = this.menuForm.get('itemType') as FormControl;
    type.setValue(l);
    this.typeIsHidden = true;
  }

  // adds a category
  addCategory() {
    const categoryForm = this.builder.group({
      category: ['', Validators.required],
    });

    this.categories.push(categoryForm);
    this.catIsHidden.push(true);
  }

  // ads new addon to form
  addAddon() {
    const addOnForm = this.builder.group({
      addonname: ['', Validators.required],
      addonoptions: this.builder.array([]),
    });
    this.addIsHidden.push(true);
    this.addons.push(addOnForm);
  }

  //adds new addon option to form
  addAddonOption(i: number) {
    const addOnOptionForm = this.builder.group({
      option: this.builder.control<string>(''),
    });

    this.addonOptions(i).push(addOnOptionForm);
    this.addOptionIsHidden.push(true);
  }

  //gets addon options
  addonOptions(addonFormIndex: number): FormArray {
    return (this.addons.get(`${addonFormIndex}`) as FormGroup).controls[
      'addonoptions'
    ] as FormArray;
  }

  // let sideValue = relevantSide.value.imageName

  //ads a side to form
  addSide() {
    const sideForm = this.builder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: this.builder.control<NonNullable<any>>('', Validators.required),
      imageName: this.builder.control<string>('', Validators.required),
      imagePath: this.builder.control<string>('', Validators.required),
    });

    this.relatedsides.push(sideForm);
  }

  //returns the array of addonoptions relevant to the chosen add on name
  addOnOptionList(x: number) {
    let options = this.addons.get(`${x}`) as FormArray;
    let relevantArray;

    this.rest.addonmenu?.filter((i) => {
      if (i.addonname === options.value.addonname) {
        relevantArray = i.addonoptions;
      }
    });
    ``;

    return relevantArray;
  }

  // provides the correct side item image to be displayed based on image in menuform values
  sideItemImage(j: number) {
    let relevantSide = this.relatedsides.get(`${j}`) as FormControl;

    let imageValue = relevantSide.value.imagePath;

    let imageName = relevantSide.value.imageName;

    if (!imageValue) {
      let sideImageData = this.sideImageData;

      let correctImage;

      sideImageData.filter((item) => {
        if (item.imageName === imageName) {
          correctImage = item.image;
        }
      });

      return correctImage;
    } else if (!imageValue && !imageName) {
      return false;
    } else {
      return imageValue;
    }
  }

  // deletes category from form
  deleteCategory(categoryIndex: number) {
    this.categories.removeAt(categoryIndex);
  }

  // deletes addon from form
  deleteAddOn(addOnIndex: number) {
    this.addons.removeAt(addOnIndex);
  }

  //deletes addon option from form
  deleteAddOnOption(addOnIndex: number, addOnOptionIndex: number) {
    const addOnOption = (this.addons.get(`${addOnIndex}`) as FormGroup)
      .controls['addonoptions'] as FormArray;

    addOnOption.removeAt(addOnOptionIndex);
  }

  //deletes side from form
  deleteSide(sideIndex: number) {
    this.relatedsides.removeAt(sideIndex);
  }

  // adds selected image to form
  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];

    this.files.push(file);

    this.menuForm.patchValue({
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
  }

  // ads selected image to sides field of form
  onFileSelectSide(event: Event, i: number) {
    const file = (event.target as HTMLInputElement).files![0];

    this.files.push(file);

    (this.relatedsides.get(`${i}`) as FormControl).patchValue({
      imageName: (event.target as HTMLInputElement).files![0].name,
      imagePath: '',
    });

    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.sideImageData.push({
          image: reader.result as string,
          imageName: (event.target as HTMLInputElement).files![0].name,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  // calls service to create new menu item in db
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

  // submits full form
  onSubmit() {
    // patches all selected images as array to image form field
    this.menuForm.patchValue({
      image: this.files,
    });

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

  ngOnInit(): void {
    // fetches the logged in restaurant
    this.getRest();

    // initializes the form
    this.menuForm = this.builder.group({
      name: this.builder.control<string>('', Validators.required),
      price: this.builder.control<string>('', Validators.required),
      description: this.builder.control<string>('', Validators.required),
      itemType: this.builder.control<string>('', Validators.required),
      image: this.builder.control<NonNullable<any>>([], Validators.required),
      imageName: this.builder.control<string>('', Validators.required),
      categories: this.builder.array([]),
      relatedsides: this.builder.array([]),
      addons: this.builder.array([]),
    });
  }
}
