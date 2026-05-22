async function loadComponents() {

  // =========================
  // LOAD HEADER
  // =========================
  const headerRes = await fetch("header.html");

  document.getElementById("header-placeholder").innerHTML =
    await headerRes.text();

  // Active Navbar Link
  const currentPath =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".navbar-nav .nav-link")
    .forEach((link) => {

      if (link.getAttribute("href") === currentPath) {

        link.classList.add("active");

      }

    });

  // =========================
  // LOAD FOOTER
  // =========================
  const footerRes = await fetch("footer.html");

  document.getElementById("footer-placeholder").innerHTML =
    await footerRes.text();

  // =========================
  // PRELOADER
  // =========================
  const preloader = document.getElementById("preloader");

  setTimeout(() => {

    if (preloader) {

      preloader.classList.add("preloader-hidden");

      AOS.init({
        duration: 1200,
        once: true,
      });

    }

  }, 2000);

  // =========================
  // ALL SWIPERS
  // =========================
  const swipers = {};

  document.querySelectorAll(".swiper").forEach((slider) => {

    const swiperClass = slider.classList[1];

    // Specific configuration for Hero Slider
    if (swiperClass === 'heroSwiper') {
      swipers[swiperClass] = new Swiper(".heroSwiper", {
        effect: "fade",
        loop: true,
        speed: 2000,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        allowTouchMove: false, // Prevents users from dragging the background
      });
      return; // Skip the default multi-slide config below
    }

    swipers[swiperClass] = new Swiper(`.${swiperClass}`, {

      slidesPerView: 4,
      spaceBetween: 25,
      loop: true,
      speed: 800,

      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      breakpoints: {

        0: {
          slidesPerView: 1,
        },

        576: {
          slidesPerView: 2,
        },

        768: {
          slidesPerView: 3,
        },

        992: {
          slidesPerView: 4,
        },

      },

    });

  });

  // =========================
  // MOVIE CARD LOGIC
  // =========================
  document.querySelectorAll(".movie-card")
    .forEach((card) => {

      const mVideo = card.querySelector(".movie-video");

      const mPlayBtn = card.querySelector(".play-btn");

      const swiperContainer =
        card.closest(".swiper");

      let currentSwiper = null;

      // Find swiper instance
      if (swiperContainer) {

        const swiperClass =
          swiperContainer.classList[1];

        currentSwiper = swipers[swiperClass];

      }

      // =========================
      // HOVER PLAY
      // =========================
      card.addEventListener("mouseenter", () => {

        if (
          mVideo &&
          !mVideo.hasAttribute("data-playing")
        ) {

          mVideo.muted = true;

          mVideo.play();

          mVideo.style.opacity = "1";

          if (currentSwiper) {

            currentSwiper.autoplay.stop();

          }

        }

      });

      // =========================
      // MOUSE LEAVE
      // =========================
      card.addEventListener("mouseleave", () => {

        if (
          mVideo &&
          !mVideo.hasAttribute("data-playing")
        ) {

          mVideo.pause();

          mVideo.currentTime = 0;

          mVideo.style.opacity = "0";

          if (currentSwiper) {

            currentSwiper.autoplay.start();

          }

        }

      });

      // =========================
      // PLAY BUTTON
      // =========================
      if (mPlayBtn && mVideo) {

        mPlayBtn.addEventListener("click", (e) => {

          e.stopPropagation();

          // Current Playing Video
          const currentPlaying =
            document.querySelector(
              '.movie-video[data-playing="true"]'
            );

          // =========================
          // STOP PREVIOUS VIDEO
          // =========================
          if (
            currentPlaying &&
            currentPlaying !== mVideo
          ) {

            currentPlaying.pause();

            currentPlaying.currentTime = 0;

            currentPlaying.muted = true;

            currentPlaying.style.opacity = "0";

            currentPlaying.removeAttribute("data-playing");

            const prevBtn =
              currentPlaying
              .closest(".movie-card")
              .querySelector(".play-btn");

            if (prevBtn) {

              prevBtn.innerHTML =
                '<i class="bi bi-play-fill"></i>';

            }

          }

          // =========================
          // PLAY VIDEO
          // =========================
          if (
            !mVideo.hasAttribute("data-playing")
          ) {

            mVideo.play();

            mVideo.muted = false;

            mVideo.style.opacity = "1";

            mVideo.setAttribute(
              "data-playing",
              "true"
            );

            mPlayBtn.innerHTML =
              '<i class="bi bi-pause-fill"></i>';

            if (currentSwiper) {

              currentSwiper.autoplay.stop();

            }

          }

          // =========================
          // PAUSE VIDEO
          // =========================
          else {

            mVideo.pause();

            mVideo.currentTime = 0;

            mVideo.muted = true;

            mVideo.removeAttribute("data-playing");

            mVideo.style.opacity = "0";

            mPlayBtn.innerHTML =
              '<i class="bi bi-play-fill"></i>';

            if (currentSwiper) {

              currentSwiper.autoplay.start();

            }

          }

        });

      }

    });

}

loadComponents();