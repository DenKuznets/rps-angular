import { Injectable, inject } from '@angular/core';
import { ChoicesService } from './choices.service';

@Injectable({
  providedIn: 'root',
})
export class aiChoiceService {
  choicesService: ChoicesService = inject(ChoicesService);
  choices = this.choicesService.getChoices();

  setAiChoice() {
    return Object.values(this.choices)[
      Math.floor(Math.random() * Object.values(this.choices).length)
    ];
  }
}
