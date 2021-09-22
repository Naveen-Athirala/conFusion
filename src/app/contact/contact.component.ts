import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,Validators  } from '@angular/forms';
import { FeedBack,ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: FeedBack;
  contactType= ContactType;
 @ViewChild('fform') feedbackFormD;
 formErrors = {
  'firstname': '',
  'lastname': '',
  'telnum': '',
  'email': ''
};

validationMessages = {
  'firstname': {
    'required':      'First Name is required.',
    'minlength':     'First Name must be at least 2 characters long.',
    'maxlength':     'FirstName cannot be more than 25 characters long.'
  },
  'lastname': {
    'required':      'Last Name is required.',
    'minlength':     'Last Name must be at least 2 characters long.',
    'maxlength':     'Last Name cannot be more than 25 characters long.'
  },
  'telnum': {
    'required':      'Tel. number is required.',
    'pattern':       'Tel. number must contain only numbers.'
  },
  'email': {
    'required':      'Email is required.',
    'email':         'Email not in valid format.'
  },
};


  constructor(private fb:FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }
  createForm(){
    this.feedbackForm = this.fb.group({
      firstname:['', [Validators.required, Validators.minLength(2),Validators.maxLength(25)]],
      lastname:['', [Validators.required, Validators.minLength(2),Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email:['', [Validators.required, , Validators.pattern]],
      agree: false,
      contacttype: 'None',
      message:['', Validators.required]
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  onSubmit(){
    this.feedback = this.feedbackForm.value;
    console.log("feedback", this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormD.reset();
  }

}

// tried using giverlyio format

  // createForm(){
  //   this.feedbackForm = this.fb.group({
  //     firstname:['', Validators.compose([Validators.required, Validators.minLength(2),Validators.maxLength(25)])],
  //     lastname:['', Validators.compose([Validators.required, Validators.minLength(2),Validators.maxLength(25)])],
  //     telnum: [0, Validators.compose([Validators.pattern('[0-9-]{1,10}$'), Validators.required])],
  //     email:['', Validators.compose([Validators.required, , Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')])],
  //     agree: false,
  //     contacttype: 'None',
  //     message:''
  //   });

  //   this.validationMessages = {
  //     'firstname': [
  //       { type: 'required', message: 'First Name is required.' },
  //       { type: 'minlength', message: 'First Name must be at least 2 characters long.' },
  //       { type: 'maxlength', message:  'FirstName cannot be more than 25 characters long.' },
  //       // 'required':      'First Name is required.',
  //       // 'minlength':     'First Name must be at least 2 characters long.',
  //       // 'maxlength':     'FirstName cannot be more than 25 characters long.'
  //     ],
  //     'lastname': [
  //       { type: 'required', message: 'Last Name is required.' },
  //       { type: 'minlength', message: 'Last Name must be at least 2 characters long.' },
  //       { type: 'maxlength', message:  'Last Name cannot be more than 25 characters long.' },
  //       // 'required':      'Last Name is required.',
  //       // 'minlength':     'Last Name must be at least 2 characters long.',
  //       // 'maxlength':     'Last Name cannot be more than 25 characters long.'
  //     ],
  //     'telnum': [
  //       { type: 'required', message:  'Tel. number is required.' },
  //       { type: 'pattern', message: 'Tel. number must contain only numbers.' }
  //       // 'required':      'Tel. number is required.',
  //       // 'pattern':       'Tel. number must contain only numbers.'
  //     ],
  //     'email': [
  //       { type: 'required', message:'Email is required.'  },
  //       { type: 'pattern', message:'Email not in valid format.'  }
  //     ],

  //     //   'required':      'Email is required.',
  //     //   'email':         'Email not in valid format.'
  //     // },
  //   };
  //   // this.feedbackForm.valueChanges
  //   //   .subscribe(data => this.onValueChanged(data));

  //   // this.onValueChanged(); // (re)set validation messages now
  // }

  // onValueChanged(data?: any){

  // }

