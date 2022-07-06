function showNotify() {
    const showBtn = document.querySelector(".header-action .notify");
    const closeBtn = document.querySelector(".notification .header .close");
    const sidebar = document.querySelector(".sidebar");
    const container = document.querySelector(".container");
    const notification = document.querySelector(".notification");
    const body = document.body;

    showBtn.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
        container.classList.toggle("show-notify");
        notification.classList.toggle("show");
        body.classList.toggle("hide-scroll");
    });

    closeBtn.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
        container.classList.toggle("show-notify");
        notification.classList.toggle("show");
        body.classList.toggle("hide-scroll");
    });

};

function handleSidebar() {
    const sidebars = document.querySelectorAll(".sidebar-item:not(.parent)");
    const sidebarChilds = document.querySelectorAll(".sidebar-dropdown-item");
    const sidebarDropdowns = document.querySelectorAll(".sidebar-item.parent");

    function clearSidebar(list, activeSidebar, attribute = "active") {
        list.forEach(sidebar => {
            if (sidebar != activeSidebar) {
                sidebar.classList.remove(attribute);
            };
        });
    };

    sidebars.forEach(sidebar => {
        sidebar.addEventListener("click", () => {
            clearSidebar(sidebars, sidebar);
            clearSidebar(sidebarChilds);
            sidebar.classList.add("active");
        });
    });
  
    sidebarChilds.forEach(sidebarChild => {
        sidebarChild.addEventListener("click", (e) => {
            e.stopPropagation();
            let parent = sidebarChild.parentElement.parentElement;

            clearSidebar(sidebarChilds, sidebarChild);
            clearSidebar(sidebars);

            parent.classList.add("show");
            sidebarChild.classList.add("active");
        });
    });

    sidebarDropdowns.forEach(sidebarDropdown => {
        sidebarDropdown.addEventListener("click", () => {
            clearSidebar(sidebarDropdowns, sidebarDropdown, "show")
            sidebarDropdown.classList.toggle("show");
        });
    });
};

showNotify();
handleSidebar();
