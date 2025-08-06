document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // SplitText animation for shattered headline
  const split = new SplitText("#fractureWords", {
    type: "words",
    wordsClass: "split-word"
  });

  ScrollTrigger.create({
    trigger: "#heroTitle",
    start: "top 80%",
    once: true,
    onEnter: () => {
      gsap.from(split.words, {
        y: (i) => (i % 2 === 0 ? -30 : 30),
        x: (i) => (i % 3 === 0 ? -15 : 15),
        rotation: () => gsap.utils.random(-10, 10),
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.05
      });

      gsap.from("#restOfTitle", {
        opacity: 0,
        y: 30,
        delay: 0.6,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from("#heroSub", {
        opacity: 0,
        y: 20,
        delay: 0.8,
        duration: 1,
        ease: "power3.out"
      });
    }
  });

  // Chart.js pie chart initialization
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
        duration: 1000,
        easing: "easeOutBounce"
      }
    }
  });
});
