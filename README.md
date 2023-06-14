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


