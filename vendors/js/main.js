function Vetra() {

    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const vetra = $(".vetra");

    var states = {
        cart: false,
        sidebar: false,
        notification: false,
        account: false,
        setting: false
    }

    function showNotification() {
        const notification = $("#notification");

        const openBtn = $(".header-action .notify");
        const closeBtn = $("#notification .header .close");

        openBtn.addEventListener("click", () => {
            vetra.classList.toggle("move");
            notification.classList.toggle("show");
            console.log("Notification: Open notification");

            vetra.params = {
                main: notification,
                open: openBtn,
                close: closeBtn,
                isMove: true,
                attr: "show",
                text: "Notification"
            }
            vetra.addEventListener("click", singleOuterClick);
            
        });
    };

    function showSidebar() {
        const sidebar = $(".sidebar");

        const openSidebar = $(".menu-sidebar");
        const closeSidebar = $(".close-sidebar");
        const openSetting = $(".account-action-item.setting");

        openSidebar.addEventListener("click", () => {
            sidebar.classList.toggle("show");
            console.log("Sidebar: Open sidebar");

            vetra.params = {
                main: sidebar,
                open: openSidebar,
                close: closeSidebar,
                isMove: false,
                attr: "show",
                text: "Sidebar"
            }
            vetra.addEventListener("click", singleOuterClick);

        });

        // Close Sidebar and clear Sidebar's listener when open Setting
        openSetting.addEventListener("click", () => {
            sidebar.classList.remove("show");
            vetra.removeEventListener("click", singleOuterClick);
            console.log("Sidebar: remove listener");
        })
    };

    function showAccountAction() {
        const account = $(".account");
        account.addEventListener("click", () => {
            account.classList.toggle("show");
            states.account = !states.account
            if (states.account) {
                console.log("Account: Open account-box");
                vetra.addEventListener('click', outerClick);
            } else {
                vetra.removeEventListener("click", outerClick);
                console.log("Account: Remove listener");
            }
        });

        function outerClick(event) {
            if (!account.contains(event.target)) {
                account.classList.remove("show");
                vetra.removeEventListener("click", outerClick);
                states.account = false
                console.log("Account: Remove listener");
            }
        }
    };

    function showCart() {
        const cartBtn = $("li.cart");
        const cartBox = $(".cart-box");
        cartBtn.addEventListener("click", () => {
            cartBtn.classList.toggle("show");
            states.cart = !states.cart

            if (states.cart) {
                console.log("Cart: Open cart-box");
                document.addEventListener('click', outerClick);
            } else {
                document.removeEventListener("click", outerClick);
                console.log("Cart: remove listener");
            }
        });

        function outerClick(event) {
            if (!cartBox.contains(event.target) && !cartBtn.contains(event.target)) {
                cartBtn.classList.remove("show");
                document.removeEventListener("click", outerClick);
                states.cart = false
                console.log("Cart: remove listener");
            }
        }
    }

    function showSetting() {
        const setting = $("#setting");

        const openBtn = $(".account-action-item.setting");
        const closeBtn = $("#setting .close");

        openBtn.addEventListener("click", () => {
            vetra.classList.toggle("move");
            setting.classList.toggle("show");
            console.log("Setting: Open setting");

            document.addEventListener("click", outerClick);
        });

        function outerClick(event) {
            if ((!setting.contains(event.target) || closeBtn.contains(event.target)) && !openBtn.contains(event.target)) {
                vetra.classList.remove("move");
                setting.classList.remove("show");
                document.removeEventListener("click", outerClick);
                console.log("Setting: Remove listener");
            }
        }

    }

    function handleSidebar() {
        const sidebars = $$(".sidebar-item:not(.parent)");
        const sidebarChilds = $$(".sidebar-dropdown-item");
        const sidebarDropdowns = $$(".sidebar-item.parent");

        sidebars.forEach(sidebar => {
            sidebar.addEventListener("click", () => {

                let currentActive = $(".sidebar-list .active");
                if (currentActive != sidebar) {
                    currentActive.classList.remove("active");
                }

                let currentDropdown = $(".sidebar-item.parent.show");
                if (currentDropdown) {
                    currentDropdown.classList.remove("show");
                }

                sidebar.classList.add("active");
            });
        });

        sidebarChilds.forEach(sidebarChild => {
            sidebarChild.addEventListener("click", (e) => {
                e.stopPropagation();

                let currentActive = $(".sidebar-list .active");
                if (currentActive != sidebarChild) {
                    currentActive.classList.remove("active");
                }

                sidebarChild.classList.add("active");
            });
        });

        sidebarDropdowns.forEach(sidebarDropdown => {
            sidebarDropdown.addEventListener("click", () => {

                let currentDropdown = $(".sidebar-item.parent.show");
                if (currentDropdown && currentDropdown != sidebarDropdown) {
                    currentDropdown.classList.remove("show");
                }

                sidebarDropdown.classList.toggle("show");
            });
        });
    };

    function countCartItem() {
        const badgeCart = $("#cart-badge-count");
        const cartItem = $$("#list-cart .card-product");

        badgeCart.textContent = cartItem.length;
    }

    function tabNotificationAction() {
        const tabs = $$("#notification .notify-control-item");
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                clearActiveTab();
                tab.classList.toggle("active");
                clearActivePanel();
                activePanel(tab.dataset.target);

            });
        })

        function clearActiveTab() {
            const activeTab = $("#notification .notify-control-item.active")
            activeTab.classList.remove("active");
        }

        function clearActivePanel() {
            const activePanel = $(".tab-panel.active");
            activePanel.classList.remove("active")
        }

        function activePanel(panel) {
            const activePanel = $("#" + panel)
            activePanel.classList.add("active")
        }
    }

    function singleOuterClick(e) {
        const data = e.currentTarget.params;

        if ((!data.main.contains(e.target) || data.close.contains(e.target)) && !data.open.contains(e.target)) {
            if (data.isMove) vetra.classList.remove("move");
            data.main.classList.remove(data.attr);

            vetra.removeEventListener("click", singleOuterClick);
            console.log(`${data.text}: Remove listener`);
        }

    }

    function test() {
        
    }

    function launch() {
        showSetting()
        showCart();
        showSidebar();
        showNotification();
        showAccountAction();
        handleSidebar();
        countCartItem();
        tabNotificationAction();
        test();
    }

    return launch();

}

Vetra();