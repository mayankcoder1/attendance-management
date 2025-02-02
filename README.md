# Attendance Management System

## Overview

The **Attendance Management System** is a web application designed to streamline employee attendance tracking. It allows staff to log in, capture their photos for attendance with timestamps, and submit them. Managers can view, edit, and manage this data through a professional dashboard.

## Features

- **User Authentication:** Unique credentials for staff and managers.
"users": [
    {
      "userId": "1",
      "username": "manager1",
      "password": "admin123",
      "role": "manager",
      "id": "142c"
    },
    {
      "userId": "2",
      "username": "staff1",
      "password": "staff123",
      "role": "staff",
      "id": "e73f"
    },
    {
      "userId": "3",
      "username": "staff2",
      "password": "staff456",
      "role": "staff",
      "id": "8e1f"
    }
  ]
- **Staff Portal:**
  - View personal name and shift details.
  - Capture photo for attendance using the webcam.
  - Submit attendance with timestamp.
- **Manager Dashboard:**
  - View all attendance records with staff photos, timestamps, and attendance status.
  - Add, edit, and delete staff from the roster.
  - Deleting a staff entry also removes their attendance records.

## Technology Stack

- **Frontend:** Angular 14

## Installation and Setup

### Frontend Setup

1. Navigate to the frontend folder and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Run in new terminal  npx json-server --watch db.json --port 3000
   to run the server 

3. Run the Angular development server:
   ```bash
   ng serve
   ```

4. Open the application in your browser at `http://localhost:4200`.

## Usage

- **Staff Login:** Use credentials to log in, view shift, and submit attendance.
- **Manager Login:** Access the dashboard to manage staff and view attendance records.

## Folder Structure

```
attendance-management-system/
├── frontend/
│   ├── src/
│   └── angular.json
└── README.md
```

## API Endpoints

- `GET /roster` - Fetch all staff data.
- `POST /roster` - Add new staff.
- `PUT /roster/:id` - Update staff details.
- `DELETE /roster/:id` - Delete staff and related attendance records.
- `GET /attendance` - Fetch attendance records.
- `POST /attendance` - Submit attendance.


**Developed with ❤️ using Angular.**
