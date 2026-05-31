document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Simple Tab interaction (Conversations view)
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const row = tab.parentElement;
            row.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // 3. SPA View Switching Logic
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const appViews = document.querySelectorAll('.app-view');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Ignore if it's already active
            if (item.classList.contains('active')) return;

            // Remove active state from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active state to clicked item
            item.classList.add('active');

            // Hide all views
            appViews.forEach(view => {
                view.style.display = 'none';
                view.classList.remove('active');
            });

            // Show targeted view
            const targetId = item.getAttribute('data-target');
            const targetView = document.getElementById(targetId);
            if (targetView) {
                if (targetId === 'view-conversations') {
                    // Conversations uses flex layout natively via its class
                    targetView.style.display = 'flex';
                    // Reset to list view on mobile when switching to conversations
                    targetView.classList.remove('show-chat-mobile');
                } else {
                    targetView.style.display = 'block';
                }
                targetView.classList.add('active');
            }

            // Close sidebar on mobile after clicking
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
                sidebarOverlay.classList.remove('show');
            }
        });
    });

    // 4. Mobile Sidebar Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('app-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    if (mobileMenuBtn && sidebar && sidebarOverlay) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.add('open');
            sidebarOverlay.classList.add('show');
        });

        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('show');
        });
    }

    // 5. Mobile Conversations Logic (List -> Chat)
    const viewConversations = document.getElementById('view-conversations');
    const listItems = document.querySelectorAll('.col-list .empty-state'); // Using empty state as mock items for now
    const backToListBtn = document.getElementById('btn-back-to-list');

    // Make the entire empty state clickable for mock purposes
    listItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                viewConversations.classList.add('show-chat-mobile');
            }
        });
    });

    if (backToListBtn) {
        backToListBtn.addEventListener('click', () => {
            viewConversations.classList.remove('show-chat-mobile');
        });
    }
});
