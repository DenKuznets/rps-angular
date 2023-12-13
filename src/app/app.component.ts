import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChoiceComponent } from './choice/choice.component';
import { ChoicesService } from './choices.service';
import { aiChoiceService } from './set-ai-choice.service';
import { DetermineWinnerService } from './determine-winner.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChoiceComponent],
  template: `
    <main>
      <app-choice type="paper"></app-choice>
      <button
        *ngFor="let choice of choicesService.getChoices() | keyvalue"
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
  choicesService: ChoicesService = inject(ChoicesService);
  aiChoiceService: aiChoiceService = inject(aiChoiceService);
  determineWinnerService: DetermineWinnerService = inject(
    DetermineWinnerService
  );
  choices = this.choicesService.getChoices();

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
      this.aiChoice = this.aiChoiceService.setAiChoice();
      this.winner = this.determineWinnerService.determineWinner(
        this.userChoice,
        this.aiChoice
      );
    }, 1500);
  }

  resetGame() {
    this.userChoice = 'no choice';
    this.aiChoice = 'no choice';
    this.winner = 'no winner';
  }
}
