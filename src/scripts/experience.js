export class Experience {
  #experienceAddBtn;
  #experienceList;

  constructor() {
    this.#experienceList = document.querySelector('#experienceList');
    this.#experienceAddBtn = document.querySelector('#experienceAdd');


    this.#experienceAddBtn?.addEventListener('click', () => {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
        <input class="title" placeholder="Cargo" value="${data?.title ?? ''}"/>
        <input class="company" placeholder="Empresa" value="${data?.company ?? ''}"/>
        <input type="date" class="startsAt" value="${data?.startsAt ?? ''}"/>
        <input type="date" class="endsAt" value="${data?.endsAt ?? ''}" style="display: ${data?.currently ? 'none' : 'block'}"/>
        <label>Trabalha Atualmente? <input type="checkbox" class="currently" ${data?.currently ? 'checked' : ''}/></label>
        <textarea class="description" placeholder="Descrição">${data?.description ?? ''}</textarea>
      `;

      const keywordsSub = document.createElement('div');
      keywordsSub.className = 'keywords-sub';
      div.appendChild(keywordsSub);

      const keywordsAddBtn = document.createElement('button');
      keywordsAddBtn.type = 'button';
      keywordsAddBtn.className = 'keywords-add';
      keywordsAddBtn.textContent = '+ Adicionar palavra-chave';
      keywordsAddBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const kwDiv = document.createElement('div');
        kwDiv.className = 'keyword-tag-inline';
        kwDiv.innerHTML = `
        <input class="keyword-input" type="text" placeholder="Keyword" />
        <button type="button" class="keyword-remove">×</button>
      `;
        kwDiv.querySelector('.keyword-remove').addEventListener('click', () => kwDiv.remove());
        keywordsSub.appendChild(kwDiv);
      });
      div.appendChild(keywordsAddBtn);

      if (data?.keywords?.length) {
        data.keywords.forEach(keyword => {
          const keywordDiv = document.createElement('div');
          keywordDiv.className = 'keyword-tag-inline';
          keywordDiv.innerHTML = `
          <input class="keyword-input" type="text" value="${keyword}" />
          <button type="button" class="keyword-remove">×</button>
        `;
          keywordDiv.querySelector('.keyword-remove').addEventListener('click', () => keywordDiv.remove());
          keywordsSub.appendChild(keywordDiv);
        });
      }

      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove';
      removeBtn.textContent = 'Remover';
      div.appendChild(removeBtn);

      const currentlyCheckbox = div.querySelector('.currently');
      const endsAtInput = div.querySelector('.endsAt');

      currentlyCheckbox?.addEventListener('change', (event) => {
        if (endsAtInput) {
          endsAtInput.style.display = event.target.checked ? 'none' : 'block';
        }
      });

      removeBtn.addEventListener('click', () => div.remove());

      this.#experienceList.appendChild(div);
    });
  }
}
