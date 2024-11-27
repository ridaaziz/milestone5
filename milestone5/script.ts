
// Get references to the form and display area
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLDivElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLDivElement;

// Handle form submission
form.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // prevent page reload

  // Collect Input values
  const profilePicInput = document.getElementById('Profilepicture') as HTMLInputElement;
  const objective = (document.getElementById('objective') as HTMLInputElement).value;
  const username = (document.getElementById('username') as HTMLInputElement).value;
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const FatherName = (document.getElementById('FaterName') as HTMLInputElement).value;
  const phone = (document.getElementById('phone') as HTMLInputElement).value;
  const cnic = (document.getElementById('cnic') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const address = (document.getElementById('address') as HTMLInputElement).value;
  const education = (document.getElementById('education') as HTMLInputElement).value;
  const Qualification = (document.getElementById('Qualification') as HTMLInputElement).value;
  const experience = (document.getElementById('experience') as HTMLInputElement).value;
  const skills = (document.getElementById('skills') as HTMLInputElement).value;
// save form data in localstorage with the username as the key
const resumeData ={
   objective ,
   name, 
   FatherName ,
   phone ,
   cnic ,
   email ,
   address ,
   education,
   Qualification,
   experience ,
   skills ,

}
localStorage.setItem(username,JSON.stringify(resumeData));
  // Check if a profile picture is selected
  let profilePicture = '';
  const profilePicFile = profilePicInput.files?.[0];

  if (profilePicFile) {
    // Create a FileReader to convert the image to a base24 string
    const reader = new FileReader();
    reader.onloadend = () => {
      // Use the result from FileReader to set the base64 image
      profilePicture = reader.result as string;

      // Generate the resume content dynamically after the image is loaded
      generateResume();
    };

    // Read the image file as base64
    reader.readAsDataURL(profilePicFile);
  } else {
    // If no image is selected, proceed without a profile picture
    generateResume();
  }

  // Function to generate the resume HTML
  function generateResume() {
    // Generate the resume HTML content
    const resumeHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume</title>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <div class="resume-container">
          <header class="resume-header">
            <h2 class="resume-title"><b>Resume</b></h2>
             <!-- Profile Picture Section -->
          ${profilePicture ? `
            <section class="Profilepicture">
            <img src="${profilePicture}" alt="Profile Picture"  class="Profilepicture">    

            </section>
          ` : ''}
      
          </header>
          <!-- Personal Information Section -->
          <section class="personal-info">
            <h3><b>Personal Information</b></h3>
            <div class="info-item">
              <label for="objective">Objective:</label>
              <span contenteditable="true" id="objective">${objective}</span>
            </div>
            <div class="info-item">
              <label for="name">Name:</label>
              <span contenteditable="true" id="name">${name}</span>
            </div>
            <div class="info-item">
              <label for="fatherName">Father's Name:</label>
              <span contenteditable="true" id="fatherName">${FatherName}</span>
            </div>
            <div class="info-item">
              <label for="contact">Contact:</label>
              <span contenteditable="true" id="contact">${phone}</span>
            </div>
            <div class="info-item">
              <label for="cnic">CNIC:</label>
              <span contenteditable="true" id="cnic">${cnic}</span>
            </div>
            <div class="info-item">
              <label for="email">Email:</label>
              <span contenteditable="true" id="email">${email}</span>
            </div>
            <div class="info-item">
              <label for="address">Address:</label>
              <span contenteditable="true" id="address">${address}</span>
            </div>
          </section>

          <!-- Education Section -->
          <section class="education">
            <h3><b>Education</b></h3>
            <div class="info-item">
              <span contenteditable="true">${education} ${Qualification}</span>
            </div>
          </section>

          <!-- Experience Section -->
          <section class="experience">
            <h3><b>Experience</b></h3>
            <div class="info-item">
              <span contenteditable="true">${experience}</span>
            </div>
          </section>

          <!-- Skills Section -->
          <section class="skills">
            <h3><b>Skills</b></h3>
            <div class="info-item">
              <span contenteditable="true">${skills}</span>
            </div>
          </section>
          <b>Download as PDF</b>
        </div>
      </body>
      </html>
    `;

    // Display the generated resume
      resumeDisplayElement.innerHTML = resumeHTML;
    // generate a shareable url with username only
   const shareableURL=
   `${window.location.origin}?username=${encodeURIComponent(username)}`
// Display the shareable link
shareableLinkContainer.style.display = 'block';
shareableLinkElement.href = shareableURL;
shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
window.print(); // This will open the print dialog and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
if (username) {

// Autofill form if data is found in localStorage
const savedResumeData = localStorage.getItem(username);
if (savedResumeData) {
const resumeData = JSON.parse(savedResumeData);
(document.getElementById('username') as HTMLInputElement).value =
username;
(document.getElementById('name') as HTMLInputElement).value =
resumeData.name;
(document.getElementById('FatherName') as HTMLInputElement).value =
resumeData.FaterName;
(document.getElementById('phone') as HTMLInputElement).value =
resumeData.phone;
(document.getElementById('cnic') as HTMLInputElement).value =
resumeData.cnic;
(document.getElementById('email') as HTMLInputElement).value =
resumeData.email;
(document.getElementById('address') as HTMLInputElement).value =
resumeData.address;
(document.getElementById('education') as HTMLTextAreaElement).value =
resumeData.education;
(document.getElementById('Qualification') as HTMLInputElement).value =
resumeData.Qualification;
(document.getElementById('experience') as HTMLTextAreaElement).value
= resumeData.experience;
(document.getElementById('skills') as HTMLTextAreaElement).value =
resumeData.skills;
}
}
});
    