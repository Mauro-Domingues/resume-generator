export class Project {
  #projectList;
  #addButton;

  constructor() {
    this.#projectList = document.querySelector('#projectsList');
    this.#addButton = document.querySelector('#projectsAdd');
    this.#setupEventListeners();
  }

  init(projects = []) {
    projects.forEach(project => this.#addItem(project));
  }

  #setupEventListeners() {
    this.#addButton?.addEventListener('click', () => this.#addItem());
  }

  #addItem(data = null) {
    const item = document.createElement('div');
    item.className = 'item';
    item.setAttribute('role', 'group');
    item.setAttribute('aria-label', 'Item de projeto');

    item.innerHTML = `
      <input class="title" placeholder="Título" aria-label="Título do projeto" />
      <textarea class="description" placeholder="Descrição" aria-label="Descrição do projeto"></textarea>
      <div class="image-input-wrapper">
        <input type="file" class="banner" accept="image/*" data-base64="" aria-label="Banner do projeto" />
        <button type="button" class="banner-remove remove" aria-label="Remover banner"></button>
      </div>
      <input class="link-value" placeholder="Display Link" aria-label="Texto do link" />
      <input class="link-ref" placeholder="Link URL" aria-label="URL do link" />
    `;

    const keywordsSub = document.createElement('div');
    keywordsSub.className = 'keywords-sub';
    keywordsSub.setAttribute('role', 'group');
    keywordsSub.setAttribute('aria-label', 'Palavras-chave do projeto');

    const keywordsLabel = document.createElement('label');
    keywordsLabel.textContent = 'Palavras-chave';
    keywordsSub.appendChild(keywordsLabel);

    item.appendChild(keywordsSub);

    const keywordsAddBtn = document.createElement('button');
    keywordsAddBtn.type = 'button';
    keywordsAddBtn.className = 'keywords-add';
    keywordsAddBtn.textContent = '+ Adicionar palavra-chave';
    keywordsAddBtn.setAttribute('aria-label', 'Adicionar palavra-chave');
    keywordsAddBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.#addKeyword(keywordsSub);
    });

    item.appendChild(keywordsAddBtn);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove';
    removeBtn.setAttribute('aria-label', 'Remover projeto');
    removeBtn.addEventListener('click', () => item.remove());

    item.appendChild(removeBtn);

    const bannerInput = item.querySelector('.banner');
    const clearBtn = item.querySelector('.banner-remove');

    bannerInput.addEventListener('change', (event) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          bannerInput.dataset.base64 = e.target?.result || '';
        };
        reader.readAsDataURL(file);
      }
    });

    clearBtn.addEventListener('click', (event) => {
      event.preventDefault();
      bannerInput.value = '';
      bannerInput.dataset.base64 = '';
    });

    if (data) {
      this.#populateItem(item, data);
    }

    this.#projectList?.appendChild(item);
  }

  #addKeyword(container, value = '') {
    const kwDiv = document.createElement('div');
    kwDiv.className = 'keyword-tag-inline';
    kwDiv.setAttribute('role', 'group');
    kwDiv.setAttribute('aria-label', 'Palavra-chave');

    const input = document.createElement('input');
    input.className = 'keyword-input';
    input.type = 'text';
    input.placeholder = 'palavra-chave';
    input.setAttribute('aria-label', 'Texto da palavra-chave');
    if (value) input.value = value;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'keyword-remove';
    removeBtn.setAttribute('aria-label', 'Remover palavra-chave');
    removeBtn.addEventListener('click', () => kwDiv.remove());

    kwDiv.appendChild(input);
    kwDiv.appendChild(removeBtn);
    container.appendChild(kwDiv);
  }

  #populateItem(item, data) {
    const setInputValue = (selector, value) => {
      if (value !== undefined) {
        const el = item.querySelector(selector);
        if (el) el.value = value;
      }
    };

    setInputValue('.title', data.title);
    setInputValue('.description', data.description);
    setInputValue('.link-value', data.link?.value);
    setInputValue('.link-ref', data.link?.ref);

    if (data.banner) {
      const bannerInput = item.querySelector('.banner');
      if (bannerInput) {
        bannerInput.dataset.base64 = data.banner;
      }
    }

    const keywordsSub = item.querySelector('.keywords-sub');
    data.keywords?.forEach(kw => this.#addKeyword(keywordsSub, kw));
  }
}
