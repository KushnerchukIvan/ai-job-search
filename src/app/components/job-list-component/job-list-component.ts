import { Component, Input, inject } from '@angular/core';
import { Job } from '../../job';
import { AiService } from '../../services/ai-service';

@Component({
  selector: 'app-job-list-component',
  imports: [],
  templateUrl: './job-list-component.html',
  styleUrl: './job-list-component.scss',
})
export class JobListComponent {
  private aiService = inject(AiService);

  get jobs(): Job[] {
    return this.aiService.jobs;
  }
}
