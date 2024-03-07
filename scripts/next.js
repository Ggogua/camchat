document.addEventListener("DOMContentLoaded", () => {
  function showNextSection(currentSectionId, nextSectionId) {
    const currentSection = document.getElementById(currentSectionId);
    const nextSection = document.getElementById(nextSectionId);

    if (currentSection && nextSection) {
      currentSection.style.display = "none";
      nextSection.style.display = "block";
    }
  }

  const nextButtons = document.querySelectorAll(".next-button");

  nextButtons.forEach((nextButton) => {
    nextButton.addEventListener("click", (event) => {
      const target = event.target;
      const currentSection = target.closest("section");
      const inputs = currentSection.querySelectorAll("input");

      let isValid = true;

      inputs.forEach((input) => {
        if (input.value.trim() === "") {
          isValid = false;
          input.style.border = "1px solid red";
        } else {
          input.style.border = "";
        }
      });

      if (isValid) {
        const nextSectionId = target.getAttribute("data-next-section");
        showNextSection(currentSection.id, nextSectionId);
      }

      if (isValid) {
        const nextSectionId = target.getAttribute("data-next-section");
        showNextSection(currentSection.id, nextSectionId);
        const profilePhotoUrl = profilePhotoPreview.src;
        localStorage.setItem("profilePhotoUrl", profilePhotoUrl);
      }
    });
  });

  const profilePhotoInput = document.getElementById("profile-photo-input");
  const profilePhotoPreview = document.getElementById("profile-photo-preview");

  profilePhotoInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        profilePhotoPreview.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  });
});
