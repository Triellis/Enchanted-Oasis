import React, { useState } from "react";
function send() {
  const body = {
    title: "Events",
    body: `
		# School Notification

		Dear Parents and Guardians,
		
		We hope this message finds you well. We would like to bring the following important updates and reminders to your attention:
		
		## Upcoming Events
		
		1. **Parent-Teacher Conferences**:
		   - Date: Friday, July 28th, 2023
		   - Time: 2:00 PM - 6:00 PM
		   - Venue: School Auditorium
		   - Please ensure to book your preferred time slot with your child's teacher via the school's parent portal.
		
		2. **School Picnic**:
		   - Date: Saturday, August 5th, 2023
		   - Time: 10:00 AM - 3:00 PM
		   - Venue: Central Park
		   - All students, teachers, and families are invited to join us for a day of fun and bonding. Don't forget to bring your picnic baskets and blankets!
		
		## Important Reminders
		
		- **Uniform Policy**: We kindly remind all students to adhere to the school's uniform policy. Proper school attire is required during school hours and events.
		
		- **Late Arrival**: Students who arrive late to school must report to the front office for sign-in and obtain a late pass before proceeding to class.
		
		- **Homework Submission**: Please encourage your child to submit their homework on time and check the school's online platform for any assignments or updates.
		
		## Health and Safety
		
		As we continue to prioritize the health and safety of our school community, we kindly request all students, staff, and visitors to follow the COVID-19 safety guidelines:
		
		- Wear a mask while on school premises.
		- Practice frequent handwashing and use hand sanitizers available throughout the school.
		- Maintain social distancing.
		
		If your child is feeling unwell or showing any symptoms of illness, please keep them at home and inform the school immediately.
		
		## School Office Hours
		
		- Monday to Friday: 8:00 AM - 4:00 PM
		- Saturday: 9:00 AM - 12:00 PM
		
		For any queries or concerns, please feel free to contact the school office during the office hours mentioned above.
		
		Thank you for your continued support in ensuring a safe and enriching learning environment for our students.
		
		Best regards,
		
		[Your Name]
		School Administrator
		
		  `,
    badgeColor: "blue",
    badgeText: "typescript",
    audience: "All",
  };
  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  };

  fetch("http://localhost:3000/api/notification", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
const FileUploader = () => {
  return <div>Yo</div>;
};
send();
export default FileUploader;
