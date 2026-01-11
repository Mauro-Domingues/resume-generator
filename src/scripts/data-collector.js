import { KeywordManager } from './keyword-manager.js';

export class DataCollector {
  static collect() {
    const templateConfig = {
      name: document.querySelector('#templateModel')?.value,
      language: document.querySelector('#templateLanguage')?.value,
      monochrome: document.querySelector('#templateMonochrome')?.checked,
      fontColor: document.querySelector('#templateFontColor')?.value,
      fontSize: document.querySelector('#templateFontSize')?.value,
    };

    const headerSection = {
      header: {
        name: document.querySelector('#headerName')?.value,
      },
      contact: {
        email: { value: document.querySelector('#headerEmail')?.value },
        address: { value: document.querySelector('#headerAddress')?.value },
        whatsapp: { value: document.querySelector('#headerWhatsapp')?.value?.replaceAll(/\D/g, '') },
        github: {
          value: document.querySelector('#headerGithubDisplay')?.value,
          ref: document.querySelector('#headerGithubUrl')?.value
        },
        linkedin: {
          value: document.querySelector('#headerLinkedinDisplay')?.value,
          ref: document.querySelector('#headerLinkedinUrl')?.value
        },
        personal: Array.from(document.querySelectorAll('#personalLinks .item'))?.map(item => ({
          value: document.querySelector('.title', item)?.value,
          ref: document.querySelector('.url', item)?.value,
        }))
      },
    };

    const aboutSection = {
      descriptions: Array.from(document.querySelectorAll('#aboutDescriptions .description-tag'))
        ?.map(input => input.value?.trim())
        .filter(Boolean),
      keywords: KeywordManager.getKeywordsFromContainer('aboutKeywords'),
    };

    const skillSection = {
      skills: Array.from(document.querySelectorAll('#skillsList .item'))?.map(item => ({
        title: item.querySelector('.title', item)?.value,
        level: item.querySelector('.level', item)?.value,
      })),
      keywords: KeywordManager.getKeywordsFromContainer('skillsKeywords'),
    };

    const targetSection = {
      position: document.querySelector('#targetPosition')?.value,
      keywords: KeywordManager.getKeywordsFromContainer('targetKeywords'),
    };

    const experienceSection = {
      experiences: Array.from(document.querySelectorAll('#experienceList .item'))?.map(item => {
        const currently = item.querySelector('.currently', item)?.checked

        return {
          title: item.querySelector('.title', item)?.value,
          company: item.querySelector('.company', item)?.value,
          startsAt: item.querySelector('.startsAt', item)?.value,
          ...(!currently && { endsAt: item.querySelector('.endsAt', item)?.value }),
          currently,
          description: item.querySelector('.description', item)?.value,
          keywords: KeywordManager.getKeywordsFromItem(item),
        };
      })
    }

    const graduationSection = {
      graduations: Array.from(document.querySelectorAll('#graduationList .item'))?.map(item => {
        const currently = item.querySelector('.currently', item)?.checked

        return {
          title: item.querySelector('.title', item)?.value,
          institution: item.querySelector('.institution', item)?.value,
          startsAt: item.querySelector('.startsAt', item)?.value,
          ...(!currently && { endsAt: item.querySelector('.endsAt', item)?.value }),
          currently,
          description: item.querySelector('.description', item)?.value,
          keywords: KeywordManager.getKeywordsFromItem(item),
        };
      })
    }

    const projectSection = {
      projects: Array.from(document.querySelectorAll('#projectsList .item'))?.map(item => ({
        title: item.querySelector('.title', item)?.value,
        description: item.querySelector('.description', item)?.value,
        banner: item.querySelector(`input[type="file"].banner`, item)?.dataset?.base64,
        link: {
          value: item.querySelector('.link-value', item)?.value,
          ref: item.querySelector('.link-ref', item).value
        },
        keywords: KeywordManager.getKeywordsFromItem(item),
      }))
    }

    const specializationSection = {
      specializations: Array.from(document.querySelectorAll('#specializationList .item'))?.map(item => ({
        title: item.querySelector('.title', item)?.value,
        institution: item.querySelector('.institution', item)?.value,
        duration: item.querySelector('.duration', item)?.value,
        description: item.querySelector('.description', item)?.value,
        keywords: KeywordManager.getKeywordsFromItem(item),
      }))
    }

    return {
      templateConfig,
      headerSection,
      aboutSection,
      skillSection,
      targetSection,
      graduationSection,
      specializationSection,
      projectSection,
      experienceSection,
    };
  }
}
