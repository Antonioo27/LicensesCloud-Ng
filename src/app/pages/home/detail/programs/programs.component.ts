import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent {

  @Input() licenseType0 = [];

  // onChangeEnabled() {
  //   this.licenseType0.enabled = !(this.licenseType0.enabled);
  // }



}
