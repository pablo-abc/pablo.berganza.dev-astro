const styleString = `
    .code-container {
      position: relative;
      margin: 8px auto;
      width: 95%;
    }

    .code-container__copy-button {
      opacity: 0.5;
      padding-left: 0.5rem;
      padding-right: 0.3rem;
      padding-top: 0.6rem;
      padding-bottom: 0.1rem;
      border-radius: 10px;
      color: var(--foreground);
      font-size: 1rem;
      position: absolute;
      top: 0.2rem;
      right: 0.2rem;
    }

    .code-container__copy-button--copied {
      color: var(--color-complement-3);
    }

    .code-container__copy-button--failed {
      color: var(--color-secondary-1-2);
    }

    .code-container__copy-button svg {
      height: 1.5rem;
    }

    .code-container__copy-button:focus-visible {
      opacity: 1;
    }

    .code-container__copy-button:hover, .code-container__copy-button:focus-visible {
      opacity: 1;
      background: hsl(231,15%,28%);
      cursor: pointer;
    }
    .code-container__copy-button:active {
      background: hsl(231,15%,38%);
    }
`;

const i18n = {
  en: {
    tooltip: {
      idle: 'Copy to clipboard',
      success: 'Copied!',
      failed: 'Failed to copy',
    },
  },
  es: {
    tooltip: {
      idle: 'Copiar al portapapeles',
      success: '¡Copiado!',
      failed: 'Error al copiar',
    },
  },
};

export function load() {
  const lang = document.documentElement.lang;
  const messages = i18n[lang];
  const codeBlocks = document.querySelectorAll('pre');
  const style = document.createElement('style');
  style.type = 'text/css';
  style.textContent = styleString;
  document.head.appendChild(style);
  const copySvg = `
<svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
</svg>`;
  const copiedSvg = `
<svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
</svg>`;
  const failedSvg = `
<svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
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
    const copyButton = document.createElement('button');
    container.appendChild(copyButton);
    const svgContainer = document.createElement('span');
    copyButton.appendChild(svgContainer);
    const tooltip = document.createElement('div');
    copyButton.appendChild(tooltip);

    tooltip.id = `tooltip-copy-${id}`;
    tooltip.className = 'button-tooltip';
    tooltip.setAttribute('aria-hidden', true);
    tooltip.style.visibility = 'hidden';
    tooltip.style.position = 'fixed';
    tooltip.textContent = messages.tooltip.idle;
    svgContainer.innerHTML = copySvg;
    copyButton.className = 'code-container__copy-button';
    copyButton.setAttribute('aria-labelledby', tooltip.id);
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(textContent).then(() => {
          svgContainer.innerHTML = copiedSvg;
          tooltip.textContent = messages.tooltip.success;
          copyButton.classList.add('code-container__copy-button--copied');
          setTimeout(() => {
            svgContainer.innerHTML = copySvg;
            copyButton.classList.remove('code-container__copy-button--copied');
            tooltip.textContent = messages.tooltip.idle;
          }, 500);
        });
      } catch {
        svgContainer.innerHTML = failedSvg;
        tooltip.textContent = messages.tooltip.failed;
        copyButton.classList.add('code-container__copy-button--failed');
        setTimeout(() => {
          svgContainer.innerHTML = copySvg;
          copyButton.classList.remove('code-container__copy-button--failed');
          tooltip.textContent = messages.tooltip.idle;
        }, 500);
      }
    });
    function repositionTooltip() {
      const tooltipRect = tooltip.getBoundingClientRect();
      const buttonRect = copyButton.getBoundingClientRect();
      tooltip.style.left = `${buttonRect.left - tooltipRect.width - 8}px`;
      tooltip.style.top = `${buttonRect.top + buttonRect.height / 2}px`;
      tooltip.style.transform = 'translateY(-50%)';
    }
    repositionTooltip();

    let interval = null;
    function showTooltip() {
      tooltip.style.visibility = 'visible';
      if (interval) clearInterval(interval);
      repositionTooltip();
      interval = setInterval(repositionTooltip, 10);
    }
    function hideTooltip() {
      tooltip.style.visibility = 'hidden';
      if (!interval) return;
      clearInterval(interval);
      interval = null;
    }
    copyButton.addEventListener('mouseenter', showTooltip);
    copyButton.addEventListener('focusin', () => {
      if (!copyButton.classList.contains('focus-visible')) return;
      showTooltip();
    });
    copyButton.addEventListener('mouseleave', hideTooltip);
    copyButton.addEventListener('focusout', hideTooltip);
    copyButton.addEventListener('touchstart', () => {
      copyButton.style.opacity = '1';
      showTooltip();
    });
    copyButton.addEventListener('touchend', () => {
      setTimeout(() => {
        copyButton.style.opacity = '';
        hideTooltip();
      }, 700);
    });
    document.addEventListener('visibilitychange', hideTooltip);
    id += 1;
  }
}
