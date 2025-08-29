document.addEventListener('DOMContentLoaded', () => {
    Chart.register(ChartDataLabels);
    gsap.registerPlugin(ScrollTrigger);

    // --- Hero Animation ---
    const heroTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "header",
            start: "top top",
            end: "top+=200", // Tighter scroll range
            scrub: true,
            pin: false
        }
    });

    heroTimeline
        .to("#hero-subtitle-reveal", { backgroundPosition: "0%", ease: "linear" })
        .to("#hero-stat-fade", { opacity: 1 }, "-=0.5")
        .to("#scroll-indicator-wrapper", { opacity: 1 }, "-=0.25");
    
    // --- Animate Sections on Scroll ---
    const sections = document.querySelectorAll('.data-section');
    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                section.classList.add('is-visible');
            }
        });
    });

    // --- Animate Bias Table on Scroll ---
    const biasRows = document.querySelectorAll('.bias-table-row');
    if (biasRows.length > 0) {
        gsap.from(biasRows, {
            opacity: 0,
            x: -50,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.bias-table-row',
                start: 'top 85%',
                once: true,
            }
        });
    }
    
    // --- Animated Number Counter ---
    const statElement = document.getElementById('gender-stat');
    if (statElement) {
        gsap.to(statElement, {
            textContent: statElement.dataset.value,
            duration: 2,
            ease: "power1.inOut",
            snap: { textContent: 1 },
            scrollTrigger: {
                trigger: statElement,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            onUpdate: function() {
                this.targets()[0].innerHTML = Math.ceil(this.targets()[0].textContent) + '%';
            }
        });
    }

    // --- Chart.js Global Options ---
    const chartTextColor = '#D1D5DB';
    const chartGridColor = 'rgba(255, 255, 255, 0.1)';
    const chartFont = { size: 12, family: "'Inter', sans-serif" };
    Chart.defaults.color = chartTextColor;
    Chart.defaults.font.family = "'Inter', sans-serif";

    // --- Gender Doughnut Chart ---
    const genderCtx = document.getElementById('gender-chart');
    if (genderCtx) {
        new Chart(genderCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Women', 'Men'],
                datasets: [{
                    data: [94.6, 5.4],
                    backgroundColor: ['#ef4444', '#4b5563'],
                    borderColor: '#111827',
                    borderWidth: 6,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '70%',
                plugins: {
                    legend: { 
                        position: 'bottom', 
                        labels: { font: {size: 14}, color: chartTextColor } 
                    },
                    datalabels: { display: false }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 1500
                }
            }
        });
    }

    // --- Risk Factor Chart ---
    const riskFactorCtx = document.getElementById('risk-factor-chart');
    if (riskFactorCtx) {
        new Chart(riskFactorCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Hypertension', 'Hyperlipidemia', 'Diabetes'],
                datasets: [
                    {
                        label: 'SCAD Patients',
                        data: [43.1, 36.6, 4.8],
                        backgroundColor: 'rgba(239, 68, 68, 0.7)', // Red
                        borderColor: '#ef4444',
                        borderWidth: 1
                    },
                    {
                        label: 'Typical MI Patients',
                        data: [74, 72, 35], // General citable data for comparison
                        backgroundColor: 'rgba(107, 114, 128, 0.7)', // Gray
                        borderColor: '#6b7280',
                        borderWidth: 1
                    }
                ]
            },
             options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    x: { grid: { display: false }, ticks: { font: chartFont } },
                    y: { grid: { color: chartGridColor }, ticks: { font: chartFont, callback: (value) => value + '%' } }
                },
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: { enabled: true },
                    datalabels: { display: false }
                }
            }
        });
    }

    // --- Associated Conditions Chart ---
    const associatedCtx = document.getElementById('associated-conditions-chart');
    if (associatedCtx) {
        new Chart(associatedCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['FMD (Fibromuscular Dysplasia)', 'Migraine', 'Inflammatory', 'Connective Tissue'],
                datasets: [{
                    label: 'Prevalence',
                    data: [44.2, 38.8, 5.6, 4.9],
                    backgroundColor: [
                        'rgba(192, 132, 252, 0.7)', // Purple
                        'rgba(139, 92, 246, 0.7)',  // Violet
                        'rgba(99, 102, 241, 0.7)',  // Indigo
                        'rgba(59, 130, 246, 0.7)'   // Blue
                    ],
                    borderColor: ['#c084fc', '#8b5cf6', '#6366f1', '#3b82f6'],
                    borderWidth: 1
                }]
            },
             options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { 
                        grid: { color: chartGridColor }, 
                        ticks: { display: false },
                    },
                    y: { 
                        grid: { display: false }, 
                        ticks: { font: chartFont } 
                    }
                },
                layout: {
                    padding: {
                        right: 80 // Add padding to the right for the labels
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                         formatter: (value, context) => value + '%',
                        color: chartTextColor,
                        font: { ...chartFont, size: 14, weight: 'bold' }
                    }
                }
            }
        });
    }
    
    // --- Artery Involvement Chart ---
    const arteryCtx = document.getElementById('artery-chart');
    if (arteryCtx) {
        new Chart(arteryCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['LAD', 'LCx', 'RCA', 'Multivessel'],
                datasets: [{
                    label: 'Affected Artery',
                    data: [52.1, 29.6, 26.2, 11.5],
                    backgroundColor: 'rgba(239, 68, 68, 0.6)',
                    borderColor: '#ef4444',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: { grid: { color: chartGridColor }, ticks: { font: chartFont, callback: (value) => value + '%' } },
                    x: { grid: { display: false }, ticks: { font: { ...chartFont, size: 14 } } }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true },
                    datalabels: { display: false }
                }
            }
        });
    }

    // --- SCAD Type Chart ---
    const scadTypeCtx = document.getElementById('scad-type-chart');
    if (scadTypeCtx) {
        new Chart(scadTypeCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Type 1', 'Type 2', 'Type 3', 'Type 4'],
                datasets: [
                    {
                        label: 'Conservative',
                        data: [12.7, 69.3, 11.8, 6.3],
                        backgroundColor: 'rgba(59, 130, 246, 0.7)', // Blue
                        borderColor: '#3b82f6',
                        borderWidth: 1
                    },
                    {
                        label: 'PCI',
                        data: [12.1, 54.9, 6.5, 26.5],
                        backgroundColor: 'rgba(239, 68, 68, 0.7)', // Red
                        borderColor: '#ef4444',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: { grid: { display: false }, ticks: { font: chartFont } },
                    x: { grid: { color: chartGridColor }, ticks: { font: chartFont, callback: (value) => value + '%' } }
                },
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }
    
     // --- Medication Chart ---
    const medicationCtx = document.getElementById('medication-chart');
    if(medicationCtx) {
        new Chart(medicationCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Aspirin', 'DAPT', 'Beta-Blocker', 'ACE Inhibitor', 'Statin'],
                datasets: [
                    {
                        label: 'Conservative',
                        data: [94.5, 74.5, 79.7, 67.0, 71.1],
                        backgroundColor: 'rgba(59, 130, 246, 0.7)', // Blue
                        borderColor: '#3b82f6',
                        borderWidth: 1
                    },
                    {
                        label: 'PCI',
                        data: [98.1, 91.0, 88.3, 73.8, 80.3],
                        backgroundColor: 'rgba(239, 68, 68, 0.7)', // Red
                        borderColor: '#ef4444',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: { grid: { display: false }, ticks: { font: chartFont } },
                    x: { grid: { color: chartGridColor }, ticks: { font: chartFont, callback: (value) => value + '%' } }
                },
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    // --- Recurrence Icon Array ---
    const recurrenceContainer = document.getElementById('recurrence-array');
    if (recurrenceContainer) {
        const personSVG = `<svg class="w-full h-full" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>`;
        for (let i = 0; i < 20; i++) {
            const iconWrapper = document.createElement('div');
            iconWrapper.className = `aspect-square ${i < 4 ? 'text-red-600' : 'text-gray-600'}`;
            iconWrapper.innerHTML = personSVG;
            recurrenceContainer.appendChild(iconWrapper);
        }
    }
    
    // --- MI Under 50 Icon Array ---
    const miUnder50Container = document.getElementById('mi-under-50-array');
    if (miUnder50Container) {
        for (let i = 0; i < 100; i++) {
            const icon = document.createElement('div');
            icon.className = `aspect-square rounded ${i < 35 ? 'bg-red-600' : 'bg-gray-600'}`;
            miUnder50Container.appendChild(icon);
        }
    }

    // --- AI Animation Script ---
    const aiPromiseItems = document.querySelectorAll('.ai-promise-item');
    const aiPerilItems = document.querySelectorAll('.ai-peril-item');
    if(aiPromiseItems.length > 0) {
        gsap.set([aiPromiseItems, aiPerilItems], { opacity: 0, y: 20 });
        ScrollTrigger.create({
            trigger: "#ai-scrolly-section",
            start: "top 70%",
            once: true,
            onEnter: () => {
                const tl = gsap.timeline();
                tl.to(aiPromiseItems, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.2,
                    ease: "power2.out"
                }).to(aiPerilItems, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.2,
                    ease: "power2.out"
                }, "-=0.3"); 
            }
        });
    }
});

