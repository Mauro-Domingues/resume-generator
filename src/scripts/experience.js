export class Experience {
  #experienceList;
  #experienceAddBtn;

  constructor() {
    this.#experienceList = document.querySelector('#experienceList');
    this.#experienceAddBtn = document.querySelector('#experienceAdd');
    this.#setupEventListeners();
  }

  init(experiences = []) {
    experiences.forEach(exp => this.#addItem(exp));
  }

  #setupEventListeners() {
    this.#experienceAddBtn?.addEventListener('click', () => this.#addItem());
  }

  #addItem(data = null) {
    const item = document.createElement('div');
    item.className = 'item';
    item.setAttribute('role', 'group');
    item.setAttribute('aria-label', 'Item de experiência profissional');

    item.innerHTML = `
      <input class="title" placeholder="Cargo" aria-label="Cargo" />
      <input class="company" placeholder="Empresa" aria-label="Empresa" />
      <input type="date" class="startsAt" aria-label="Data de início" />
      <input type="date" class="endsAt" aria-label="Data de término" />
      <label><input type="checkbox" class="currently" /> Trabalha Atualmente?</label>
      <textarea class="description" placeholder="Descrição" aria-label="Descrição das atividades"></textarea>
    `;

    const keywordsSub = document.createElement('div');
    keywordsSub.className = 'keywords-sub';
    keywordsSub.setAttribute('role', 'group');
    keywordsSub.setAttribute('aria-label', 'Palavras-chave da experiência');

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
    removeBtn.setAttribute('aria-label', 'Remover experiência');
    removeBtn.addEventListener('click', () => item.remove());

    item.appendChild(removeBtn);

    const currentlyCheckbox = item.querySelector('.currently');
    const endsAtInput = item.querySelector('.endsAt');

    currentlyCheckbox?.addEventListener('change', (event) => {
      if (endsAtInput) {
        endsAtInput.style.display = event.target.checked ? 'none' : 'block';
      }
    });

    if (data) {
      this.#populateItem(item, data);
    }

    this.#experienceList?.appendChild(item);
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
    setInputValue('.company', data.company);
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
