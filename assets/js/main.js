// Navbar scroll effect
window.addEventListener("scroll", () => {
  document.querySelector(".navbar")
    .classList.toggle("scrolled", window.scrollY > 80);
});

// Character counter
const messageInput = document.getElementById("message");
const charCount = document.getElementById("charCount");

messageInput.addEventListener("input", () => {
  // Update character count
  const currentLength = messageInput.value.length;
  charCount.textContent = `${currentLength}/500 characters`;

  // Prevent exceeding 500 characters
  if (currentLength > 500) {
    messageInput.value = messageInput.value.slice(0, 500);
    charCount.textContent = "500/500 characters";  // Update to the max count
  }
});



function sendmail() {
  const btn = document.getElementById("submit");
  const successMessage = document.getElementById("successMessage");


  const params = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    interest: document.getElementById("interest").value,
    message: document.getElementById("message").value,
  };

  if (!params.fullName || !params.email || !params.phone || !params.message) {
    alert("Please fill all required fields.");
    return;
  }
  
  btn.disabled = true;
  btn.classList.add("loading");

  emailjs.send("service_bpfkepx", "template_ydc08bc", params)
    .then(() => {
      successMessage.classList.remove("d-none");

      document.getElementById("fullName").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("interest").selectedIndex = 0;
      document.getElementById("message").value = "";
      document.getElementById("charCount").textContent = "0/500 characters";
      
      // Auto hide success message
      setTimeout(() => {
        successMessage.classList.add("d-none");
      }, 4000);
    })
    .catch(err => {
      alert("Message sending failed. Please try again.");
      console.error(err);
    })
    .finally(() => {
      // ⏹ Stop loading
      btn.classList.remove("loading");
      btn.disabled = false;
    });
}
