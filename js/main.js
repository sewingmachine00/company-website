// ===================================
// 모바일 네비게이션
// ===================================
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // 메뉴 링크 클릭 시 메뉴 닫기
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===================================
// 부드러운 스크롤
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // # 또는 빈 href는 무시
        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// 스크롤 애니메이션
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 애니메이션할 요소들
const animateElements = document.querySelectorAll('.service-card, .about-card, .timeline-item, .instructor-card, .vision-card, .stat-card');
animateElements.forEach(el => {
    el.classList.add('scroll-animate');
    observer.observe(el);
});

// ===================================
// 숫자 카운터 애니메이션
// ===================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const isPercentage = element.classList.contains('stat-content') && element.querySelector('.stat-label')?.textContent?.includes('%');
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// 숫자 애니메이션 트리거
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
        }
    });
}, { threshold: 0.5 });

const counters = document.querySelectorAll('.stat-number[data-target]');
counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ===================================
// Scroll to Top 버튼
// ===================================
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// 헤더 스크롤 효과
// ===================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// 문의 폼 처리
// ===================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // 유효성 검사
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showFormMessage('모든 필수 항목을 입력해주세요.', 'error');
            return;
        }
        
        // 이메일 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFormMessage('올바른 이메일 주소를 입력해주세요.', 'error');
            return;
        }
        
        // 제출 버튼 비활성화
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 전송 중...';
        
        // 시뮬레이션: 실제로는 서버로 데이터 전송
        setTimeout(() => {
            // 성공 메시지 표시
            showFormMessage('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.', 'success');
            
            // 폼 초기화
            contactForm.reset();
            
            // 버튼 복원
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            // 콘솔에 데이터 출력 (개발용)
            console.log('문의 내용:', formData);
        }, 1500);
    });
}

function showFormMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        // 5초 후 메시지 숨기기
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// ===================================
// 패럴랙스 효과 (히어로 섹션)
// ===================================
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ===================================
// 로딩 애니메이션
// ===================================
window.addEventListener('load', () => {
    // 페이지 로드 완료 후 애니메이션 시작
    document.body.classList.add('loaded');
    
    // 히어로 섹션 애니메이션
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in-up');
    }
});

// ===================================
// 키보드 네비게이션 접근성
// ===================================
document.addEventListener('keydown', (e) => {
    // ESC 키로 모바일 메뉴 닫기
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===================================
// 이미지 지연 로딩
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===================================
// 폼 입력 실시간 검증
// ===================================
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            emailInput.style.borderColor = 'var(--error)';
        } else {
            emailInput.style.borderColor = '';
        }
    });
}

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        // 숫자와 하이픈만 허용
        let value = e.target.value.replace(/[^\d-]/g, '');
        e.target.value = value;
    });
}

// ===================================
// 현재 페이지 하이라이트
// ===================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinksForHighlight = document.querySelectorAll('.nav-link');

navLinksForHighlight.forEach(link => {
    const linkPage = link.getAttribute('href').split('#')[0];
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    }
});

// ===================================
// 다크모드 감지 (선택사항)
// ===================================
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // 다크모드 선호 사용자를 위한 처리 (필요시 구현)
    console.log('다크모드가 감지되었습니다.');
}

// ===================================
// 성능 최적화: 스크롤 이벤트 디바운스
// ===================================
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 스크롤 이벤트에 디바운스 적용
const debouncedScroll = debounce(() => {
    // 스크롤 관련 처리
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===================================
// 콘솔 메시지
// ===================================
console.log('%c넥스트브릿지 공식 홈페이지', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%c교육과 기술을 잇는 미래의 다리', 'font-size: 14px; color: #4b5563;');
console.log('%c© 2025 주식회사 넥스트브릿지. All rights reserved.', 'font-size: 12px; color: #9ca3af;');