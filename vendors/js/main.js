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

        const openBtns = $$(".notify");
        const closeBtn = $("#notification .header .close");
        openBtns.forEach(openBtn => {
            openBtn.addEventListener("click", () => {
                vetra.classList.toggle("move");
                makeReverse(".show")

                notification.classList.add("show");

                vetra.params = {
                    main: notification,
                    open: openBtn,
                    close: closeBtn,
                    isMove: true,
                }
                vetra.addEventListener("click", singleOuterClick);

            });
        })
    };

    function showSidebar() {
        const sidebar = $(".sidebar");

        const openSidebar = $(".menu-sidebar");
        const closeSidebar = $(".close-sidebar");

        openSidebar.addEventListener("click", () => {
            toggleElement(sidebar, true);
            vetra.params = {
                main: sidebar,
                open: openSidebar,
                close: closeSidebar,
                isMove: false,
            }
            vetra.addEventListener("click", singleOuterClick);

        });
    };

    function showAccountAction() {
        const account = $(".account");
        account.addEventListener("click", () => {
            account.classList.toggle("show");
            states.account = !states.account
            if (states.account) {
                vetra.addEventListener('click', outerClick);
            } else {
                vetra.removeEventListener("click", outerClick);
            }
        });

        function outerClick(event) {
            if (!account.contains(event.target)) {
                account.classList.remove("show");
                vetra.removeEventListener("click", outerClick);
                states.account = false
            }
        }
    };

    function showCart() {
        const cartBtn = $("li.cart");
        const cartMobileBtn = $(".header-mobile li.cart");
        const cartBox = $(".cart-box");

        cartBtn.addEventListener("click", handleShowCart);

        cartMobileBtn.addEventListener("click", handleShowCart);

        function handleShowCart() {
            cartBox.classList.toggle("show");
            states.cart = !states.cart

            if (states.cart) {
                vetra.addEventListener('click', outerClick);
            } else {
                vetra.removeEventListener("click", outerClick);
            }
        }

        function outerClick(event) {
            if (!cartBox.contains(event.target) && !cartBtn.contains(event.target) && !cartMobileBtn.contains(event.target)) {
                cartBox.classList.remove("show");
                vetra.removeEventListener("click", outerClick);
                states.cart = false
            }
        }
    }

    function showSetting() {
        const setting = $("#setting");
        const sidebar = $(".sidebar");

        const openSetting = $(".account-action-item.setting");
        const closeSetting = $("#setting .close");

        openSetting.addEventListener("click", () => {
            // Close Sidebar and clear Sidebar's listener when open Setting
            sidebar.classList.remove("show");
            vetra.removeEventListener("click", singleOuterClick);
            console.log("Sidebar: remove listener");

            // Open Setting
            vetra.classList.toggle("move");
            setting.classList.add("show");
            console.log("Setting: Open setting");

            vetra.params = {
                main: setting,
                open: openSetting,
                close: closeSetting,
                isMove: true,
                attr: "show",
                text: "Setting"
            }

            vetra.addEventListener("click", singleOuterClick);
        });
    }

    function showMobileNavbar() {
        const btn = $("#mobile-action");
        const navbar = $(".main .header-mobile");

        btn.addEventListener("click", () => {
            toggleElement(navbar, true);
            vetra.addEventListener("click", outerClick);
        });

        function outerClick(event) {
            if ((!navbar.contains(event.target) && !btn.contains(event.target))) {
                toggleElement(navbar, false);
                vetra.removeEventListener("click", outerClick);
            }
        }
    }

    function showReportAction() {
        const buttons = $$(".report-action");

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                clearAllState("report-action", "active");
                button.classList.add("active");
                const actionBox = $(".report-action.active .report-action-wrapper");
                vetra.params = { actionBox, button }
                vetra.addEventListener("click", outerClick);
            })
        })

        function outerClick(event) {
            const data = vetra.params;
            if (!data.actionBox.contains(event.target) && !data.button.contains(event.target)) {
                data.button.classList.remove("active")
                vetra.removeEventListener("click", outerClick);
            }
        }
    }

    function toggleElement(element, isOpen) {
        if (isOpen) {
            element.classList.replace("reverse", "show");
        } else {
            element.classList.replace("show", "reverse");
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
            toggleElement(data.main, false);
            
            vetra.removeEventListener("click", singleOuterClick);
        }
    }

    function resizeWindow() {
        window.addEventListener("resize", () => {
            responsiveSidebar();
            responsiveNavbar();
        });

        function responsiveNavbar() {
            if (window.innerWidth > 640) {
                const navbar = $(".header-mobile.show");
                if (navbar) {
                    navbar.classList.replace("show", "reverse");
                }
            }
        }

        // Remove "show" state when transfer from mobile to desktop
        function responsiveSidebar() {
            if (window.innerWidth > 1199) {
                const sidebar = $(".sidebar.show")
                if (sidebar) {
                    sidebar.classList.replace("show", "reverse");
                }
            }
        }
    }

    function makeReverse(selector) {
        const elements = $$(selector);
        elements.forEach(element => {
            toggleElement(element, false)
        });
    }

    function clearAllState(current, state) {
        const elements = $$("." + current + "." + state);
        elements.forEach(element => {
            element.classList.remove(state);
        })
    }

    function limitBadgeNumber() {
        const badges = $$(".badge");

        badges.forEach(badge => {
            if (badge.textContent >= 100) {
                badge.textContent = "99+";
            }
        });
    }

    function run() {
        showSetting()
        showCart();
        showSidebar();
        showNotification();
        showAccountAction();
        showMobileNavbar();
        showReportAction();
        handleSidebar();
        countCartItem();
        tabNotificationAction();
        resizeWindow();
        limitBadgeNumber();
    }

    return run();


}

Vetra();

