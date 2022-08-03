function showNotification() {
    const vetra = document.querySelector(".vetra");
    const notification = document.querySelector("#notification");

    const showButton = document.querySelector(".header-action .notify");
    const closeButton = document.querySelector("#notification .header .close");

    showButton.addEventListener("click", () => {
        vetra.classList.toggle("move");
        notification.classList.toggle("show");

        vetra.addEventListener("mouseover", mouseoverEvent)
    });

    function mouseoverEvent() {
        const notificationAvtive = document.querySelector("#notification.show");
        if (notificationAvtive) {
            document.addEventListener("click", outerClick)
        }
    }

    function outerClick(event) {
        if (!notification.contains(event.target)) {
            vetra.classList.remove("move");
            notification.classList.remove("show");
            
            document.removeEventListener("click", outerClick);
            vetra.removeEventListener("mouseover", mouseoverEvent);
        }
    }

    closeButton.addEventListener("click", () => {
        vetra.classList.toggle("move");
        notification.classList.toggle("show");
    });

};

function handleSidebar() {
    const sidebars = document.querySelectorAll(".sidebar-item:not(.parent)");
    const sidebarChilds = document.querySelectorAll(".sidebar-dropdown-item");
    const sidebarDropdowns = document.querySelectorAll(".sidebar-item.parent");

    sidebars.forEach(sidebar => {
        sidebar.addEventListener("click", () => {

            let currentActive = document.querySelector(".sidebar-list .active");
            if (currentActive != sidebar) {
                currentActive.classList.remove("active");
            }

            let currentDropdown = document.querySelector(".sidebar-item.parent.show");
            if (currentDropdown) {
                currentDropdown.classList.remove("show");
            }

            sidebar.classList.add("active");
        });
    });

    sidebarChilds.forEach(sidebarChild => {
        sidebarChild.addEventListener("click", (e) => {
            e.stopPropagation();

            let currentActive = document.querySelector(".sidebar-list .active");
            if (currentActive != sidebarChild) {
                currentActive.classList.remove("active");
            }

            sidebarChild.classList.add("active");
        });
    });

    sidebarDropdowns.forEach(sidebarDropdown => {
        sidebarDropdown.addEventListener("click", () => {

            let currentDropdown = document.querySelector(".sidebar-item.parent.show");
            if (currentDropdown && currentDropdown != sidebarDropdown) {
                currentDropdown.classList.remove("show");
            }

            sidebarDropdown.classList.toggle("show");
        });
    });
};

function showSidebar() {
    const openSidebar = document.querySelector(".menu-sidebar");
    const closeSidebar = document.querySelector(".close-sidebar");
    const sidebar = document.querySelector(".sidebar");

    openSidebar.addEventListener("click", () => {
        sidebar.classList.toggle("show");

        sidebar.addEventListener("mouseover", mouseoverEvent)
    });

    function mouseoverEvent() {
        const sidebarActive = document.querySelector(".sidebar.show");
        if (sidebarActive) {
            document.addEventListener("click", outerClick);
        }
    }

    function outerClick(event) {
        if (!sidebar.contains(event.target)) {
            sidebar.classList.remove("show");

            document.removeEventListener("click", outerClick);
            sidebar.addEventListener("mouseover", mouseoverEvent);
        }
    }

    closeSidebar.addEventListener("click", () => {
        sidebar.classList.toggle("show");
    });
};

function showAccountAction() {
    const account = document.querySelector(".account");

    account.addEventListener("click", () => {
        account.classList.toggle("show");

        const accountAction = document.querySelector(".account.show");

        if (accountAction) {
            document.addEventListener('click', outerClick);
        }
    });

    function outerClick(event) {
        if (!account.contains(event.target)) {
            account.classList.remove("show");
            document.removeEventListener("click", outerClick);
        }
    }

};

function showCart() {
    const cartBtn = document.querySelector("li.cart");

    cartBtn.addEventListener("click", () => {
        cartBtn.classList.toggle("show");

        const cartActive = document.querySelector("li.cart.show");

        if (cartActive) {
            document.addEventListener('click', outerClick);
        }
    });

    function outerClick(event) {
        if (!cartBtn.contains(event.target)) {
            cartBtn.classList.remove("show");
            document.removeEventListener("click", outerClick);
        }
    }

}

function showSetting() {
    const vetra = document.querySelector(".vetra");
    const setting = document.querySelector("#setting");

    const showButton = document.querySelector(".account-action-item.setting");
    const closeButton = document.querySelector("#setting .header .close");

    showButton.addEventListener("click", () => {
        // Close sidebar when open setting
        const sidebar = document.querySelector(".sidebar.show");

        if (sidebar) {
            sidebar.classList.remove("show");
        }

        vetra.classList.toggle("move");
        setting.classList.toggle("show");

        vetra.addEventListener("mouseover", mouseoverEvent)
    });

    function mouseoverEvent() {
        const settingActive = document.querySelector("#setting.show");

        if (settingActive) {
            document.addEventListener("click", outerClick)
        }
    }

    function outerClick(event) {
        if (!setting.contains(event.target)) {
            vetra.classList.remove("move");
            setting.classList.remove("show");

            document.removeEventListener("click", outerClick);
            vetra.removeEventListener("mouseover", mouseoverEvent);
        }
    }

    closeButton.addEventListener("click", () => {
        vetra.classList.toggle("move");
        setting.classList.toggle("show");
    });

}

function countCartItem() {
    const badgeCart = document.querySelector("#cart-badge-count");
    const cartItem = document.querySelectorAll("#list-cart .card-product");

    badgeCart.textContent = cartItem.length;
}


showSetting()
showCart();
showSidebar();
showNotification();
showAccountAction();

handleSidebar();
countCartItem();
