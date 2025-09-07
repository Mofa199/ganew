// Universal Loading Screen and Header/Footer Management
class PageManager {
    constructor() {
        this.initializeLoader();
        this.loadHeaderAndFooter();
        this.setupMobileMenu();
    }

    // Initialize loading screen
    initializeLoader() {
        // Create loading screen HTML
        const loaderHTML = `
            <div id="universal-loader">
                <div class="loader-content">
                    <!-- Two Logos with Revolving Circles -->
                    <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 2rem;">
                        <div class="logo-container">
                            <img src="images/wite bg.png" alt="TAMSA Logo" style="height: 6rem; width: 6rem; border-radius: 50%; border: 4px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                            <div class="logo-circle"></div>
                        </div>
                        <div class="logo-container">
                            <img src="images/Picture1.png" alt="GA Logo" style="height: 6rem; width: 6rem; border-radius: 50%; border: 4px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3); background: white; padding: 0.5rem;">
                            <div class="logo-circle" style="animation-direction: reverse;"></div>
                        </div>
                    </div>
                    
                    <!-- Event Title -->
                    <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 0.5rem; text-align: center; color: #ffffff;">15th GA and 17th ISC</h1>
                    <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 2rem; text-align: center; color: #f3ab1b;">Tanzania Medical Students' Association</h2>
                    
                    <!-- Loading Bar -->
                    <div class="loading-bar-container">
                        <div class="loading-bar"></div>
                    </div>
                    <p class="loading-percentage" id="loading-percentage" style="color: #ffffff;">80%</p>
                    <p class="loading-text" style="color: #ffffff;">Loading ...</p>
                </div>
            </div>
        `;

        // Insert loader at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', loaderHTML);

        // Animate percentage
        this.animatePercentage();

        // Hide loader after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loader = document.getElementById('universal-loader');
                if (loader) {
                    loader.classList.add('fade-out');
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 800);
                }
            }, 3000); // Show for 3 seconds minimum
        });
    }

    // Animate percentage counter
    animatePercentage() {
        const percentageEl = document.getElementById('loading-percentage');
        if (!percentageEl) return;
        
        let currentPercentage = 80; // Start at 80%
        percentageEl.textContent = currentPercentage + '%';
        
        const interval = setInterval(() => {
            currentPercentage += Math.random() * 2; // Slower increment
            if (currentPercentage >= 100) {
                currentPercentage = 100;
                clearInterval(interval);
            }
            percentageEl.textContent = Math.floor(currentPercentage) + '%';
        }, 150);
        
        // Ensure it reaches 100% after 2.5 seconds
        setTimeout(() => {
            clearInterval(interval);
            percentageEl.textContent = '100%';
        }, 2500);
    }

    // Load header and footer
    async loadHeaderAndFooter() {
        try {
            // Load header
            const headerResponse = await fetch('header.html');
            const headerHTML = await headerResponse.text();
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) {
                headerContainer.innerHTML = headerHTML;
            }

            // Load footer
            const footerResponse = await fetch('footer.html');
            const footerHTML = await footerResponse.text();
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                footerContainer.innerHTML = footerHTML;
            }

            // Setup mobile menu after header is loaded
            this.setupMobileMenu();

        } catch (error) {
            console.error('Error loading header/footer:', error);
        }
    }

    // Setup mobile menu functionality
<script>
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("mobile-overlay");

  if (toggle && menu && overlay) {
    // Toggle open
    toggle.addEventListener("click", () => {
      menu.classList.toggle("hidden");
      overlay.classList.toggle("hidden");
    });

    // Close when clicking overlay
    overlay.addEventListener("click", () => {
      menu.classList.add("hidden");
      overlay.classList.add("hidden");
    });

    // Close when clicking links
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.add("hidden");
        overlay.classList.add("hidden");
      });
    });
  }
});
</script>

            } else {
                // Fallback for pages with inline mobile menu (like schedule.html)
                // Also handle cases where the mobile menu might be loaded dynamically
                const checkForMobileMenu = () => {
                    const inlineToggle = document.getElementById('menu-toggle');
                    const inlineMenu = document.getElementById('mobile-menu');
                    
                    if (inlineToggle && inlineMenu) {
                        inlineToggle.addEventListener('click', function(e) {
                            e.preventDefault();
                            inlineMenu.classList.toggle('hidden');
                            inlineMenu.classList.toggle('opacity-0');
                            inlineMenu.classList.toggle('-translate-y-4');
                            
                            if (!inlineMenu.classList.contains('hidden')) {
                                setTimeout(() => {
                                    inlineMenu.classList.remove('opacity-0');
                                    inlineMenu.classList.remove('-translate-y-4');
                                }, 20);
                            }
                        });
                    }
                };
                
                // Check immediately and then again after a short delay to ensure DOM is ready
                checkForMobileMenu();
                setTimeout(checkForMobileMenu, 500);
            }
        }, 300); // Increased delay to ensure DOM is ready
    }
}

// Initialize page manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PageManager();
});

// Additional utility functions
function showLoader() {
    const loader = document.getElementById('universal-loader');
    if (loader) {
        loader.style.display = 'flex';
        loader.classList.remove('fade-out');
    }
}

function hideLoader() {
    const loader = document.getElementById('universal-loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }

}
