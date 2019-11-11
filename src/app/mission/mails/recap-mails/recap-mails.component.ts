import {Component, Input, OnInit} from '@angular/core';
import {CrfMail} from "../../../model/CrfMail";
import {CrfService} from "../../../api/crf.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-recap-mails',
  templateUrl: './recap-mails.component.html',
  styleUrls: ['./recap-mails.component.css']
})
export class RecapMailsComponent implements OnInit {

  @Input() crfMails: CrfMail[];

  constructor(private crfService: CrfService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  sendRecap() {
    this.crfService.sendRecap(this.crfMails).subscribe(result => {
      if (result) {
        this.snackBar.open("Le récap a été envoyé.", null, {
          duration: 2000
        })
      } else {
        this.snackBar.open("Une erreur s'est produite lors de l'envoi du récap.", null, {
          duration: 2000
        })
      }
    })
  }

  removeMail(crfMail: CrfMail) {
    this.crfMails = this.crfMails.filter(mail => mail !== crfMail);
  }
}
