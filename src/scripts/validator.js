import { Toast } from './toast.js';

export class Validator {
  static #validationRules = {
    default: element => {
      const value = element?.value?.toString().trim();
      return Boolean(value);
    },
    email: element => {
      const value = element?.value?.toString().trim();
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      return emailRegex.test(value);
    },
    date: element => {
      const value = element?.value?.toString().trim();
      return Boolean(value) && !Number.isNaN(Date.parse(value));
    },
    number: element => {
      const value = element?.value?.toString().trim();
      if (!value) return false;
      const num = Number(value);
      return !Number.isNaN(num) && Number.isFinite(num);
    },
    url: element => {
      const value = element?.value?.toString().trim();
      if (!value) return false;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    tel: element => {
      const value = element?.value?.toString().trim();
      const digits = value.replaceAll(/\D/g, '');
      return digits.length >= 8;
    },
  };

  static #errorMessages = {
    default: 'Este campo é obrigatório',
    email: 'Informe um e-mail válido',
    date: 'Selecione uma data',
    number: 'Informe um número válido',
    url: 'Informe uma URL válida',
    tel: 'Informe um telefone válido',
    minlength: minLength => `Mínimo de ${minLength} caracteres`,
    maxlength: maxLength => `Máximo de ${maxLength} caracteres`,
    pattern: 'Formato inválido',
  };

  static #getFormElements() {
    return document.querySelectorAll(
      'input:not([data-ignore="true"]), textarea:not([data-ignore="true"]), select:not([data-ignore="true"])',
    );
  }

  static #getValidationRule(element) {
    return this.#validationRules[element.type] || this.#validationRules.default;
  }

  static #getErrorMessage(element) {
    const value = (element.value || '').trim();

    if (value === '' && element.required) {
      return this.#errorMessages[element.type] || this.#errorMessages.default;
    }

    if (value !== '') {
      const rule = this.#getValidationRule(element);
      if (!rule(element)) {
        return this.#errorMessages[element.type] || this.#errorMessages.default;
      }

      if (
        element.minLength &&
        element.minLength > 0 &&
        value.length < element.minLength
      ) {
        return this.#errorMessages.minlength(element.minLength);
      }

      if (
        element.maxLength &&
        element.maxLength > 0 &&
        value.length > element.maxLength
      ) {
        return this.#errorMessages.maxlength(element.maxLength);
      }

      if (element.pattern && !new RegExp(element.pattern).test(value)) {
        return this.#errorMessages.pattern;
      }
    }

    return this.#errorMessages.default;
  }

  static #validateElement(element) {
    const value = (element.value || '').trim();
    const isRequired = element.required;

    if (isRequired && value === '') {
      return false;
    }

    if (!isRequired && value === '') {
      return true;
    }

    const rule = this.#getValidationRule(element);
    if (!rule(element)) {
      return false;
    }

    if (
      element.minLength &&
      element.minLength > 0 &&
      value.length < element.minLength
    ) {
      return false;
    }

    if (
      element.maxLength &&
      element.maxLength > 0 &&
      value.length > element.maxLength
    ) {
      return false;
    }

    if (element.pattern && !new RegExp(element.pattern).test(value)) {
      return false;
    }

    return true;
  }

  static validate() {
    const invalidFields = [];
    this.#clearErrors();

    const elements = this.#getFormElements();
    elements.forEach(element => {
      if (!this.#validateElement(element)) {
        invalidFields.push(element);
      }
    });

    if (invalidFields.length) {
      this.#markErrors(invalidFields);
      this.#markNavSectionsWithErrors(invalidFields);
      this.#showErrorToast(invalidFields);
    }

    return {
      isValid: invalidFields.length === 0,
      invalidFields,
    };
  }

  static #getFieldLabel(element) {
    if (element.getAttribute('aria-label')) {
      return element.getAttribute('aria-label');
    }

    const label = document.querySelector(`label[for="${element.id}"]`);
    if (label) {
      return label.textContent.trim();
    }

    return element.placeholder || element.id || 'Campo';
  }

  static #getItemIndex(element) {
    const listItem = element.closest('li');
    if (listItem) {
      const parent = listItem.parentElement;
      if (
        parent &&
        (parent.id.includes('List') ||
          parent.classList.contains('descriptions-container') ||
          parent.classList.contains('keywords-container') ||
          parent.classList.contains('items-container'))
      ) {
        const items = Array.from(parent.children);
        return items.indexOf(listItem) + 1;
      }
    }
    return null;
  }

  static #showErrorToast(invalidFields) {
    const errorsBySection = new Map();

    invalidFields.forEach(element => {
      const section = element.closest('.panel')?.id || 'formulário';
      const fieldLabel = this.#getFieldLabel(element);
      const itemIndex = this.#getItemIndex(element);

      const fullLabel = itemIndex ? `${fieldLabel} #${itemIndex}` : fieldLabel;

      if (!errorsBySection.has(section)) {
        errorsBySection.set(section, new Set());
      }
      errorsBySection.get(section).add(fullLabel);
    });

    if (errorsBySection.size === 1) {
      const [, fields] = [...errorsBySection.entries()][0];
      const fieldArray = Array.from(fields);
      const fieldList =
        fieldArray.length <= 2
          ? fieldArray.join(' e ')
          : `${fieldArray.slice(0, -1).join(', ')} e ${fieldArray.at(-1)}`;
      const message = `${fieldList} ${fieldArray.length > 1 ? 'precisam' : 'precisa'} ser preenchido(s)`;
      Toast.error(message);
    } else {
      Toast.error(
        'Há campos com erros em várias seções. Verifique e tente novamente.',
      );
    }
  }

  static #markNavSectionsWithErrors(invalidFields) {
    document.querySelectorAll('[data-section]').forEach(btn => {
      btn.classList.remove('nav-btn-error');
    });

    const sectionsWithErrors = new Set();
    invalidFields.forEach(element => {
      const section =
        element.closest('.panel')?.id || element.closest('[id]')?.id;
      if (section) {
        const navBtn = document.querySelector(`[data-section="${section}"]`);
        if (navBtn) {
          sectionsWithErrors.add(navBtn);
        }
      }
    });

    sectionsWithErrors.forEach(btn => {
      btn.classList.add('nav-btn-error');
    });
  }

  static #markErrors(elements) {
    elements.forEach(element => {
      element.classList.add('input-error');
      element.setAttribute('aria-invalid', 'true');
      if (globalThis.getComputedStyle(element).marginBottom) {
        element.style.marginBottom = '0';
      }

      this.#removeErrorMessage(element);

      const errorMessage = this.#getErrorMessage(element);
      const errorSpan = document.createElement('span');
      errorSpan.className = 'input-error-message';
      errorSpan.setAttribute('role', 'alert');
      errorSpan.textContent = errorMessage;

      element.after(errorSpan);
    });
  }

  static #removeErrorMessage(element) {
    const existingError = element.nextElementSibling?.classList.contains(
      'input-error-message',
    )
      ? element.nextElementSibling
      : null;
    if (existingError) {
      existingError.remove();
    }
  }

  static #clearErrors() {
    const errorElements = document.querySelectorAll('.input-error');
    errorElements.forEach(element => {
      element.classList.remove('input-error');
      element.setAttribute('aria-invalid', 'false');
      element.style.marginBottom = '';
      this.#removeErrorMessage(element);
    });
  }
}
