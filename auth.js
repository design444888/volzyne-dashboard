document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Password Show/Hide Toggle
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            const icon = btn.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.setAttribute('data-lucide', 'eye-off');
            } else {
                input.type = 'password';
                icon.setAttribute('data-lucide', 'eye');
            }
            lucide.createIcons();
        });
    });

    // Plan Selection (Signup Page)
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('click', () => {
            planCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        });
    });

    // Form Validation & Submit Loading State
    const authForms = document.querySelectorAll('.auth-form');
    authForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const inputs = form.querySelectorAll('.form-input[required]');
            
            // Basic validation
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    // Add error message if not present
                    let errorMsg = input.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-msg')) {
                        errorMsg = document.createElement('span');
                        errorMsg.classList.add('error-msg');
                        errorMsg.textContent = 'This field is required';
                        input.parentNode.insertBefore(errorMsg, input.nextSibling);
                    }
                } else {
                    input.classList.remove('error');
                    const errorMsg = input.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-msg')) {
                        errorMsg.remove();
                    }
                }
            });

            // Special check for signup password match
            const pwd = form.querySelector('input[name="password"]');
            const confirmPwd = form.querySelector('input[name="confirm_password"]');
            if (pwd && confirmPwd) {
                if (pwd.value !== confirmPwd.value) {
                    isValid = false;
                    confirmPwd.classList.add('error');
                    let errorMsg = confirmPwd.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-msg')) {
                        errorMsg = document.createElement('span');
                        errorMsg.classList.add('error-msg');
                        errorMsg.textContent = 'Passwords do not match';
                        confirmPwd.parentNode.insertBefore(errorMsg, confirmPwd.nextSibling);
                    }
                }
            }

            if (isValid) {
                // Simulate loading state
                const submitBtn = form.querySelector('.btn-primary');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Processing...';
                submitBtn.disabled = true;
                lucide.createIcons();

                // Mock API call then redirect
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    window.location.href = 'dashboard.html';
                }, 1500);
            }
        });
        
        // Remove error state on input
        form.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('error');
                const errorMsg = input.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-msg')) {
                    errorMsg.remove();
                }
            });
        });
    });
});
