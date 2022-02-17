function load() {
  const codeBlocks = document.querySelectorAll('pre');
  const copySvg = `
<span class="sr-only">Copy to clipboard</span>
<svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
</svg>`;
  const copiedSvg = `
<span class="sr-only">Copied!</span>
<svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
</svg>`;
  for (const block of codeBlocks) {
    const textContent = block.textContent;
    const parent = block.parentNode;
    const container = document.createElement('div');
    container.className = 'code-container';
    parent.insertBefore(container, block);
    container.appendChild(block);
    block.tabIndex = 0;
    const copyButton = document.createElement('button');
    copyButton.innerHTML = copySvg;
    copyButton.className = 'copy-button';
    container.appendChild(copyButton);
    const instance = tippy(copyButton, {
      content: 'Copy to clipboard',
      placement: 'left',
    });
    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(textContent).then(() => {
        copyButton.innerHTML = copiedSvg;
        instance.setContent('Copied!');
        instance.show();
        copyButton.classList.add('copied');
        setTimeout(() => {
          copyButton.innerHTML = copySvg;
          copyButton.classList.remove('copied');
          instance.setContent('Copy to clipboard');
        }, 500);
      });
    });
  }
}
load();
