function toggleCourseDetails(element) {
    const details = element.querySelector(".course-details");
    const summary = element.querySelector(".course-summary");

    if (
      details.style.display === "none" ||
      details.style.display === ""
    ) {
      details.style.display = "block"; // Muestra los detalles
      summary.style.display = "none"; // Oculta el resumen
    } else {
      details.style.display = "none"; // Oculta los detalles
      summary.style.display = "block"; // Muestra el resumen
    }
  }