function showNotify() {
    const showBtn = document.querySelector(".header-action .notify");
    const closeBtn = document.querySelector(".notification .header .close");
    const sidebar = document.querySelector(".sidebar");
    const container = document.querySelector(".container");
    const notification = document.querySelector(".notification");

    showBtn.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
        container.classList.toggle("show-notify");
        container.classList.toggle("hide-scroll");
        notification.classList.toggle("show");

    });

    closeBtn.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
        container.classList.toggle("show-notify");
        container.classList.toggle("hide-scroll");
        notification.classList.toggle("show");
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

function showSidebar() {
    const openSidebar = document.querySelector(".menu-sidebar");
    const closeSidebar = document.querySelector(".close-sidebar");
    const overlay = document.querySelector(".overlay");
    const sidebar = document.querySelector(".sidebar");

    openSidebar.addEventListener("click", () => {
        sidebar.classList.toggle("show");
    });

    closeSidebar.addEventListener("click", () => {
        sidebar.classList.toggle("show");
    });

    overlay.addEventListener("click", () => {
        sidebar.classList.toggle("show");
    })
};

showSidebar();
showNotify();
handleSidebar();
