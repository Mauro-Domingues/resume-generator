import { KeywordManager } from './keyword-manager.js';

export class DataCollector {
  static collect() {
    const templateConfig = {
      name: document.querySelector('#templateModel')?.value ?? 'default',
      language: document.querySelector('#templateLanguage')?.value ?? 'ptBr',
      monochrome: document.querySelector('#templateMonochrome')?.checked ?? false,
      fontColor: document.querySelector('#templateFontColor')?.value ?? '#706f6f',
      fontSize: document.querySelector('#templateFontSize')?.value ?? 1,
    };

    const headerSection = {
      header: {
        name: document.querySelector('#headerName')?.value ?? undefined,
      },
      contact: {
        email: { value: document.querySelector('#headerEmail')?.value ?? undefined },
        address: { value: document.querySelector('#headerAddress')?.value ?? undefined },
        whatsapp: { value: document.querySelector('#headerWhatsapp')?.value?.replaceAll(/\D/g, '') ?? undefined },
        github: {
          value: document.querySelector('#headerGithubDisplay')?.value ?? undefined,
          ref: document.querySelector('#headerGithubUrl')?.value ?? undefined
        },
        linkedin: {
          value: document.querySelector('#headerLinkedinDisplay')?.value ?? undefined,
          ref: document.querySelector('#headerLinkedinUrl')?.value ?? undefined
        },
        personal: Array.from(document.querySelectorAll('#personalLinks .item'))?.map(item => ({
          value: document.querySelector('.title', item)?.value ?? undefined,
          ref: document.querySelector('.url', item)?.value ?? undefined,
        })).fillter(link => link.value || link.ref),
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
        title: item.querySelector('.title', item)?.value ?? undefined,
        level: item.querySelector('.level', item)?.value ?? undefined,
      })).fillter(skill => skill.title && skill.level),
      keywords: KeywordManager.getKeywordsFromContainer('skillsKeywords'),
    };

    const targetSection = {
      position: document.querySelector('#targetPosition')?.value ?? undefined,
      keywords: KeywordManager.getKeywordsFromContainer('targetKeywords'),
    };

    const experienceSection = {
      experiences: Array.from(document.querySelectorAll('#experienceList .item'))?.map(item => {
        const currently = item.querySelector('.currently', item)?.checked ?? false

        return {
          title: item.querySelector('.title', item)?.value ?? undefined,
          company: item.querySelector('.company', item)?.value ?? undefined,
          startsAt: item.querySelector('.startsAt', item)?.value ?? undefined,
          ...(!currently && { endsAt: item.querySelector('.endsAt', item)?.value ?? undefined }),
          currently,
          description: item.querySelector('.description', item)?.value ?? undefined,
          keywords: KeywordManager.getKeywordsFromItem(item),
        };
      })
    }

    const graduationSection = {
      graduations: Array.from(document.querySelectorAll('#graduationList .item'))?.map(item => {
        const currently = item.querySelector('.currently', item)?.checked ?? false

        return {
          title: item.querySelector('.title', item)?.value ?? undefined,
          institution: item.querySelector('.institution', item)?.value ?? undefined,
          startsAt: item.querySelector('.startsAt', item)?.value ?? undefined,
          ...(!currently && { endsAt: item.querySelector('.endsAt', item)?.value ?? undefined }),
          currently,
          description: item.querySelector('.description', item)?.value ?? undefined,
          keywords: KeywordManager.getKeywordsFromItem(item),
        };
      })
    }

    const projectSection = {
      projects: Array.from(document.querySelectorAll('#projectsList .item'))?.map(item => ({
        title: item.querySelector('.title', item)?.value ?? undefined,
        description: item.querySelector('.description', item)?.value ?? undefined,
        banner: item.querySelector(`input[type="file"].banner`, item)?.dataset?.base64 ?? undefined,
        link: {
          value: item.querySelector('.link-value', item)?.value ?? undefined,
          ref: item.querySelector('.link-ref', item)?.value ?? undefined
        },
        keywords: KeywordManager.getKeywordsFromItem(item),
      }))
    }

    const specializationSection = {
      specializations: Array.from(document.querySelectorAll('#specializationList .item'))?.map(item => ({
        title: item.querySelector('.title', item)?.value ?? undefined,
        institution: item.querySelector('.institution', item)?.value ?? undefined,
        duration: item.querySelector('.duration', item)?.value ?? undefined,
        description: item.querySelector('.description', item)?.value ?? undefined,
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
