import { Injectable } from '@angular/core';
import { ChoicesInterface } from './choices-interface';

@Injectable({
  providedIn: 'root',
})
export class ChoicesService {
  choices: ChoicesInterface = {
    rock: 'rock',
    paper: 'paper',
    scissors: 'scissors',
  };
  constructor() {}

  getChoices(): ChoicesInterface {
    return this.choices;
  }
}
