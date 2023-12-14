import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChoiceComponent } from './choice/choice.component';
import { ChoicesService } from './choices.service';
import { aiChoiceService } from './set-ai-choice.service';
import { DetermineWinnerService } from './determine-winner.service';
import { StubComponent } from './stub/stub.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChoiceComponent, StubComponent],
  template: `
    <main>
      <div class="buttons">
        <button
          [disabled]="winner"
          *ngFor="let choice of choicesService.getChoices() | keyvalue"
          (click)="setUserChoice(choice.value)"
        >
          {{ choice.value }}
        </button>
      </div>
      <div class="field">
        <div class="user">
          <div>User choice</div>
          <app-choice *ngIf="userChoice" [type]="userChoice"></app-choice>
          <app-stub *ngIf="!userChoice"></app-stub>
        </div>
        <div *ngIf="winner" class="winner">
          <div>
            {{ winner === 'draw' ? winner : 'The winner is ' + winner }}
          </div>
          <button style="margin: 0 auto;display: block;" (click)="resetGame()">
            play again
          </button>
        </div>
        <div class="ai">
          <div>AI choice</div>
          <app-stub *ngIf="!aiChoice"></app-stub>
          <app-choice *ngIf="aiChoice" [type]="aiChoice"></app-choice>
        </div>
      </div>
    </main>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rps-angular';
  userChoice = '';
  aiChoice = '';
  winner = '';
  choicesService: ChoicesService = inject(ChoicesService);
  aiChoiceService: aiChoiceService = inject(aiChoiceService);
  determineWinnerService: DetermineWinnerService = inject(
    DetermineWinnerService
  );
  choices = this.choicesService.getChoices();

  setUserChoice(choice: string) {
    this.userChoice = choice;
    this.aiChoiceAnimation();
  }

  aiChoiceAnimation() {
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
    this.userChoice = '';
    this.aiChoice = '';
    this.winner = '';
  }
}
