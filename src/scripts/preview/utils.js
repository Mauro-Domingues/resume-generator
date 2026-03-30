export class PreviewUtils {
  static orderArray(data) {
    if (!data) return [];
    return data.sort((a, b) => {
      if (a.currently && !b.currently) return -1;
      if (!a.currently && b.currently) return 1;
      if (!a.currently && !b.currently) {
        const dateA = new Date(a.endsAt ?? Infinity);
        const dateB = new Date(b.endsAt ?? Infinity);
        return dateB.getTime() - dateA.getTime();
      }
      return 0;
    });
  }

  static formatPeriod(templateConfig, item, langDict) {
    const locale = langDict.period.format;
    const dateOptions = { year: 'numeric', month: 'long' };

    const startDate = new Date(item.startsAt).toLocaleDateString(
      locale,
      dateOptions,
    );

    if (item.currently || !item.endsAt) {
      return `${startDate} - ${langDict.period.untilNow}`;
    }

    const endDate = new Date(item.endsAt).toLocaleDateString(
      locale,
      dateOptions,
    );
    return `${startDate} - ${endDate}`;
  }

  static joinKeywords(keywords) {
    return keywords?.join(', ') || '';
  }

  static insertOrUpdateSection(doc, sectionId, htmlContent) {
    const SECTION_ORDER = [
      'header', 'about', 'skills', 'target', 'graduations',
      'specializations', 'projects', 'experiences'
    ];

    let section = doc.getElementById(sectionId);

    if (!htmlContent) {
      if (section) section.remove();
      return;
    }

    if (section) {
      section.outerHTML = htmlContent;
      return;
    }

    const tempDiv = doc.createElement('div');
    tempDiv.innerHTML = htmlContent.trim();
    section = tempDiv.firstElementChild;

    const currentIndex = SECTION_ORDER.indexOf(sectionId);
    let inserted = false;

    for (let i = currentIndex + 1; i < SECTION_ORDER.length; i++) {
      const nextSiblingId = SECTION_ORDER[i];
      const nextSibling = doc.getElementById(nextSiblingId);
      if (nextSibling) {
        nextSibling.parentNode.insertBefore(section, nextSibling);
        inserted = true;
        break;
      }
    }

    if (!inserted) {
      doc.body.appendChild(section);
    }
  }
}

