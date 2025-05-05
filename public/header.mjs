export function hello() {
    const headerContainer = document.createElement("header");
    headerContainer.innerHTML = `
      <h1>
        Samiksha Karimbil
        <label>
            <input type="checkbox" id="dark" autocomplete="off" />
            Dark mode
        </label>
        <button id="menu-btn">Menu</button>
        <nav id="menu-links" class="nav-hidden">
          <a href="index.html">Home</a>
          <a href="projects.html">My projects</a>
        </nav>
      </h1>
    `;
  
    document.body.prepend(headerContainer); 
  
    const menuBtn = headerContainer.querySelector("#menu-btn");
    const navMenu = headerContainer.querySelector("#menu-links");
    const checkbox = headerContainer.querySelector("#dark");
  
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.toggle("nav-hidden");
    });
  
    document.body.addEventListener("click", (e) => {
      if (!headerContainer.contains(e.target)) {
        navMenu.classList.add("nav-hidden");
      }
    });
    const savedMode = localStorage.getItem("dark-mode");
    if (savedMode === "true") {
      document.body.classList.add("dark-mode");
      checkbox.checked = true;
    }
  
    checkbox.addEventListener("change", (e) => {
      if (checkbox.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("dark-mode", "true");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("dark-mode", "false");
      }
    });
  }
  