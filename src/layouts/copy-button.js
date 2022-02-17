function load() {
  const codeBlocks = document.querySelectorAll('pre');
  const copySvg = `
<svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
</svg>`;
  const copiedSvg = `
<svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
</svg>`;
  let id = 0;
  for (const block of codeBlocks) {
    const textContent = block.textContent;
    const parent = block.parentNode;
    const container = document.createElement('div');
    container.className = 'code-container';
    parent.insertBefore(container, block);
    container.appendChild(block);
    block.tabIndex = 0;
    const buttonContainer = document.createElement('div');
    const copyButton = document.createElement('button');
    const svgContainer = document.createElement('span');
    const tooltip = document.createElement('span');
    tooltip.id = `tooltip-copy-${id}`;
    tooltip.className = 'button-tooltip sr-only';
    tooltip.textContent = 'Copy to clipboard';
    svgContainer.innerHTML = copySvg;
    buttonContainer.appendChild(tooltip);
    copyButton.appendChild(svgContainer);
    copyButton.className = 'copy-button';
    copyButton.setAttribute('aria-labelledby', tooltip.id);
    buttonContainer.className = 'button-container';
    buttonContainer.appendChild(copyButton);
    container.appendChild(buttonContainer);
    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(textContent).then(() => {
        svgContainer.innerHTML = copiedSvg;
        tooltip.textContent = 'Copied!';
        buttonContainer.classList.add('copied');
        setTimeout(() => {
          svgContainer.innerHTML = copySvg;
          buttonContainer.classList.remove('copied');
          tooltip.textContent = 'Copy to clipboard';
        }, 500);
      });
    });
    function repositionTooltip() {
      const tooltipRect = tooltip.getBoundingClientRect();
      const buttonRect = copyButton.getBoundingClientRect();
      tooltip.style.left = `${buttonRect.left - tooltipRect.width - 8}px`;
      tooltip.style.top = `${buttonRect.top}px`;
      tooltip.style.transform = 'translateY(50%)';
    }
    let interval = null;
    function showTooltip() {
      tooltip.style.position = 'fixed';
      tooltip.classList.remove('sr-only');
      if (interval) clearInterval(interval);
      interval = setInterval(repositionTooltip, 10);
    }
    function hideTooltip() {
      tooltip.classList.add('sr-only');
      if (!interval) return;
      clearInterval(interval);
      interval = null;
    }
    copyButton.addEventListener('mouseenter', showTooltip);
    copyButton.addEventListener('focusin', showTooltip);
    copyButton.addEventListener('mouseleave', hideTooltip);
    copyButton.addEventListener('focusout', hideTooltip);
    document.addEventListener('visibilitychange', hideTooltip);
    const resizeObserver = new ResizeObserver(repositionTooltip);
    resizeObserver.observe(tooltip);
    id += 1;
  }
}

load();
