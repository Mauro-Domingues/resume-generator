import { IAssertNumberDTO } from 'dtos/IAssertNumberDTO';
import { ISkillItemDTO } from 'dtos/ISkillItemDTO';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { IVariablesDTO } from 'dtos/IVariablesDTO';
import { IPeriodItemDTO } from 'dtos/IPeriodItemDTO';
import { ParseContentService } from './ParseContentService';

export class RegisteTemplateService {
  #parseContentService: ParseContentService;

  #basePath: string;

  public constructor() {
    this.#parseContentService = new ParseContentService();
    this.#basePath = resolve(cwd(), 'src');
  }

  #formatPhoneNumber(phone: IAssertNumberDTO): string {
    if (phone.length === 13) {
      return phone.replace(/^(\d{2})(\d{2})(\d{5})(\d{4})$/, '+$1 ($2) $3-$4');
    }
    if (phone.length === 12) {
      return phone.replace(/^(\d{2})(\d{2})(\d{4})(\d{4})$/, '+$1 ($2) $3-$4');
    }
    if (phone.length === 11) {
      return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
    if (phone.length === 10) {
      return phone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }
    return phone;
  }

  #splitSkills(skills: Array<ISkillItemDTO>): {
    firstColumn: Array<ISkillItemDTO>;
    secondColumn: Array<ISkillItemDTO>;
    thirdColumn: Array<ISkillItemDTO>;
  } {
    return skills?.reduce<{
      firstColumn: Array<ISkillItemDTO>;
      secondColumn: Array<ISkillItemDTO>;
      thirdColumn: Array<ISkillItemDTO>;
    }>(
      (acc, item, index) => {
        if (index < 7) {
          acc.firstColumn.push(item);
        } else if (index < 14) {
          acc.secondColumn.push(item);
        } else {
          acc.thirdColumn.push(item);
        }
        return acc;
      },
      { firstColumn: [], secondColumn: [], thirdColumn: [] },
    );
  }

  #getImageBase64(path: string): string {
    const imageBase64 = readFileSync(path, 'base64');
    return `data:image/svg+xml;base64,${imageBase64}`;
  }

  #orderArrray(data: Array<IPeriodItemDTO>): void {
    data.sort((a, b) => {
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

  #formatPeriod(item: IPeriodItemDTO): string {
    const startDate = new Date(item.startsAt).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
    });

    if (item.currently || !item.endsAt) {
      return `${startDate} - até o momento`;
    }

    const endDate = new Date(item.endsAt).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
    });

    return `${startDate} - ${endDate}`;
  }

  #prepareItems(data: Array<IPeriodItemDTO>): Array<IPeriodItemDTO> {
    if (!data?.length) {
      return [];
    }

    this.#orderArrray(data);

    return data.map(item => ({
      ...item,
      period: this.#formatPeriod(item),
    }));
  }

  #registerIcons({ templateConfig }: IVariablesDTO): void {
    this.#parseContentService.parsePartial({
      name: 'diplomaIcon',
      file: resolve(this.#basePath, 'assets', 'images', 'diploma-icon.svg'),
      variables: templateConfig,
    });
    this.#parseContentService.parsePartial({
      name: 'envelopeIcon',
      file: resolve(this.#basePath, 'assets', 'images', 'envelope-icon.svg'),
      variables: templateConfig,
    });
    this.#parseContentService.parsePartial({
      name: 'githubIcon',
      file: resolve(this.#basePath, 'assets', 'images', 'github-icon.svg'),
      variables: templateConfig,
    });
    this.#parseContentService.parsePartial({
      name: 'institutionIcon',
      file: resolve(this.#basePath, 'assets', 'images', 'institution-icon.svg'),
    });
    this.#parseContentService.parsePartial({
      name: 'linkedinIcon',
      file: resolve(this.#basePath, 'assets', 'images', 'linkedin-icon.svg'),
      variables: templateConfig,
    });
    this.#parseContentService.parsePartial({
      name: 'locationIcon',
      file: resolve(this.#basePath, 'assets', 'images', 'location-icon.svg'),
      variables: templateConfig,
    });
    this.#parseContentService.parsePartial({
      name: 'pinIcon',
      file: resolve(this.#basePath, 'assets', 'images', 'pin-icon.svg'),
      variables: templateConfig,
    });
    this.#parseContentService.parsePartial({
      name: 'siteIcon',
      file: resolve(this.#basePath, 'assets', 'images', 'site-icon.svg'),
      variables: templateConfig,
    });
    this.#parseContentService.parsePartial({
      name: 'whatsappIcon',
      file: resolve(this.#basePath, 'assets', 'images', 'whatsapp-icon.svg'),
      variables: templateConfig,
    });
  }

  #registerCss({ templateConfig }: IVariablesDTO): void {
    this.#parseContentService.parsePartial({
      name: 'rootStyle',
      file: resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'root.hbs',
      ),
      variables: templateConfig,
    });
    this.#parseContentService.parsePartial({
      name: 'baseStyle',
      file: resolve(this.#basePath, 'resume', 'styles', 'styles.css'),
    });
    this.#parseContentService.parsePartial({
      name: 'resumeStyle',
      file: resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'resume.css',
      ),
    });
    this.#parseContentService.parsePartial({
      name: 'headerStyle',
      file: resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'header.css',
      ),
    });
    this.#parseContentService.parsePartial({
      name: 'aboutStyle',
      file: resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'about.css',
      ),
    });
    this.#parseContentService.parsePartial({
      name: 'skillsStyle',
      file: resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'skills.css',
      ),
    });
    this.#parseContentService.parsePartial({
      name: 'targetStyle',
      file: resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'target.css',
      ),
    });
    this.#parseContentService.parsePartial({
      name: 'graduationStyle',
      file: resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'graduation.css',
      ),
    });
    this.#parseContentService.parsePartial({
      name: 'specializationStyle',
      file: resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'specialization.css',
      ),
    });
    this.#parseContentService.parsePartial({
      name: 'projectsStyle',
      file: resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'projects.css',
      ),
    });
    this.#parseContentService.parsePartial({
      name: 'experienceStyle',
      file: resolve(
        this.#basePath,
        'resume',
        'styles',
        templateConfig.name,
        'experience.css',
      ),
    });
  }

  #registerHbs({
    aboutSection,
    experienceSection,
    graduationSection,
    headerSection,
    projectSection,
    skillSection,
    specializationSection,
    targetSection,
  }: IVariablesDTO): void {
    this.#parseContentService.parsePartial({
      name: 'contactSection',
      file: resolve(this.#basePath, 'resume', 'templates', 'contact.hbs'),
      variables: {
        ...headerSection.contact,
        whatsapp: {
          ...headerSection.contact.whatsapp,
          ...(headerSection?.contact?.whatsapp?.value && {
            value: this.#formatPhoneNumber(
              headerSection.contact.whatsapp.value,
            ),
            ref: headerSection.contact.whatsapp.value,
          }),
        },
      },
    });
    this.#parseContentService.parsePartial({
      name: 'headerSection',
      file: resolve(this.#basePath, 'resume', 'templates', 'header.hbs'),
      variables: headerSection,
    });
    this.#parseContentService.parsePartial({
      name: 'aboutSection',
      file: resolve(this.#basePath, 'resume', 'templates', 'about.hbs'),
      variables: aboutSection,
    });
    this.#parseContentService.parsePartial({
      name: 'targetSection',
      file: resolve(this.#basePath, 'resume', 'templates', 'target.hbs'),
      variables: targetSection,
    });
    this.#parseContentService.parsePartial({
      name: 'experienceSection',
      file: resolve(this.#basePath, 'resume', 'templates', 'experience.hbs'),
      variables: {
        experiences: this.#prepareItems(experienceSection.experiences),
      },
    });
    this.#parseContentService.parsePartial({
      name: 'graduationSection',
      file: resolve(this.#basePath, 'resume', 'templates', 'graduation.hbs'),
      variables: {
        graduations: this.#prepareItems(graduationSection.graduations),
      },
    });
    this.#parseContentService.parsePartial({
      name: 'specializationSection',
      file: resolve(
        this.#basePath,
        'resume',
        'templates',
        'specialization.hbs',
      ),
      variables: specializationSection,
    });
    this.#parseContentService.parsePartial({
      name: 'skillSection',
      file: resolve(this.#basePath, 'resume', 'templates', 'skills.hbs'),
      variables: skillSection.skills && {
        skills: this.#splitSkills(skillSection.skills),
      },
    });
    this.#parseContentService.parsePartial({
      name: 'projectSection',
      file: resolve(this.#basePath, 'resume', 'templates', 'projects.hbs'),
      variables: projectSection.projects && {
        projects: projectSection.projects.map(project => {
          return {
            ...project,
            ...(project.banner && {
              banner: this.#getImageBase64(project.banner),
            }),
          };
        }),
      },
    });
  }

  getContent(variables: IVariablesDTO): string {
    this.#registerIcons(variables);
    this.#registerCss(variables);
    this.#registerHbs(variables);

    return this.#parseContentService.parseTemplate({
      file: resolve(this.#basePath, 'resume', 'templates', 'index.hbs'),
      variables,
    });
  }
}
