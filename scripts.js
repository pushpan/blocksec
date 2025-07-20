// ===== 粒子背景效果模块 =====
const ParticleSystem = {
    init: function() {
        this.createParticles();
        this.setupMouseEffect();
    },
    
    createParticles: function() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 30; // 减少粒子数量，为区块链网络让路

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
                const speed = (index % 5 + 1) * 0.3; // 减少视差效果强度
                particle.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }
};

// ===== 区块链网络可视化模块 =====
const BlockchainNetwork = {
    nodes: [],
    connections: [],
    container: null,
    
    init: function() {
        this.container = document.getElementById('blockchain-network');
        this.createNetwork();
        this.animateNetwork();
        this.startDataFlow();
    },
    
    createNetwork: function() {
        // 创建网络节点
        const nodeCount = 15;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        for (let i = 0; i < nodeCount; i++) {
            const node = {
                id: i,
                x: Math.random() * windowWidth,
                y: Math.random() * windowHeight,
                size: Math.random() > 0.7 ? 'large' : (Math.random() > 0.4 ? 'medium' : 'small'),
                element: null
            };
            
            // 创建节点DOM元素
            const nodeElement = document.createElement('div');
            nodeElement.className = `network-node ${node.size}`;
            nodeElement.style.left = node.x + 'px';
            nodeElement.style.top = node.y + 'px';
            nodeElement.style.animationDelay = Math.random() * 3 + 's';
            
            node.element = nodeElement;
            this.container.appendChild(nodeElement);
            this.nodes.push(node);
        }
        
        // 创建连接线
        this.createConnections();
    },
    
    createConnections: function() {
        // 为每个节点创建1-3个连接
        this.nodes.forEach((node, index) => {
            const connectionCount = Math.floor(Math.random() * 3) + 1;
            
            for (let i = 0; i < connectionCount; i++) {
                // 找到最近的其他节点之一
                const targetIndex = this.findNearestNode(index, i);
                if (targetIndex !== -1 && targetIndex !== index) {
                    this.createConnection(node, this.nodes[targetIndex]);
                }
            }
        });
    },
    
    findNearestNode: function(currentIndex, offset = 0) {
        const currentNode = this.nodes[currentIndex];
        const distances = this.nodes.map((node, index) => {
            if (index === currentIndex) return { index, distance: Infinity };
            const dx = node.x - currentNode.x;
            const dy = node.y - currentNode.y;
            return { index, distance: Math.sqrt(dx * dx + dy * dy) };
        });
        
        distances.sort((a, b) => a.distance - b.distance);
        return distances[offset + 1] ? distances[offset + 1].index : -1;
    },
    
    createConnection: function(node1, node2) {
        const connection = document.createElement('div');
        connection.className = Math.random() > 0.7 ? 'network-connection active' : 'network-connection';
        
        // 计算连接线的位置和角度
        const dx = node2.x - node1.x;
        const dy = node2.y - node1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        connection.style.left = node1.x + 'px';
        connection.style.top = node1.y + 'px';
        connection.style.width = distance + 'px';
        connection.style.transform = `rotate(${angle}deg)`;
        connection.style.animationDelay = Math.random() * 4 + 's';
        
        this.container.appendChild(connection);
        this.connections.push({
            element: connection,
            node1: node1,
            node2: node2,
            distance: distance
        });
    },
    
    startDataFlow: function() {
        setInterval(() => {
            this.createDataPacket();
        }, 2000);
    },
    
    createDataPacket: function() {
        if (this.connections.length === 0) return;
        
        const connection = this.connections[Math.floor(Math.random() * this.connections.length)];
        const packet = document.createElement('div');
        packet.className = 'data-packet';
        
        packet.style.left = connection.node1.x + 'px';
        packet.style.top = connection.node1.y + 'px';
        
        this.container.appendChild(packet);
        
        // 动画移动数据包
        const dx = connection.node2.x - connection.node1.x;
        const dy = connection.node2.y - connection.node1.y;
        
        packet.animate([
            { transform: 'translate(0, 0)' },
            { transform: `translate(${dx}px, ${dy}px)` }
        ], {
            duration: 3000,
            easing: 'linear'
        }).onfinish = () => {
            packet.remove();
        };
    },
    
    animateNetwork: function() {
        // 让节点慢慢移动
        setInterval(() => {
            this.nodes.forEach(node => {
                const deltaX = (Math.random() - 0.5) * 2;
                const deltaY = (Math.random() - 0.5) * 2;
                
                node.x += deltaX;
                node.y += deltaY;
                
                // 保持在屏幕范围内
                node.x = Math.max(50, Math.min(window.innerWidth - 50, node.x));
                node.y = Math.max(50, Math.min(window.innerHeight - 50, node.y));
                
                if (node.element) {
                    node.element.style.left = node.x + 'px';
                    node.element.style.top = node.y + 'px';
                }
            });
            
            // 更新连接线位置
            this.updateConnections();
        }, 100);
    },
    
    updateConnections: function() {
        this.connections.forEach(conn => {
            const dx = conn.node2.x - conn.node1.x;
            const dy = conn.node2.y - conn.node1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            
            conn.element.style.left = conn.node1.x + 'px';
            conn.element.style.top = conn.node1.y + 'px';
            conn.element.style.width = distance + 'px';
            conn.element.style.transform = `rotate(${angle}deg)`;
        });
    }
};

// ===== HUD数据更新模块 =====
const AnalysisHUD = {
    init: function() {
        this.updateHUDData();
        setInterval(() => {
            this.updateHUDData();
        }, 3000);
    },
    
    updateHUDData: function() {
        const nodeCountElement = document.getElementById('node-count');
        const txCountElement = document.getElementById('tx-count');
        const riskLevelElement = document.getElementById('risk-level');
        
        if (nodeCountElement) {
            const currentCount = parseInt(nodeCountElement.textContent);
            const newCount = currentCount + Math.floor(Math.random() * 10 - 5);
            nodeCountElement.textContent = Math.max(100, newCount);
        }
        
        if (txCountElement) {
            const currentTx = parseInt(txCountElement.textContent.replace(',', ''));
            const newTx = currentTx + Math.floor(Math.random() * 100);
            txCountElement.textContent = newTx.toLocaleString();
        }
        
        if (riskLevelElement) {
            const riskLevels = [
                { text: 'LOW', class: 'hud-status' },
                { text: 'MEDIUM', class: 'hud-warning' },
                { text: 'HIGH', class: 'hud-warning' }
            ];
            const risk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
            riskLevelElement.textContent = risk.text;
            riskLevelElement.className = risk.class;
        }
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
    BlockchainNetwork.init();
    AnalysisHUD.init();
    ScrollAnimations.init();
    Navigation.init();
    PhoneApp.init();
});

// 窗口大小改变时重新初始化网络
window.addEventListener('resize', () => {
    const networkContainer = document.getElementById('blockchain-network');
    if (networkContainer) {
        networkContainer.innerHTML = '';
        BlockchainNetwork.nodes = [];
        BlockchainNetwork.connections = [];
        setTimeout(() => {
            BlockchainNetwork.createNetwork();
        }, 100);
    }
});