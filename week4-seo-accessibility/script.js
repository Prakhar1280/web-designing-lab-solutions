document.addEventListener('DOMContentLoaded', () => {
    const scanBtn = document.getElementById('scanBtn');
    const scoreNumber = document.getElementById('scoreNumber');
    const outerRing = document.querySelector('.outer-ring');

    scanBtn.addEventListener('click', () => {
        // Start Clean Master Scanning Animation
        scanBtn.disabled = true;
        scanBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> SCANNING SEO METRICS...';
        outerRing.classList.add('scanning');

        let currentScore = 0;
        const targetScore = 98;
        
        const countInterval = setInterval(() => {
            currentScore += 2;
            scoreNumber.textContent = currentScore;
            
            if (currentScore >= targetScore) {
                clearInterval(countInterval);
                outerRing.classList.remove('scanning');
                scanBtn.disabled = false;
                scanBtn.innerHTML = '<i class="fa-solid fa-check"></i> SEO OPTIMIZED (98%)';
                
                setTimeout(() => {
                    scanBtn.innerHTML = '<i class="fa-solid fa-rocket"></i> BOOST SEO GRADE';
                }, 3000);
            }
        }, 30);
    });
});