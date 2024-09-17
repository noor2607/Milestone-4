document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const profileinput = document.getElementById('profile') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const contactElement = document.getElementById('contact') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('work') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;

    if (profileinput && nameElement && emailElement && contactElement && educationElement && experienceElement && skillsElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = contactElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value; 
        const profilefile = profileinput.files?.[0];
        const profileURL = profilefile ? URL.createObjectURL(profilefile) : "";

        const resumeoutput = `
            <h2>Resume</h2>
            ${profileURL ? `<img src="${profileURL}" alt="Profile picture" class="profile">` : ""}
            <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
            <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
            <p><strong>Contact No:</strong> <span id="edit-contact" class="editable">${phone}</span></p>
            <h3>Education</h3>
            <p id="edit-education" class="editable">${education}</p>
            <h3>Skills</h3>
            <p id="edit-skills" class="editable">${skills}</p>
            <h3>Experience</h3>
            <p id="edit-experience" class="editable">${experience}</p>
        `;

        const resumeOutputElement = document.getElementById('resumeoutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeoutput;
            makeEditable();
        }
    } else {
        console.error('One or more input elements are missing');
    }
});

function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');

    editableElements.forEach(element => {
        element.addEventListener('click', function() {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('editing-input');

                input.addEventListener('blur', function() {
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline';
                    input.remove();
                });

                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();
            }
        });
    });
}
