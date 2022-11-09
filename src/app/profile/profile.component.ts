import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Profile } from '../interfaces';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  imageForm!: FormGroup;
  imageData!: string | null;

  profile: Profile = {};

  constructor(private authService: AuthService, private builder: FormBuilder) {}

  getProfile(): void {
    this.authService.getProfile().subscribe((result) => {
      console.log('get profile result', result);
      this.profile = result;

      console.log('result on get profile', this.profile);
    });
  }

  addImage(name: string, image: File) {
    this.authService.addImage(name, image).subscribe((imageData) => {
      const profile: Profile = {
        _id: imageData._id,
        title: imageData.title,
        email: imageData.email,
        rating: imageData.rating,
        imagePath: imageData.imagePath,
        description: imageData.description,
      };
      console.log('update image response', profile);
    });
  }

  onSubmit() {
    console.log('submit profile', this.imageForm.value);
    this.addImage(this.imageForm.value.image.name, this.imageForm.value.image);
    this.imageForm.reset();
    this.imageData = null;
  }

  onFileSelect(event: Event) {
    console.log('file selected', event);
    const file = (event.target as HTMLInputElement).files![0];
    this.imageForm.patchValue({ image: file });
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
    this.getProfile();
    this.imageForm = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),
    });
  }
}
