(function () {
  const overlay = document.getElementById("successModalOverlay");
  const closeBtn = document.getElementById("successModalClose");

  function openSuccessModal() {
    overlay.hidden = false;
    document.body.classList.add("modal-open");
    document.addEventListener("keydown", handleEscapeKey);
  }

  function closeSuccessModal() {
    overlay.hidden = true;
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