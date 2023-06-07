$(document).ready(function () {
  $("form").on("submit", function () {
    const titleInput = $("#title");
    const ratingInput = $("#rating");
    const awardsInput = $("#awards");
    const releaseDateInput = $("#releaseDate");
    const lengthInput = $("#length");

    const titleError = $("#titleError");
    const ratingError = $("#ratingError");
    const awardsError = $("#awardsError");
    const releaseDateError = $("#releaseDateError");
    const lengthError = $("#lengthError");

    titleError.text("");
    ratingError.text("");
    awardsError.text("");
    releaseDateError.text("");
    lengthError.text("");

    const isValid = true;

    // Title validation
    if (titleInput.val().trim() === "") {
      titleError.text("Title is required");
      isValid = false;
    } else if (titleInput.val().length > 500) {
      titleError.text("Title must be a maximum of 500 characters");
      isValid = false;
    }

    // Rating validation
    if (
      ratingInput.val() < 0.1 ||
      ratingInput.val() > 10 ||
      isNaN(ratingInput.val())
    ) {
      ratingError.text("Rating must be a number between 0.1 and 10");
      isValid = false;
    }

    // Awards validation
    if (awardsInput.val() && isNaN(awardsInput.val())) {
      awardsError.text("Awards must be a number");
      isValid = false;
    }

    // Release date validation
    if (releaseDateInput.val().trim() === "") {
      releaseDateError.text("Release Date is required");
      isValid = false;
    }

    // Length validation
    if (
      lengthInput.val() &&
      (lengthInput.val() < 0 ||
        lengthInput.val() > 500 ||
        isNaN(lengthInput.val()))
    ) {
      lengthError.text("Length must be a number between 0 and 500");
      isValid = false;
    }

    return isValid;
  });
});
