import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import emailjs from 'emailjs-com';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-portfolio';

  @ViewChild('hiddenForm') hiddenForm: any;
  contactFormGroup: FormGroup;


  constructor(private fb: FormBuilder) {

    this.contactFormGroup = this.fb.group({
      from_name: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
    // Initialize EmailJS with your user ID
    emailjs.init('VVuaaSETHe6JSebiC');
  }

  openAbout() {
    const aboutElement = document.getElementById("about");
    const homeElement = document.querySelector(".home");

    if (aboutElement) {
      // Show the popup
      aboutElement.style.display = "block";
    }

    if (homeElement) {
      // Add blur effect to the main section
      homeElement.classList.add("blur-effect");
    }
  }

  closeAbout() {
    const aboutElement = document.getElementById("about");
    const homeElement = document.querySelector(".home");

    if (aboutElement) {
      // Hide the popup
      aboutElement.style.display = "none";
    }

    if (homeElement) {
      // Remove blur effect from the main section
      homeElement.classList.remove("blur-effect");
    }
  }

  submitForm(): void {
    if (this.contactFormGroup.valid) {
      // Map values to the hidden form inputs
      this.hiddenForm.nativeElement.from_name.value = this.contactFormGroup.get('from_name')?.value;
      this.hiddenForm.nativeElement.user_email.value = this.contactFormGroup.get('user_email')?.value;
      this.hiddenForm.nativeElement.message.value = this.contactFormGroup.get('message')?.value;

      // Send the form using sendForm
      emailjs.sendForm('service_6j8qtes', 'template_u65culc', this.hiddenForm.nativeElement)
        .then(
          (response) => {
            alert('Message Sent Successfully!');
            this.contactFormGroup.reset();
          },
          (error) => {
            alert('Error: ' + JSON.stringify(error));
            alert('I think a problem occurred')
          }
        );
    } else {
      alert('Please fill out all required fields!');
    }
  }

}
