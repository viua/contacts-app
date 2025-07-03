import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ContactsService} from "../contacts/contacts.service";

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  constructor(private route: ActivatedRoute, private contactsService: ContactsService, private router: Router,
              private fb: FormBuilder) {
  }

  /// contactForm = new FormGroup({
  contactForm = this.fb.nonNullable.group({
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: <Date | null> null,
    favoritesRanking: <number | null> null,
    phone: this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
    }),
    address: this.fb.nonNullable.group({
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: ''
    })
  });


  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactsService.getContact(contactId).subscribe((contact) => {
      if (!contact) {
        return;
      }
      this.contactForm.setValue(contact);

      /// *** partial filling form ***
      /// const names = {firstName: contact.firstName, lastName: contact.lastName};
      /// this.contactForm.patchValue(names);
    });
  }

  saveContact() {
    console.log("saving=>", this.contactForm.value);
    this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe({
    /// this.contactsService.saveContact(this.contactForm.value).subscribe({
      next: () => this.router.navigate(['/contacts'])
    });
  }
}
