function toggleSubMenu(id) {
  const subMenu = document.getElementById(id);
  const arrow = document.getElementById(id + "-arrow");

  if (subMenu.classList.contains("hidden")) {
    subMenu.classList.remove("hidden");
    subMenu.classList.add("flex");
    arrow.classList.add("rotate-180");
  } else {
    subMenu.classList.add("hidden");
    subMenu.classList.remove("flex");
    arrow.classList.remove("rotate-180");
  }
}
