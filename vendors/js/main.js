function showNotification() {
    const vetra = document.querySelector(".vetra");
    const showButton = document.querySelector(".header-action .notify");
    const closeButton = document.querySelector("#notification .header .close");

    showButton.addEventListener("click", toggleNotification);

    closeButton.addEventListener("click", toggleNotification);

    function toggleNotification() {
        vetra.classList.toggle("show-notification");
    }

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
    const overlay = document.querySelector(".overlay");
    const sidebar = document.querySelector(".sidebar");

    multiClick([openSidebar, closeSidebar, overlay], sidebar);
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

function multiClick(elements, target, action = "show", type = "toggle") {
    elements.forEach(element => {
        element.addEventListener("click", () => {
            target.classList[type](action);
        });
    })
};

function countCartItem() {
    const badgeCart = document.querySelector("#cart-badge-count");
    const cartItem = document.querySelectorAll("#list-cart .card-product");

    badgeCart.textContent = cartItem.length;
}

function showSetting() {
    const app = document.querySelector(".vetra");
    const showButton = document.querySelector(".account-action-item.setting");
    const closeButton = document.querySelector("#setting .header .close");

    showButton.addEventListener("click", toggleSetting)

    closeButton.addEventListener("click", toggleSetting);

    function toggleSetting() {
        app.classList.toggle("show-setting");
    }
}

showSetting()
showCart();
showSidebar();
showNotification();
showAccountAction();

handleSidebar();
countCartItem();
