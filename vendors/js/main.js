function showNotify() {
    const showNotify = document.querySelector(".header-action .notify");
    const closeNotify = document.querySelector(".notification .header .close");
    const hideSidebar = document.querySelector(".sidebar");
    const container = document.querySelector(".container");
    const notification = document.querySelector(".notification");

    showNotify.addEventListener("click", () => {
        hideSidebar.classList.toggle("hidden");
        container.classList.toggle("show-notify");
        notification.classList.toggle("show");
    });

    closeNotify.addEventListener("click", () => {
        hideSidebar.classList.toggle("hidden");
        container.classList.toggle("show-notify");
        notification.classList.toggle("show");
    });
};

function activeSidebar() {
    const sidebars = document.querySelectorAll(".sidebar-item");

    function removeActiveSidebar(activeSidebar) {
        sidebars.forEach(sidebar => {
            if (sidebar != activeSidebar) {
                sidebar.classList.remove("active");
            };
        });
    };

    sidebars.forEach(sidebar => {
        sidebar.addEventListener("click", () => {
            removeActiveSidebar(sidebar);
            sidebar.classList.toggle("active");
        });
    });
};

showNotify();
activeSidebar();