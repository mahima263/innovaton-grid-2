
    (function() {
      "use strict";

      /**
       * Apply .scrolled class to the body as the page is scrolled down
       */
      function toggleScrolled() {
        const selectBody = document.querySelector('body');
        const selectHeader = document.querySelector('#header');
        if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
        window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
      }

      document.addEventListener('scroll', toggleScrolled);
      window.addEventListener('load', toggleScrolled);

      /**
       * Scroll top button
       */
      let scrollTop = document.querySelector('.scroll-top');

      function toggleScrollTop() {
        if (scrollTop) {
          window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
        }
      }
      
      if (scrollTop) {
        scrollTop.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });

        window.addEventListener('load', toggleScrollTop);
        document.addEventListener('scroll', toggleScrollTop);
      }

      /**
       * Animation on scroll function and init
       */
      function aosInit() {
        AOS.init({
          duration: 600,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
      }
      window.addEventListener('load', aosInit);

      /**
       * Initiate glightbox
       */
      const glightbox = GLightbox({
        selector: '.glightbox'
      });

      /**
       * Init swiper sliders
       */
      function initSwiper() {
        document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
          let config = JSON.parse(
            swiperElement.querySelector(".swiper-config").innerHTML.trim()
          );

          if (swiperElement.classList.contains("swiper-tab")) {
            initSwiperWithCustomPagination(swiperElement, config);
          } else {
            new Swiper(swiperElement, config);
          }
        });
      }

      window.addEventListener("load", initSwiper);

      /**
       * Initiate Pure Counter
       */
      new PureCounter();

      /**
       * Correct scrolling position upon page load for URLs containing hash links.
       */
      window.addEventListener('load', function(e) {
        if (window.location.hash) {
          if (document.querySelector(window.location.hash)) {
            setTimeout(() => {
              let section = document.querySelector(window.location.hash);
              let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
              window.scrollTo({
                top: section.offsetTop - parseInt(scrollMarginTop),
                behavior: 'smooth'
              });
            }, 100);
          }
        }
      });

      /**
       * Navmenu Scrollspy
       */
      let navmenulinks = document.querySelectorAll('.navmenu a');

      function navmenuScrollspy() {
        navmenulinks.forEach(navmenulink => {
          if (!navmenulink.hash) return;
          let section = document.querySelector(navmenulink.hash);
          if (!section) return;
          let position = window.scrollY + 200;
          if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
            document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
            navmenulink.classList.add('active');
          } else {
            navmenulink.classList.remove('active');
          }
        })
      }
      window.addEventListener('load', navmenuScrollspy);
      document.addEventListener('scroll', navmenuScrollspy);

      /**
       * ===== NEW MOBILE NAVIGATION TOGGLE FUNCTIONALITY =====
       * Replaces the old mobile nav toggle with the new one
       */
      document.addEventListener("DOMContentLoaded", function() {
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const navMenu = document.querySelector('#navmenu');
        const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
        const navLinks = document.querySelectorAll('.navmenu a');

        // Function to close mobile menu
        function closeMobileMenu() {
          navMenu.classList.remove('active');
          mobileNavOverlay.classList.remove('active');
          const icon = mobileNavToggle.querySelector('i');
          icon.classList.remove('bi-x');
          icon.classList.add('bi-list');
        }

        // Toggle mobile menu when hamburger button is clicked
        if (mobileNavToggle && navMenu) {
          mobileNavToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            navMenu.classList.toggle('active');
            mobileNavOverlay.classList.toggle('active');
            
            // Toggle hamburger/close icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('bi-list')) {
              icon.classList.remove('bi-list');
              icon.classList.add('bi-x');
            } else {
              icon.classList.remove('bi-x');
              icon.classList.add('bi-list');
            }
          });

          // Close menu when clicking overlay
          mobileNavOverlay.addEventListener('click', function() {
            closeMobileMenu();
          });

          // Close menu when clicking nav links
          navLinks.forEach(link => {
            link.addEventListener('click', function() {
              closeMobileMenu();
            });
          });

          // Handle dropdowns on mobile
          const dropdowns = document.querySelectorAll('.navmenu .dropdown > a');
          dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function(e) {
              if (window.innerWidth <= 1199) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
              }
            });
          });

          // Close menu when clicking outside on mobile
          document.addEventListener('click', function(e) {
            if (window.innerWidth <= 1199) {
              if (!navMenu.contains(e.target) && 
                  !mobileNavToggle.contains(e.target) &&
                  !mobileNavOverlay.contains(e.target)) {
                closeMobileMenu();
              }
            }
          });
        }

        // Close menu on window resize (if resized to desktop)
        window.addEventListener('resize', function() {
          if (window.innerWidth > 1199) {
            closeMobileMenu();
          }
        });
      });

    })();
