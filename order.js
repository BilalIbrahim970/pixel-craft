/* ============================================
   PIXEL CRAFT — ORDER FORM → WHATSAPP
   ============================================ */

const WHATSAPP_NUMBER = "923314440854";

// URL se service pre-select
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const preselected = params.get("service");
  if (preselected) {
    const select = document.getElementById("service");
    if (select) {
      for (let opt of select.options) {
        if (opt.value.toLowerCase() === preselected.toLowerCase()) {
          select.value = opt.value;
          break;
        }
      }
    }
  }

  // Form submit
  const form = document.getElementById("orderForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const budget = document.getElementById("budget").value.trim();
    const details = document.getElementById("details").value.trim();
    const deadline = document.getElementById("deadline").value;

    if (!name || !phone || !service || !details) {
      alert("Please fill all required fields.");
      return;
    }

    let msg = `*🆕 New Order — Pixel Craft*\n\n`;
    msg += `*👤 Name:* ${name}\n`;
    msg += `*📱 Phone:* ${phone}\n`;
    if (email) msg += `*📧 Email:* ${email}\n`;
    msg += `*🎯 Service:* ${service}\n`;
    if (budget) msg += `*💰 Budget:* ${budget}\n`;
    if (deadline) msg += `*📅 Deadline:* ${deadline}\n`;
    msg += `\n*📝 Details:*\n${details}\n`;
    msg += `\n_Sent from Pixel Craft website_`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  });
});