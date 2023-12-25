import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-not-logged-in',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './not-logged-in.component.html',
  styleUrl: './not-logged-in.component.css',
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500)
      ]),
      transition(':leave', [
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class NotLoggedInComponent {
  public isAnimationEnabled = true;
}
