 export interface User {
    userId: string;
    name: string;
    email?: string; // Optional if not always available
  }
  
 export interface StaffDetails {
    userId: string;
    name: string;
    shift: string;
  }
    
 export interface AttendanceRecord {
    userId: string;
    name: string;
    shift: string;
    image: string;
    timestamp: string;
    status: 'Present' | 'Absent';
  }
  
 export interface Staff {
    id: string;
    userId: string;
    name: string;
    shift: string;
  }