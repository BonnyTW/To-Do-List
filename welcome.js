const h3 = document.getElementById("animated-subheading");
const text = h3.textContent;
h3.textContent = ""; // clear original

// Wrap each character in a span for animation
for (let i = 0; i < text.length; i++) {
  const span = document.createElement("span");
  // replace space with non-breaking space character
  span.textContent = text[i] === " " ? "\u00A0" : text[i];
  h3.appendChild(span);
}
