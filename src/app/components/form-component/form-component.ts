import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Job } from '../../job';
import { AiService } from '../../services/ai-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export const STACK: Record<string, string[]> = {
  Frontend: ['React / Next.js', 'Angular', 'Vue / Nuxt.js', 'Svelte', 'Astro', 'HTML5 / CSS3', 'TypeScript', 'SCSS', 'Tailwind CSS', 'Material UI', 'Shadcn'],
  Backend: [
    'JavaScript / TypeScript', 'Python', 'Java', 'C#', 'C++', 'Go', 'Rust', 'PHP', 'Ruby', 'Kotlin', 'Swift',
    'Node.js', 'NestJS', 'Express', 'Django', 'FastAPI', 'Flask', 'Spring Boot', 'Laravel', 'ASP.NET', 'Ruby on Rails', 'Gin',
    'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'Cassandra', 'Firebase',
    'REST API', 'GraphQL', 'gRPC', 'RabbitMQ', 'Kafka', 'Nginx'
  ],
  Fullstack: ['React / Next.js', 'Angular', 'Vue / Nuxt.js', 'Node.js', 'NestJS', 'Django', 'FastAPI', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'Redis', 'TypeScript', 'Docker', 'REST API', 'GraphQL'],
  Mobile: ['React Native', 'Flutter', 'Swift (iOS)', 'Kotlin (Android)', 'Expo'],
  DevOps: ['Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Jenkins', 'GitHub Actions', 'GitLab CI', 'AWS', 'GCP', 'Azure', 'Linux'],
  QA: ['Manual Testing', 'Selenium', 'Cypress', 'Playwright', 'Jest', 'Postman', 'JMeter'],
  'Data Science / AI': ['Python', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-learn', 'SQL', 'Jupyter'],
  'UI/UX': ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'Wireframing'],
  'Game Dev': ['Unity (C#)', 'Unreal Engine (C++)', 'Godot', 'Blender'],
};


@Component({
  selector: 'app-form-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-component.html',
  styleUrl: './form-component.scss',
})
export class FormComponent {
  private aiService = inject(AiService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  // кроки
  currentStep: number = 1;

  // крок 1
  levels = ['Intern', 'Trainee', 'Junior', 'Middle', 'Senior'];
  directions = Object.keys(STACK);
  selectedLevel: string = '';
  selectedDirection: string = '';

  // крок 2
  get availableStack(): string[] {
    return STACK[this.selectedDirection] ?? [];
  }
  selectedStack: string[] = [];

  // крок 3
  formats = ['Дистанційно', 'Гібрид', 'Офіс'];
  employments = ['Full-time', 'Part-time', 'Freelance', 'Стажування'];
  englishLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  selectedFormat: string = '';
  selectedEmployment: string = '';
  selectedEnglish: string = '';
  city: string = '';
  salaryFrom: string = '';
  salaryTo: string = '';

  isLoading: boolean = false;
  error: string = '';

  // навігація
  goToStep2(): void {
    if (!this.selectedLevel || !this.selectedDirection) return;
    this.currentStep = 2;
  }

  goToStep3(): void {
    if (this.selectedStack.length === 0) return;
    this.currentStep = 3;
  }

  goBack(): void {
    this.currentStep--;
  }

  // чекбокси
  toggleStack(item: string): void {
    this.selectedStack.includes(item)
      ? this.selectedStack = this.selectedStack.filter(s => s !== item)
      : this.selectedStack.push(item);
  }

  onSearch(): void {
    if (!this.selectedFormat || !this.selectedEmployment) return;

    this.isLoading = true;
    this.error = '';

    const skills = [
      this.selectedLevel,
      this.selectedDirection,
      ...this.selectedStack,
      this.selectedFormat,
      this.selectedEmployment,
      this.selectedEnglish ? `English ${this.selectedEnglish}` : '',
      this.city ? `місто: ${this.city}` : '',
      this.salaryFrom ? `зарплата від ${this.salaryFrom}$` : '',
      this.salaryTo ? `до ${this.salaryTo}$` : '',
    ].filter(Boolean);

    this.aiService.findJobs(skills).subscribe({
      next: (jobs) => {
        this.aiService.jobs = jobs;
        this.isLoading = false;
        this.cdr.detectChanges();
        this.router.navigate(['/jobs']);
      },
      error: (err) => {
        this.error = 'Помилка запиту. Спробуй ще раз.';
        this.isLoading = false;
        this.cdr.detectChanges();
        console.error(err);
      }
    });
  }
}

