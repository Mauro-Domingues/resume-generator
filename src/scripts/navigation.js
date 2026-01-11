export class Navigation {
  constructor() {
    this.#setupNavigation();
    this.#showFirstPanel();
  }

  #setupNavigation() {
    const navButtons = document.querySelectorAll('#nav button');
    navButtons.forEach(button => {
      button.addEventListener('click', () => {
        const section = button.dataset.section;
        document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active'));
        const element = document.getElementById(section);
        if (element) element.classList.add('active');
      });
    });
  }

  #showFirstPanel() {
    const firstPanel = document.querySelectorAll('.panel')[0];
    if (firstPanel) firstPanel.classList.add('active');
  }
}
