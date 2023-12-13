import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-choice',
  standalone: true,
  imports: [],
  template: `
    <div [class]="type">
      <div>
        <div>
          <img
            src="assets/icon-paper.svg"
            alt="paper"
            height="auto"
            width="45%"
          />
        </div>
      </div>
    </div>
  `,
  styleUrl: './choice.component.scss',
})
export class ChoiceComponent {
  @Input() type: string = '';
}
