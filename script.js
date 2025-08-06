// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

///////////////////////////////
// 1. FRACTURE TEXT ANIMATION
///////////////////////////////

ScrollTrigger.create({
  trigger: "#heroTitle",
  start: "top 70%",
  once: true,
  onEnter: () => {
    // Top half rise
    gsap.fromTo(".fractured-word .top", {
      y: 0
    }, {
      y: -20,
      rotation: -4,
      opacity: 0.85,
      duration: 0.4,
      ease: "power1.inOut",
      yoyo: true,
      repeat: 1,
      stagger: 0.05
    });

    // Bottom half fall
    gsap.fromTo(".fractured-word .bottom", {
      y: 0
    }, {
      y: 20,
      rotation: 4,
      opacity: 0.85,
      duration: 0.4,
      ease: "power1.inOut",
      yoyo: true,
      repeat: 1,
      stagger: 0.05
    });

    // Fade in rest of title
    gsap.from("#restOfTitle", {
      opacity: 0,
      y: 30,
      delay: 0.4,
      duration: 1,
      ease: "power3.out"
    });

    // Fade in subtitle
    gsap.from("#heroSub", {
      opacity: 0,
      y: 20,
      delay: 0.6,
      duration: 1,
      ease: "power3.out"
    });
  }
});

//////////////////////////////////
// 2. CHART.JS - SCAD by Gender
//////////////////////////////////

let chartRendered = false;

ScrollTrigger.create({
  trigger: "#genderChart",
  start: "top 80%",
  once: true,
  onEnter: () => {
    if (chartRendered) return;

    const ctx = document.getElementById("genderChart").getContext("2d");

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Women (90%)", "Men (10%)"],
        datasets: [{
          data: [90, 10],
          backgroundColor: ["#dc3545", "#f8d7da"],
          borderWidth: 1
        }]
      },
      options: {
        cutout: "60%",
        plugins: {
          legend: {
            display: true,
            position: "bottom"
          }
        },
        animation: {
          duration: 1200,
          easing: "easeOutBounce"
        }
      }
    });

    chartRendered = true;
  }
});
