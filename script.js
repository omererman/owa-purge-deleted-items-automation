// OWA Purge Automation Script
(async () => {
    const scrollContainer = document.querySelector('.scrollContainer');
    if (!scrollContainer) {
        console.error("Scroll container not found! Make sure the OWA mail list is visible.");
        return;
    }

    console.log("🚀 Starting OWA forced scroll and hover-click simulation...");
    scrollContainer.scrollTop = 0;
    await new Promise(resolve => setTimeout(resolve, 500));

    let totalSelected = 0;
    let lastScrollTop = -1;
    let endCheckCount = 0;

    const triggerRealClick = (targetElement) => {
        const events = ['mouseover', 'mouseenter', 'mousedown', 'mouseup', 'click'];
        events.forEach(eventType => {
            const ev = new MouseEvent(eventType, { bubbles: true, cancelable: true, view: window });
            targetElement.dispatchEvent(ev);
        });
    };

    while (endCheckCount < 10) {
        const rows = document.querySelectorAll('._f_U1');
        
        for (const row of rows) {
            const button = row.querySelector('button[role="checkbox"]');
            
            if (button && button.getAttribute('aria-checked') === 'false' && !button.hasAttribute('data-pas-gec')) {
                button.setAttribute('data-pas-gec', 'true');
                
                row.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
                row.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
                
                await new Promise(resolve => setTimeout(resolve, 50));
                triggerRealClick(button);
                totalSelected++;
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }

        scrollContainer.scrollTop += 350;
        scrollContainer.dispatchEvent(new Event('scroll'));
        await new Promise(resolve => setTimeout(resolve, 400));

        if (scrollContainer.scrollTop === lastScrollTop) {
            endCheckCount++;
        } else {
            lastScrollTop = scrollContainer.scrollTop;
            endCheckCount = 0;
        }
    }

    document.querySelectorAll('[data-pas-gec]').forEach(el => el.removeAttribute('data-pas-gec'));
    console.log(`🎉 Done! Successfully checked ${totalSelected} emails.`);
})();
