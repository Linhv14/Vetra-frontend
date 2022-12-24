
function showNotification() {
    const vetra = document.querySelector(".vetra");
    const notification = document.querySelector("#notification");

    const showButton = document.querySelector(".header-action .notify");
    const closeButton = document.querySelector("#notification .header .close");

    showButton.addEventListener("click", () => {
        vetra.classList.toggle("move");
        notification.classList.toggle("show");

        vetra.addEventListener("mouseover", mouseoverEvent);
    });

    function mouseoverEvent() {
        const notificationAvtive = document.querySelector("#notification.show");
        if (notificationAvtive) {
            document.addEventListener("click", outerClick)
        }
    }

    function outerClick(event) {
        if (!notification.contains(event.target) || closeButton.contains(event.target)) {
            vetra.classList.remove("move");
            notification.classList.remove("show");
            console.log("remove notification-action listener");
            
            document.removeEventListener("click", outerClick);
            vetra.removeEventListener("mouseover", mouseoverEvent);
        }
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
    const sidebar = document.querySelector(".sidebar");

    openSidebar.addEventListener("click", () => {
        sidebar.classList.add("show");
        console.log("open sidebar");
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
            sidebar.removeEventListener("mouseover", mouseoverEvent);
            console.log("remove sidebar-action listener");
        }
    }

    closeSidebar.addEventListener("click", () => {
        sidebar.classList.remove("show");
        document.removeEventListener("click", outerClick);
        sidebar.removeEventListener("mouseover", mouseoverEvent);
        console.log("remove sidebar-action listener");
    });
};


function showAccountAction() {
    const account = document.querySelector(".account");

    account.addEventListener("click", () => {

        const accountAction = document.querySelector(".account.show");

        if (accountAction) {
            document.addEventListener('click', outerClick);
        }
        account.classList.toggle("show");
        console.log("open account-box");
    });

    function outerClick(event) {
        if (!account.contains(event.target)) {
            account.classList.remove("show");
            document.removeEventListener("click", outerClick);
            console.log("remove account-action listener");
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
            console.log("remove cart-action listener");
            document.removeEventListener("click", outerClick);
        }
    }
}

function showSetting() {
    const vetra = document.querySelector(".vetra");
    const setting = document.querySelector("#setting");

    const showButton = document.querySelector(".account-action-item.setting");
    const closeButton = document.querySelector("#setting .close");

    showButton.addEventListener("click", () => {
        // Close sidebar when open setting
        const sidebar = document.querySelector(".sidebar.show");

        if (sidebar) {
            sidebar.classList.remove("show");
        }

        vetra.classList.toggle("move");
        setting.classList.toggle("show");

        vetra.addEventListener("mouseover", mouseoverEvent);
    });

    function mouseoverEvent() {
        const settingActive = document.querySelector("#setting.show");

        if (settingActive) {
            document.addEventListener("click", outerClick);
        }
    }

    function outerClick(event) {
        if (!setting.contains(event.target) || closeButton.contains(event.target)) {
            vetra.classList.remove("move");
            setting.classList.remove("show");
            console.log("remove setting-action listener");

            document.removeEventListener("click", outerClick);
            vetra.removeEventListener("mouseover", mouseoverEvent);
        }
    }

}

function countCartItem() {
    const badgeCart = document.querySelector("#cart-badge-count");
    const cartItem = document.querySelectorAll("#list-cart .card-product");

    badgeCart.textContent = cartItem.length;
}

function tabNotificationAction() {
    const tabs = document.querySelectorAll("#notification .notify-control-item");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            clearActiveTab();
            tab.classList.toggle("active");
            clearActivePanel();
            activePanel(tab.dataset.target);

        });
    })

    function clearActiveTab() {
        const activeTab = document.querySelector("#notification .notify-control-item.active")
        activeTab.classList.remove("active");
    }

    function clearActivePanel() {
        const activePanel = document.querySelector(".tab-panel.active");
        activePanel.classList.remove("active")
    }

    function activePanel(panel) {
        const activePanel = document.querySelector("#" + panel)
        activePanel.classList.add("active")
    }
}


showSetting()
showCart();
showSidebar();
showNotification();
showAccountAction();
handleSidebar();
countCartItem();
tabNotificationAction()
