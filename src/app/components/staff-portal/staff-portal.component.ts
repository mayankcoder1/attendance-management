import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { User, StaffDetails, AttendanceRecord } from '../../shared/interface/staff.interface ';

@Component({
  selector: 'app-staff-portal',
  standalone: true,
  imports: [WebcamModule, CommonModule, HttpClientModule],
  templateUrl: './staff-portal.component.html',
  styleUrl: './staff-portal.component.css'
})
export class StaffPortalComponent implements OnInit {
  private trigger: Subject<void> = new Subject();
  webcamImage: WebcamImage | null = null;
  user: User;
  staffDetails: StaffDetails | null = null;

  constructor(private readonly http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}') as User;
  }

  ngOnInit(): void {
    this.http.get<StaffDetails[]>(`http://localhost:3000/roster?userId=${this.user.userId}`)
      .subscribe((data) => {
        this.staffDetails = data[0] || null;
      });
  }

  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleImage(image: WebcamImage): void {
    this.webcamImage = image;
  }

  submitAttendance(): void {
    if (this.webcamImage && this.staffDetails) {
      const attendanceRecord: AttendanceRecord = {
        userId: this.user.userId,
        name: this.staffDetails.name,
        shift: this.staffDetails.shift,
        image: this.webcamImage.imageAsDataUrl,
        timestamp: new Date().toISOString(),
        status: 'Present'
      };

      this.http.post('http://localhost:3000/attendance', attendanceRecord)
        .subscribe(() => {
          alert('Attendance submitted!');
        });
    }
  }

  get triggerObservable() {
    return this.trigger.asObservable();
  }
}
