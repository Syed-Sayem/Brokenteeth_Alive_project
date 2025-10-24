// --------- Check if mobile ---------
const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// --------- LocomotiveScroll ---------
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
  smartphone: {
    smooth: true,
  },
  tablet: {
    smooth: true,
  },
});

// --------- GSAP Hero Animations ---------
function firstpageAnim() {
  var t1 = gsap.timeline();
  t1.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: "expo.inOut",
  })
    .to(".boundingelem", {
      y: 0,
      ease: "expo.inOut",
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from(
      "#herofooter",
      {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: "expo.inOut",
      },
      "-=1"
    );
}

firstpageAnim();

// --------- Mini circle follower (Desktop only) ---------
if (!isMobile) {
  const mini = document.querySelector("#minicircle");
  let timeout;

  function circleMouseFollower(xscale = 1, yscale = 1) {
    window.addEventListener("mousemove", (dets) => {
      mini.style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    });
  }

  function circleShape() {
    let xscale = 1,
      yscale = 1;
    let xprev = 0,
      yprev = 0;

    window.addEventListener("mousemove", (dets) => {
      clearTimeout(timeout);
      xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
      yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);
      xprev = dets.clientX;
      yprev = dets.clientY;
      circleMouseFollower(xscale, yscale);
      timeout = setTimeout(() => {
        mini.style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1, 1)`;
      }, 100);
    });
  }

  circleShape();
  circleMouseFollower();
}

// --------- .elem hover animations ---------
document.querySelectorAll(".elem").forEach((elem) => {
  let rotate = 0;
  let diffrot = 0;
  const img = elem.querySelector("img");

  // Desktop hover
  if (!isMobile) {
    elem.addEventListener("mousemove", (dets) => {
      const diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;

      gsap.to(img, {
        opacity: 1,
        ease: "power3.out",
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
    });

    elem.addEventListener("mouseleave", () => {
      gsap.to(img, {
        opacity: 0,
        ease: "power3.out",
        duration: 0.5,
      });
    });
  } else {
    // Mobile fallback: show image normally
    img.style.opacity = 1;
    img.style.position = "relative";
    img.style.top = "auto";
    img.style.left = "auto";
    img.style.transform = "none";
  }
});
