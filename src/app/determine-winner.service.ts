import { Injectable, inject } from '@angular/core';
import { ChoicesService } from './choices.service';

@Injectable({
  providedIn: 'root',
})
export class DetermineWinnerService {
  choicesService: ChoicesService = inject(ChoicesService);
  choices = this.choicesService.getChoices();

  determineWinner(userChoice: string, aiChoice: string): string {
    if (userChoice === aiChoice) {
      return 'draw';
    }
    switch (userChoice) {
      case this.choices.rock:
        if (aiChoice === this.choices.paper) {
          return 'computer';
        } else if (aiChoice === this.choices.scissors) {
          return 'player';
        }
        break;
      case this.choices.scissors:
        if (aiChoice === this.choices.rock) {
          return 'computer';
        } else if (aiChoice === this.choices.paper) {
          return 'player';
        }
        break;
      case this.choices.paper:
        if (aiChoice === this.choices.scissors) {
          return 'computer';
        } else if (aiChoice === this.choices.rock) {
          return 'player';
        }
        break;
    }
    return 'unknown roles';
  }
}
