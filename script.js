document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById('genderChart');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Women', 'Men'],
      datasets: [{
        label: 'SCAD by Gender',
        data: [90, 10],
        backgroundColor: ['#8B0000', '#D3D3D3'],
        borderColor: '#ffffff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 16,
              family: 'Inter'
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.parsed}%`;
            }
          }
        }
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // Animate the wrapper, not the canvas itself
  gsap.from("#genderChartWrapper", {
    scrollTrigger: {
      trigger: "#genderChartWrapper",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: "power2.out"
  });

  // Only draw the chart once it's visible
  ScrollTrigger.create({
    trigger: "#genderChartWrapper",
    start: "top 80%",
    once: true,
    onEnter: () => initGenderChart()
  });
});

function initGenderChart() {
  const ctx = document.getElementById('genderChart');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Women', 'Men'],
      datasets: [{
        data: [90, 10],
        backgroundColor: ['#8B0000', '#D3D3D3'],
        borderWidth: 2
      }]
    },
    options: {
      animation: {
        animateScale: true,
        duration: 1000
      },
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.parsed}%`;
            }
          }
        }
      }
    }
  });
}

gsap.registerPlugin(ScrollTrigger);

// Animate words on scroll
gsap.to(".fracture-word", {
  scrollTrigger: {
    trigger: "#heroTitle",
    start: "top 70%",
    toggleActions: "play none none none"
  },
  opacity: 1,
  y: 0,
  scale: 1,
  duration: 0.8,
  ease: "power3.out",
  stagger: {
    each: 0.06,
    from: "start"
  }
});

ScrollTrigger.create({
  trigger: "#heroTitle",
  start: "top 70%",
  once: true,
  onEnter: () => {
    gsap.to(".fracture-word", {
      x: (i) => (Math.random() - 0.5) * 4,
      y: (i) => (Math.random() - 0.5) * 2,
      duration: 0.08,
      repeat: 3,
      yoyo: true,
      ease: "rough({strength:1})",
      delay: 1.2
    });
  }
});

ScrollTrigger.create({
  trigger: "#heroTitle",
  start: "top 70%",
  once: true,
  onEnter: () => {
    setTimeout(() => {
      gsap.to(".fracture-word", {
        x: (i) => (Math.random() - 0.5) * 8,  // horizontal shift
        y: (i) => (Math.random() - 0.5) * 4,  // vertical shift
        skewX: (i) => (Math.random() - 0.5) * 4, // slight skew
        duration: 0.05,
        repeat: 4,
        yoyo: true,
        ease: "power1.inOut"
      });
    }, 1000); // delay 1s after the text reveals
  }
});
