const buttons = document.querySelectorAll("button");

for (const button of buttons) {
  button.addEventListener("click", (e) => {
    console.log(e.target.id);
  });
}
