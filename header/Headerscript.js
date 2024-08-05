export function loadHeader() {
  const headerHTML = `
        <header>
            <div class="header-wrap">
                <p>Kanban Project Management Tool</p>
                <div class="align-this">
                    <img src="../header/img_header/help.svg" alt="" />
                    <div class="container">
                    <img class="ellipse-style" src="../header/img_header/Ellipse_3.svg" alt="">                 
                        <span id="user-logged-in" class="span-size">SM</span>
                    </div>
                </div>
            </div>
        </header>
    `;

  document.getElementById("header-placeholder").innerHTML = headerHTML;
}
