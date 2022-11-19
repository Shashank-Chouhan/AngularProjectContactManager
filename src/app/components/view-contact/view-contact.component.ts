import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  // getting id from url using activated route
  public contactId: string | null = null;
  public loading: boolean = false;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public group: IGroup = {} as IGroup;

  constructor(private activatedRoute: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (param: ParamMap) => {
        this.contactId = param.get('contactId')
      }
    );

    if(this.contactId){
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe(
        (data)=> {
          this.contact = data; 
          this.loading = false;
          this.contactService.getGroup(data.groupId).subscribe(
            (data)=>{this.group = data;}
          );
        },
        (err)=>{
          this.errorMessage = err;
          this.loading = false;
        }
      );
    }
  }

  public isNotEmpty(){
    return Object.keys(this.contact).length>0 && Object.keys(this.group).length>0;
  }

}
