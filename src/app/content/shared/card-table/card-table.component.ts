import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-card-table',
  standalone: true,
  imports: [TranslateModule, NgFor, NgIf, RouterLink, DatePipe],
  templateUrl: './card-table.component.html',
  styleUrl: './card-table.component.css',
})
export class CardTableComponent {
  @Input() array: any[] = [];
  constructor() {}
}
