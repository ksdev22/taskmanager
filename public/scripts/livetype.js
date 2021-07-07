const headings = document.querySelectorAll(".live-type");

const h2 = headings[0];
const h4 = headings[1];

const h2Text = "Welcome";
const h4Text = "What would you like to do?";

const fillHeading = async (char, toFill) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      toFill.textContent += char;
      return resolve();
    }, 50);
  });
};

const fill = async (text, heading) => {
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    await fillHeading(char, heading);
  }
};

const type = async (h2Text, h4Text) => {
  await fill("Welcome", h2);
  await fill("What would you like to do?", h4);
};
type();
