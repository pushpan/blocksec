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
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    },
    
    showInitialContent: function() {
        setTimeout(() => {
            document.querySelectorAll('.hero .fade-in').forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, index * 150);
            });
        }, 300);
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
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

// ===== 手机应用交互模块 =====
const PhoneApp = {
    init: function() {
        this.cycleSecurityDemo();
    },
    
    cycleSecurityDemo: function() {
        const demoData = [
            {
                score: 96,
                level: '高安全',
                levelColor: '#4ADE80',
                address: '0x742a4c9f...5d6e7f8a',
                tags: ['取引所', '認証済み', 'Safe']
            },
            {
                score: 23,
                level: '危険',
                levelColor: '#EF4444',
                address: '0x1234567...12345678',
                tags: ['詐欺疑い', 'BlackList', '未検証']
            },
            {
                score: 67,
                level: '中程度',
                levelColor: '#F59E0B',
                address: '0xabcdef12...abcdef12',
                tags: ['新規アドレス', '要注意', 'DeFi']
            }
        ];
        
        let currentIndex = 0;
        
        setInterval(() => {
            const data = demoData[currentIndex];
            this.updateSecurityResult(data);
            currentIndex = (currentIndex + 1) % demoData.length;
        }, 4000);
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
            levelElement.style.color = data.levelColor === '#F59E0B' ? '#000000' : '#000000';
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
    ScrollAnimations.init();
    Navigation.init();
    PhoneApp.init();
});