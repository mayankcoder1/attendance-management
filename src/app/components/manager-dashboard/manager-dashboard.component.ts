import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Staff, AttendanceRecord } from '../../shared/interface/staff.interface ';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent implements OnInit {
  roster: Staff[] = [];
  attendance: AttendanceRecord[] = [];
  newStaff: Partial<Staff> = { name: '', shift: '' };
  editStaff: Staff | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadRoster();
    this.loadAttendance();
  }

  loadRoster(): void {
    this.http.get<Staff[]>('http://localhost:3000/roster')
      .subscribe(data => this.roster = data);
  }

  loadAttendance(): void {
    this.http.get<AttendanceRecord[]>('http://localhost:3000/attendance')
      .subscribe(data => this.attendance = data);
  }

  addStaff(): void {
    if (this.newStaff.name && this.newStaff.shift) {
      this.http.post<Staff>('http://localhost:3000/roster', this.newStaff)
        .subscribe(() => {
          this.newStaff = { name: '', shift: '' };
          this.loadRoster();
        });
    }
  }

  edit(staff: Staff): void {
    this.editStaff = { ...staff };
  }

  saveEdit(): void {
    if (this.editStaff) {
      this.http.put(`http://localhost:3000/roster/${this.editStaff.id}`, this.editStaff)
        .subscribe(() => {
          this.editStaff = null;
          this.loadRoster();
        });
    }
  }

  deleteStaff(id: string): void {
    this.http.delete(`http://localhost:3000/roster/${id}`)
      .subscribe(() => {
        this.loadRoster();
        this.http.delete(`http://localhost:3000/attendance?userId=${id}`).subscribe(); // Deletes attendance as well
      });
  }

  getAttendancePhoto(staffId: string): string {
    const record = this.attendance.find(a => a.userId === staffId);
    return record ? record.image : 'assets/default-photo.jpeg';
  }

  getAttendanceTimestamp(staffId: string): string {
    const record = this.attendance.find(a => a.userId === staffId);
    return record ? record.timestamp : 'N/A';
  }

  getAttendanceStatus(staffId: string): string {
    const record = this.attendance.find(a => a.userId === staffId);
    return record ? 'Present' : 'Absent';
  }
}
