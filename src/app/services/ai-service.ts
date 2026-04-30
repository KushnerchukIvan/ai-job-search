import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Job } from '../job';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private http = inject(HttpClient);

  jobs: Job[] = [];

  findJobs(skills: string[]): Observable<Job[]> {
  return this.http.post<{ jobs: Job[] }>('https://job-finder-backend-tj70.onrender.com', { skills }).pipe(
    map(res => res.jobs)
  );
}

}

