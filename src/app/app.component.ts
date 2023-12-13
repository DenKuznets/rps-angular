import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChoiceComponent } from './choice/choice.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChoiceComponent],
  template: `
    <main>
      <!-- <app-choice></app-choice> -->
      <button
        *ngFor="let choice of choices | keyvalue"
        (click)="setUserChoice(choice.value)"
      >
        {{ choice.value }}
      </button>
      <div>User choice</div>
      <div>{{ userChoice }}</div>
      <div>AI choice</div>
      <div>{{ aiChoice }}</div>
      <div>winner</div>
      <div>{{ winner }}</div>
      <button (click)="resetGame()">play again</button>
    </main>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rps-angular';
  userChoice = 'no choice';
  aiChoice = 'no choice';
  winner = 'no winner';
  choices = {
    rock: 'rock',
    paper: 'paper',
    scissors: 'scissors',
  };

  setUserChoice(choice: string) {
    this.userChoice = choice;
    this.choiceAnimation();
  }

  choiceAnimation() {
    let index = 0;
    const interval = setInterval(() => {
      let choices = Object.values(this.choices);
      this.aiChoice = choices[index];
      index++;
      index %= choices.length;
    }, 300);
    setTimeout(() => {
      clearInterval(interval);
      this.setAiChoice();
      this.determineWinner();
    }, 1500);
  }

  setAiChoice() {
    this.aiChoice = Object.values(this.choices)[
      Math.floor(Math.random() * Object.values(this.choices).length)
    ];
  }

  resetGame() {
    this.userChoice = 'no choice';
    this.aiChoice = 'no choice';
    this.winner = 'no winner';
  }

  determineWinner() {
    if (this.userChoice === this.aiChoice) {
      this.winner = 'draw';
    }
    switch (this.userChoice) {
      case this.choices.rock:
        if (this.aiChoice === this.choices.paper) {
          this.winner = 'computer';
        } else if (this.aiChoice === this.choices.scissors) {
          this.winner = 'player';
        }
        break;
      case this.choices.scissors:
        if (this.aiChoice === this.choices.rock) {
          this.winner = 'computer';
        } else if (this.aiChoice === this.choices.paper) {
          this.winner = 'player';
        }
        break;
      case this.choices.paper:
        if (this.aiChoice === this.choices.scissors) {
          this.winner = 'computer';
        } else if (this.aiChoice === this.choices.rock) {
          this.winner = 'player';
        }
        break;
    }
  }
}
