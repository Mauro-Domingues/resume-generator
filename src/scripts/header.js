import { phoneMasker } from "./phone-masker.js?v=1.0.0";

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

    if (headerData.contact?.whatsapp?.value) {
      this.#whatsappInput.value = phoneMasker(headerData.contact.whatsapp.value);
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
      '#headerLinkedinUrl': contact.linkedin?.ref,
    };

    Object.entries(fieldMap).forEach(([selector, value]) => {
      if (value) {
        const element = document.querySelector(selector);
        if (element) element.value = value;
      }
    });
  }

  #setupWhatsappMask() {
    this.#whatsappInput?.addEventListener('input', event => {
      event.target.value = phoneMasker(event.target.value);
    });
  }

  #setupPersonalLinks() {
    this.#personalLinksAddButton?.addEventListener('click', event => {
      event.preventDefault();
      this.#addPersonalLink();
    });
  }

  #addPersonalLink(data = null) {
    const index = this.#personalLinksContainer?.children.length || 0;
    const item = document.createElement('li');
    item.className = 'item';
    item.setAttribute('aria-label', 'Link pessoal');

    item.innerHTML = `
      <label for="personalLink-title-${index}">NOME DO SITE</label>
      <input id="personalLink-title-${index}" class="title" type="text" placeholder="Nome do Site (e.g., Portfolio)" required aria-required="true" aria-label="Nome do link"/>
      <label for="personalLink-url-${index}">URL DO SITE</label>
      <input id="personalLink-url-${index}" class="url" type="url" placeholder="URL do Site" required aria-required="true" aria-label="URL do link"/>
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
