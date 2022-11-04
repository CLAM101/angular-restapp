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
export class ProfileComponent implements OnInit, OnDestroy {
  imageForm!: FormGroup;
  imageData!: string | null;

  profile: Profile = {};
  private fetachedProfile$ = new Subject<Profile>();
  private profileSubscription!: Subscription;

  constructor(private authService: AuthService, private builder: FormBuilder) {}

  GetProfile(): void {
    this.authService.GetProfile().subscribe((result) => {
      console.log('get profile result', result);
      this.profile = result;
      this.fetachedProfile$.next(this.profile);
      console.log('result on get profile', this.profile);
    });
  }

  getProfileStream() {
    return this.fetachedProfile$.asObservable();
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
    this.GetProfile();
    this.imageForm = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),
    });

    this.profileSubscription = this.getProfileStream().subscribe((profile) => {
      console.log('profile in ng on init sub', profile);
      this.profile = profile;
    });

    console.log('profile subscription', this.profileSubscription);
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
  }
}
