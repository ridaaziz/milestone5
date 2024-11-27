// Get references to the form and display area
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
// Handle form submission
form.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault(); // prevent page reload
    // Collect Input values
    var profilePicInput = document.getElementById('Profilepicture');
    var objective = document.getElementById('objective').value;
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var FatherName = document.getElementById('FaterName').value;
    var phone = document.getElementById('phone').value;
    var cnic = document.getElementById('cnic').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var education = document.getElementById('education').value;
    var Qualification = document.getElementById('Qualification').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // save form data in localstorage with the username as the key
    var resumeData = {
        objective: objective,
        name: name,
        FatherName: FatherName,
        phone: phone,
        cnic: cnic,
        email: email,
        address: address,
        education: education,
        Qualification: Qualification,
        experience: experience,
        skills: skills,
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    // Check if a profile picture is selected
    var profilePicture = '';
    var profilePicFile = (_a = profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (profilePicFile) {
        // Create a FileReader to convert the image to a base24 string
        var reader_1 = new FileReader();
        reader_1.onloadend = function () {
            // Use the result from FileReader to set the base64 image
            profilePicture = reader_1.result;
            // Generate the resume content dynamically after the image is loaded
            generateResume();
        };
        // Read the image file as base64
        reader_1.readAsDataURL(profilePicFile);
    }
    else {
        // If no image is selected, proceed without a profile picture
        generateResume();
    }
    // Function to generate the resume HTML
    function generateResume() {
        // Generate the resume HTML content
        var resumeHTML = "\n      <!DOCTYPE html>\n      <html lang=\"en\">\n      <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <title>Resume</title>\n        <link rel=\"stylesheet\" href=\"styles.css\">\n      </head>\n      <body>\n        <div class=\"resume-container\">\n          <header class=\"resume-header\">\n            <h2 class=\"resume-title\"><b>Resume</b></h2>\n             <!-- Profile Picture Section -->\n          ".concat(profilePicture ? "\n            <section class=\"Profilepicture\">\n            <img src=\"".concat(profilePicture, "\" alt=\"Profile Picture\"  class=\"Profilepicture\">    \n\n            </section>\n          ") : '', "\n      \n          </header>\n          <!-- Personal Information Section -->\n          <section class=\"personal-info\">\n            <h3><b>Personal Information</b></h3>\n            <div class=\"info-item\">\n              <label for=\"objective\">Objective:</label>\n              <span contenteditable=\"true\" id=\"objective\">").concat(objective, "</span>\n            </div>\n            <div class=\"info-item\">\n              <label for=\"name\">Name:</label>\n              <span contenteditable=\"true\" id=\"name\">").concat(name, "</span>\n            </div>\n            <div class=\"info-item\">\n              <label for=\"fatherName\">Father's Name:</label>\n              <span contenteditable=\"true\" id=\"fatherName\">").concat(FatherName, "</span>\n            </div>\n            <div class=\"info-item\">\n              <label for=\"contact\">Contact:</label>\n              <span contenteditable=\"true\" id=\"contact\">").concat(phone, "</span>\n            </div>\n            <div class=\"info-item\">\n              <label for=\"cnic\">CNIC:</label>\n              <span contenteditable=\"true\" id=\"cnic\">").concat(cnic, "</span>\n            </div>\n            <div class=\"info-item\">\n              <label for=\"email\">Email:</label>\n              <span contenteditable=\"true\" id=\"email\">").concat(email, "</span>\n            </div>\n            <div class=\"info-item\">\n              <label for=\"address\">Address:</label>\n              <span contenteditable=\"true\" id=\"address\">").concat(address, "</span>\n            </div>\n          </section>\n\n          <!-- Education Section -->\n          <section class=\"education\">\n            <h3><b>Education</b></h3>\n            <div class=\"info-item\">\n              <span contenteditable=\"true\">").concat(education, " ").concat(Qualification, "</span>\n            </div>\n          </section>\n\n          <!-- Experience Section -->\n          <section class=\"experience\">\n            <h3><b>Experience</b></h3>\n            <div class=\"info-item\">\n              <span contenteditable=\"true\">").concat(experience, "</span>\n            </div>\n          </section>\n\n          <!-- Skills Section -->\n          <section class=\"skills\">\n            <h3><b>Skills</b></h3>\n            <div class=\"info-item\">\n              <span contenteditable=\"true\">").concat(skills, "</span>\n            </div>\n          </section>\n          <b>Download as PDF</b>\n        </div>\n      </body>\n      </html>\n    ");
        // Display the generated resume
        resumeDisplayElement.innerHTML = resumeHTML;
        // generate a shareable url with username only
        var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
        // Display the shareable link
        shareableLinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
    }
});
// Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value =
                username;
            document.getElementById('name').value =
                resumeData.name;
            document.getElementById('FatherName').value =
                resumeData.FaterName;
            document.getElementById('phone').value =
                resumeData.phone;
            document.getElementById('cnic').value =
                resumeData.cnic;
            document.getElementById('email').value =
                resumeData.email;
            document.getElementById('address').value =
                resumeData.address;
            document.getElementById('education').value =
                resumeData.education;
            document.getElementById('Qualification').value =
                resumeData.Qualification;
            document.getElementById('experience').value
                = resumeData.experience;
            document.getElementById('skills').value =
                resumeData.skills;
        }
    }
});