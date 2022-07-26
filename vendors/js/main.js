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

    function clearSidebar(sidebars, activeSidebar, attribute = "active") {
        sidebars.forEach(sidebar => {
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

    click([openSidebar, closeSidebar, overlay], sidebar);
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

function click(clickElements, toggleElement, action = "show", type = "toggle") {
    clickElements.forEach(element => {
        element.addEventListener("click", () => {
            toggleElement.classList[type](action);
        });
    })
};

function countCartItem() {
    const badgeCart = document.querySelector("#cart-badge-count");
    const cartItem = document.querySelectorAll("#list-cart .card-product");

    badgeCart.textContent = cartItem.length;
}

showCart();
showSidebar();
showNotify();
showAccountAction();
handleSidebar();
countCartItem();
