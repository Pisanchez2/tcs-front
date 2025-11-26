import {Component, input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-validation',
  imports: [],
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.scss'
})
export class ValidationComponent {
  control = input<AbstractControl | null>();
  label = input('');

}
