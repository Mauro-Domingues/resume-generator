export class Header {
  #whatsappInput;
  #personalLinksContainer;
  #personalLinksAddButton;

  constructor() {
    this.#whatsappInput = document.querySelector('#headerWhatsapp');
    this.#personalLinksContainer = document.querySelector('#personalLinks');
    this.#personalLinksAddButton = document.querySelector('#personalLinksAdd');
    this.#setupWhatsappMask();
    this.#setupPersonalLinks();
  }

  init(headerData) {
    if (!headerData) return;

    if (headerData.header?.name) {
      const nameInput = document.querySelector('#headerName');
      if (nameInput) nameInput.value = headerData.header.name;
    }

    if (headerData.contact) {
      this.#restoreContactFields(headerData.contact);
      headerData.contact.personal?.forEach(link => this.#addPersonalLink(link));
    }
  }

  #restoreContactFields(contact) {
    const fieldMap = {
      '#headerEmail': contact.email?.value,
      '#headerAddress': contact.address?.value,
      '#headerWhatsapp': contact.whatsapp?.value,
      '#headerGithubDisplay': contact.github?.value,
      '#headerGithubUrl': contact.github?.ref,
      '#headerLinkedinDisplay': contact.linkedin?.value,
      '#headerLinkedinUrl': contact.linkedin?.ref
    };

    Object.entries(fieldMap).forEach(([selector, value]) => {
      if (value) {
        const element = document.querySelector(selector);
        if (element) element.value = value;
      }
    });
  }

  #applyWhatsappMask(value) {
    const numbers = value.replaceAll(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  }

  #setupWhatsappMask() {
    this.#whatsappInput?.addEventListener('input', (event) => {
      event.target.value = this.#applyWhatsappMask(event.target.value);
    });
  }

  #setupPersonalLinks() {
    this.#personalLinksAddButton?.addEventListener('click', (event) => {
      event.preventDefault();
      this.#addPersonalLink();
    });
  }

  #addPersonalLink(data = null) {
    const item = document.createElement('div');
    item.className = 'item';
    item.setAttribute('role', 'group');
    item.setAttribute('aria-label', 'Link pessoal');

    item.innerHTML = `
      <input class="title" placeholder="Nome do Site (e.g., Portfolio)" aria-label="Nome do link" />
      <input class="url" placeholder="URL do Site" aria-label="URL do link" />
    `;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove';
    removeBtn.setAttribute('aria-label', 'Remover link');
    removeBtn.addEventListener('click', () => item.remove());

    item.appendChild(removeBtn);

    if (data) {
      const titleInput = item.querySelector('.title');
      const urlInput = item.querySelector('.url');
      if (titleInput && data.value) titleInput.value = data.value;
      if (urlInput && data.ref) urlInput.value = data.ref;
    }

    this.#personalLinksContainer?.appendChild(item);
  }
}
