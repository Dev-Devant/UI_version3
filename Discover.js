function toggleCourseDetails(element) {
  const details = element.querySelector(".course-details");
  const summary = element.querySelector(".course-summary");

  if (details.style.display === "none" || details.style.display === "") {
    details.style.display = "block"; // Muestra los detalles
    summary.style.display = "none"; // Oculta el resumen
  } else {
    details.style.display = "none"; // Oculta los detalles
    summary.style.display = "block"; // Muestra el resumen
  }
}

// Function to handle button clicks
function handleButtonClick(buttonId) {
  // Remove 'active' class from all buttons
  const buttons = document.querySelectorAll(".custom-button");
  buttons.forEach((button) => button.classList.remove("active"));

  // Add 'active' class to the clicked button
  const clickedButton = document.getElementById(buttonId);
  if (clickedButton) {
    clickedButton.classList.add("active");
  }

  // Here you can add logic to fetch and display courses based on the button clicked
  console.log(`Button clicked: ${buttonId}`);
  // For example:
  // fetchCourses(buttonId);
}

// Function to create course list container
function createCourseListContainer(courses) {
  const container = document.getElementById("courseListContainer");

  // Clear existing content
  container.innerHTML = "";

  // Create and append course items
  courses.forEach((course) => {
    const courseItem = document.createElement("div");
    courseItem.className = "course-item";
    courseItem.style.cssText = `
        background-color: #2c2c2c;
        color: white;
        padding: 20px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      `;

    courseItem.innerHTML = `
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <span>Rating: ${course.rating}</span>
      `;

    courseItem.addEventListener("click", () => {
      console.log(`Course clicked: ${course.title}`);
      // Add logic to show more details or navigate to course page
    });

    container.appendChild(courseItem);
  });
}

// Example usage:
document.addEventListener("DOMContentLoaded", () => {
  // Add click event listeners to buttons
  ["Mejores", "Escuelas", "Populares", "Recomendados"].forEach((id) => {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener("click", () => handleButtonClick(id));
    }
  });
  // Create initial course list
  createCourseListContainer(discoverCoursesPreload.Recomend);
});
