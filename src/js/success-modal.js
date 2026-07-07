(function () {
  const overlay = document.getElementById("success-modal");
  const closeBtn = document.getElementById("successModalClose");

  function openSuccessModal() {
    overlay.classList.remove("is-hidden");
    document.body.classList.add("modal-open");
    document.addEventListener("keydown", handleEscapeKey);
  }

  function closeSuccessModal() {
    overlay.classList.add("is-hidden");
    document.body.classList.remove("modal-open");
    document.removeEventListener("keydown", handleEscapeKey);
  }

  function handleEscapeKey(e) {
    if (e.key === "Escape") {
      closeSuccessModal();
    }
  }

  closeBtn.addEventListener("click", closeSuccessModal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeSuccessModal();
    }
  });

  window.openSuccessModal = openSuccessModal;
  window.closeSuccessModal = closeSuccessModal;
})();