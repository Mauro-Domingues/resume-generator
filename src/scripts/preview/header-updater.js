import { Icons } from './icons.js?v=1.0.0';
import { phoneMasker } from '../phone-masker.js?v=1.0.0';
import { PreviewUtils } from './utils.js?v=1.0.0';

export class HeaderUpdater {
  static #renderWhatsapp(contact, templateConfig) {
    if (!contact.whatsapp?.value) return '';
    return `
      <li class="whatsapp">
        <a href="https://wa.me/${contact.whatsapp.value}" target="_blank">
          ${Icons.whatsappIcon(templateConfig)}
          ${phoneMasker(contact.whatsapp.value)}
        </a>
      </li>`;
  }

  static #renderEmail(contact, templateConfig) {
    if (!contact.email?.value) return '';
    return `
      <li class="email">
        <a href="mailto:${contact.email.value}">
          ${Icons.envelopeIcon(templateConfig)}
          ${contact.email.value}
        </a>
      </li>`;
  }

  static #renderAddress(contact, templateConfig) {
    if (!contact.address?.value) return '';
    return `
      <li class="address">
        <a href="https://maps.google.com/?q=${contact.address.value}" target="_blank">
          ${Icons.locationIcon(templateConfig)}
          ${contact.address.value}
        </a>
      </li>`;
  }

  static #renderGithub(contact, templateConfig) {
    if (!contact.github?.ref) return '';
    return `
      <li class="github">
        <a href="${contact.github.ref}" target="_blank">
          ${Icons.githubIcon(templateConfig)}
          ${contact.github.value || contact.github.ref}
        </a>
      </li>`;
  }

  static #renderLinkedin(contact, templateConfig) {
    if (!contact.linkedin?.ref) return '';
    return `
      <li class="linkedin">
        <a href="${contact.linkedin.ref}" target="_blank">
          ${Icons.linkedinIcon(templateConfig)}
          ${contact.linkedin.value || contact.linkedin.ref}
        </a>
      </li>`;
  }

  static #renderPersonal(contact, templateConfig) {
    if (!contact.personal?.length) return '';
    return contact.personal
      .filter(p => p.ref)
      .reduce((acc, p) => acc + `
        <li class="site">
          <a href="${p.ref}" target="_blank">
            ${Icons.siteIcon(templateConfig)}
            ${p.value || p.ref}
          </a>
        </li>`, '')
  }

  static #renderContacts(contact, templateConfig) {
    const itemsHtml = [
      HeaderUpdater.#renderWhatsapp(contact, templateConfig),
      HeaderUpdater.#renderEmail(contact, templateConfig),
      HeaderUpdater.#renderAddress(contact, templateConfig),
      HeaderUpdater.#renderGithub(contact, templateConfig),
      HeaderUpdater.#renderLinkedin(contact, templateConfig),
      HeaderUpdater.#renderPersonal(contact, templateConfig)
    ].join('');

    return `<ul class="contact">${itemsHtml}</ul>`;
  }

  static update(doc, headerSection, templateConfig) {
    if (!headerSection.header?.name) {
      PreviewUtils.insertOrUpdateSection(doc, 'header', '');
      return;
    }

    const html = `
      <section id="header">
        <h1 class="title">${headerSection.header.name}</h1>
        ${HeaderUpdater.#renderContacts(headerSection.contact, templateConfig)}
      </section>
    `;

    PreviewUtils.insertOrUpdateSection(doc, 'header', html);
  }
}
