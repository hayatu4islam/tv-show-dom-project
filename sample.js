function highlightWords(paragraph, colours) {
  const container = document.getElementById("content");
  const select = document.createElement("select");
  const option = document.createElement("option");
  option.innerText = "Choose a colour";
  select.appendChild(option).disabled = true;
  container.appendChild(select);

  const par = document.createElement("p");
  container.appendChild(par);

  colours.forEach((color) => {
    const opt = document.createElement("option");
    opt.innerText = color;
    select.appendChild(opt);
  });

  paragraph.split(" ").forEach((word) => {
    const span = document.createElement("span");
    span.innerText = word + " ";
    par.appendChild(span);
    span.addEventListener("click", () => {
      span.style.backgroundColor = select.value;
    });
  });
