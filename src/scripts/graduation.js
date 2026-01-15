export class Graduation {
  #graduationList;
  #addButton;

  constructor() {
    this.#graduationList = document.querySelector('#graduationList');
    this.#addButton = document.querySelector('#graduationAdd');
    this.#setupEventListeners();
  }

  init(graduations = []) {
    graduations.forEach(grad => this.#addItem(grad));
  }

  #setupEventListeners() {
    this.#addButton?.addEventListener('click', () => this.#addItem());
  }

  #addItem(data = null) {
    const item = document.createElement('div');
    item.className = 'item';
    item.setAttribute('role', 'group');
    item.setAttribute('aria-label', 'Item de escolaridade');

    item.innerHTML = `
      <input class="title" placeholder="Título" aria-label="Título do curso" />
      <input class="institution" placeholder="Instituição" aria-label="Nome da instituição" />
      <input type="date" class="startsAt" placeholder="Início" aria-label="Data de início" />
      <input type="date" class="endsAt" placeholder="Fim" aria-label="Data de término" />
      <label><input type="checkbox" class="currently" /> Cursa Atualmente?</label>
      <textarea class="description" placeholder="Descrição" aria-label="Descrição do curso"></textarea>
    `;

    const currentlyCheckbox = item.querySelector('.currently');
    const endsAtInput = item.querySelector('.endsAt');

    currentlyCheckbox?.addEventListener('change', (event) => {
      endsAtInput.style.display = event.target?.checked ? 'none' : 'block';
    });

    const keywordsSub = document.createElement('div');
    keywordsSub.className = 'keywords-sub';
    keywordsSub.setAttribute('role', 'group');
    keywordsSub.setAttribute('aria-label', 'Palavras-chave da escolaridade');

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
    removeBtn.setAttribute('aria-label', 'Remover escolaridade');
    removeBtn.addEventListener('click', () => item.remove());

    item.appendChild(removeBtn);

    if (data) {
      this.#populateItem(item, data);
    }

    this.#graduationList?.appendChild(item);
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
    setInputValue('.institution', data.institution);
    setInputValue('.startsAt', data.startsAt);
    setInputValue('.endsAt', data.endsAt);

    const currentlyCheckbox = item.querySelector('.currently');
    if (currentlyCheckbox && data.currently !== undefined) {
      currentlyCheckbox.checked = data.currently;
      currentlyCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
    }

    setInputValue('.description', data.description);

    const keywordsSub = item.querySelector('.keywords-sub');
    data.keywords?.forEach(kw => this.#addKeyword(keywordsSub, kw));
  }
}