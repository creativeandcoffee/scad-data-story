document.addEventListener("DOMContentLoaded", () => {
  // GSAP fade in hero text and subtitle
  gsap.from("header h1", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out"
  });

  gsap.from("header p", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.5,
    ease: "power2.out"
  });

  // Chart.js pie chart on #genderChart
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
