(function () {
  const overlay = document.getElementById("success-modal");
  const closeBtn = document.getElementById("successModalClose");


  function openSuccessModal() {
    overlay.classList.remove("is-hidden");
  }

  function closeSuccessModal() {
    overlay.classList.add("is-hidden");
  }

  function handleEscapeKey(e) {
    if (e.key === "Escape") {
      closeSuccessModal();
    }
  }

  // Слідкуємо за зміною класу is-hidden, незалежно від того, хто його змінив
  const observer = new MutationObserver(() => {
    const isVisible = !overlay.classList.contains("is-hidden");
    if (isVisible) {
      document.body.classList.add("modal-open");
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleEscapeKey);
    }
  });

  observer.observe(overlay, { attributes: true, attributeFilter: ["class"] });

  closeBtn.addEventListener("click", closeSuccessModal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeSuccessModal();
    }
  });

  window.openSuccessModal = openSuccessModal;
  window.closeSuccessModal = closeSuccessModal;
})();