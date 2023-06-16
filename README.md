# Quick overview of my initial Planning
I had a look through the requirements of the user stories and aimed to create an initial schema for both the teacher and student objects
Take a look at the image below:
<details>
<summary>Initial Schema</summary>

![image](https://github.com/arhussain1/SeniorBackendDevAssessment/assets/96926931/d6f1bd20-4712-40e6-b400-e8651851a6d2)

</details>

Upon further thinking, I realised embedding student and teacher relationships can become messy for example:
if we need to remove a student we would need to search for all teachers who have this student registered and remove them
And a similar issue arises for removing teachers

A better solution is to have a relationship table to represents the Registrations between students and teachers
The resulting schema would become:

<details>
<summary>Updated Schema</summary>

![image](https://github.com/arhussain1/SeniorBackendDevAssessment/assets/96926931/4ab97685-d3c5-405e-acfa-567081a81084)

</details>

# Teacher-Student Registration API

This RESTful API is built using Node.js, MongoDB, and Express framework to facilitate teacher-student registration and management. The API provides endpoints for registering students to a teacher, retrieving common students among multiple teachers, suspending students, and retrieving students who can receive notifications from a teacher.

## Prerequisites

- Node.js installed on your machine
- MongoDB database connection is running on your machine

## Installation

1. Clone the repository 
2. Install the dependencies:
```
cd teacher-student-api
npm install
```
3. Set up the MongoDB connection by updating the configuration file located at `config/database.js` with your MongoDB connection details.
It is currently set to `mongodb://localhost:27017/mydatabase`

## API Endpoints

### Register Students
Register one or more students to a specified teacher. The API will create the teacher and students if they don't already exist in the system.

- Endpoint: `POST /api/register`
- Headers: `Content-Type: application/json`
- Success response status: `HTTP 204`

- Request body example:

```json
{
  "teacher": "teacherken@gmail.com",
  "students": [
    "studentjon@example.com",
    "studenthon@example.com"
  ]
}
```
<br/><br/>
### Retrieve Common Students
Retrieve a list of students common to a given list of teachers, i.e., retrieve students who are registered to all of the given teachers.

- Endpoint: GET /api/commonstudents
- Success response status: HTTP 200

- Request body example 1:
```
GET /api/commonstudents?teacher=teacherken%40example.com
```

- Success response body 1:
```json
{
  "students": [
    "commonstudent1@gmail.com",
    "commonstudent2@gmail.com",
    "student_only_under_teacher_ken@gmail.com"
  ]
}
```

- Request example 2:
```
GET /api/commonstudents?teacher=teacherken%40example.com&teacher=teacherjoe%40example.com
```

- Success response body 2:
```json
{
  "students": [
    "commonstudent1@gmail.com",
    "commonstudent2@gmail.com"
  ]
}
```
<br/><br/>
### Suspend Student
Suspend a specified student by providing their email.

- Endpoint: POST /api/suspend
- Headers: Content-Type: application/json
- Success response status: HTTP 204

- Request body example:

```json
{
  "student": "studentmary@gmail.com"
}
```
<br/><br/>
### Retrieve Students for Notification
Retrieve a list of students who can receive a given notification from a teacher. A student must not be suspended and fulfill at least one of the following conditions: be registered with the teacher or be @mentioned in the notification.

- Endpoint: POST /api/retrievefornotifications
- Headers: Content-Type: application/json
- Success response status: HTTP 200

- Request body example 1:
```json
{
  "teacher": "teacherken@example.com",
  "notification": "Hello students! @studentagnes@example.com @studentmiche@example.com"
}
```

- Success response body 1:
```json
{
  "recipients": [
    "studentbob@example.com",
    "studentagnes@example.com",
    "studentmiche@example.com"
  ]
}
```

- Request body example 2:
```json
{
  "teacher": "teacherken@example.com",
  "notification": "Hey everybody"
}
```

- Success response body 2:
```json
{
  "recipients": [
    "studentbob@example.com"
  ]
}
```









