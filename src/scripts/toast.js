export class Toast {
  static #container = null;

  static initialize() {
    if (!this.#container) {
      this.#container = document.createElement('div');
      this.#container.id = 'toast-container';
      this.#container.setAttribute('role', 'region');
      this.#container.setAttribute('aria-live', 'assertive');
      this.#container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(this.#container);
    }
  }

  static error(message, duration = 6000) {
    this.initialize();

    const toast = document.createElement('div');
    toast.className = 'toast toast-error';
    toast.setAttribute('role', 'alert');
    toast.textContent = message;

    this.#container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    if (duration > 0) {
      setTimeout(() => {
        this.#removeToast(toast);
      }, duration);
    }

    return toast;
  }

  static #removeToast(toast) {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }
}
