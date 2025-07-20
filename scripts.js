// ===== 粒子背景效果模块 =====
const ParticleSystem = {
    init: function() {
        this.createParticles();
        this.setupMouseEffect();
    },
    
    createParticles: function() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            particlesContainer.appendChild(particle);
        }
    },
    
    setupMouseEffect: function() {
        document.addEventListener('mousemove', (e) => {
            const particles = document.querySelectorAll('.particle');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            particles.forEach((particle, index) => {
                const speed = (index % 5 + 1) * 0.5;
                particle.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }
};

// ===== 滚动动画模块 =====
const ScrollAnimations = {
    init: function() {
        this.setupObserver();
        this.showInitialContent();
    },
    
    setupObserver: function() {
        const elements = document.querySelectorAll('.fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => {
            observer.observe(element);
        });
    },
    
    showInitialContent: function() {
        setTimeout(() => {
            document.querySelectorAll('.hero .fade-in').forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, index * 200);
            });
        }, 500);
    }
};

// ===== 导航功能模块 =====
const Navigation = {
    init: function() {
        this.setupSmoothScroll();
    },
    
    setupSmoothScroll: function() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
};

// ===== 手机应用交互模块 =====
const PhoneApp = {
    init: function() {
        this.setupQRScanner();
        this.cycleSecurityDemo();
    },
    
    setupQRScanner: function() {
        const qrFrame = document.querySelector('.qr-frame');
        if (qrFrame) {
            setTimeout(() => {
                qrFrame.classList.add('qr-scanning');
            }, 2000);
        }
    },
    
    cycleSecurityDemo: function() {
        const demoData = [
            {
                score: 96,
                level: '高安全',
                levelColor: '#4CAF50',
                address: '0x742a4c9f6a8d2f1e3b5c8d9e2f1a3b4c5d6e7f8a',
                tags: ['取引所', '認証済み', '高流動性', 'Safe']
            },
            {
                score: 23,
                level: '危険',
                levelColor: '#f44336',
                address: '0x1234567890abcdef1234567890abcdef12345678',
                tags: ['詐欺疑い', 'BlackList', '未検証']
            },
            {
                score: 67,
                level: '中程度',
                levelColor: '#FF9800',
                address: '0xabcdef1234567890abcdef1234567890abcdef12',
                tags: ['新規アドレス', '要注意', 'DeFi']
            }
        ];
        
        let currentIndex = 0;
        
        setInterval(() => {
            const data = demoData[currentIndex];
            this.updateSecurityResult(data);
            currentIndex = (currentIndex + 1) % demoData.length;
        }, 5000);
    },
    
    updateSecurityResult: function(data) {
        const scoreElement = document.querySelector('.security-score');
        const levelElement = document.querySelector('.security-level');
        const addressElement = document.querySelector('.address-info');
        const tagsContainer = document.querySelector('.security-tags');
        
        if (scoreElement) scoreElement.textContent = data.score;
        if (levelElement) {
            levelElement.textContent = data.level;
            levelElement.style.backgroundColor = data.levelColor;
        }
        if (addressElement) addressElement.textContent = data.address;
        if (tagsContainer) {
            tagsContainer.innerHTML = data.tags.map(tag => 
                `<span class="security-tag">${tag}</span>`
            ).join('');
        }
    }
};

// ===== 主初始化函数 =====
document.addEventListener('DOMContentLoaded', () => {
    ParticleSystem.init();
    ScrollAnimations.init();
    Navigation.init();
    PhoneApp.init();
});