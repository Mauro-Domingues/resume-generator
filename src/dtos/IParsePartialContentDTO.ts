export interface IParsePartialContentDTO {
  name:
    | 'contactSection'
    | 'headerSection'
    | 'aboutSection'
    | 'targetSection'
    | 'experienceSection'
    | 'graduationSection'
    | 'specializationSection'
    | 'skillSection'
    | 'projectSection'
    | 'rootStyle'
    | 'baseStyle'
    | 'resumeStyle'
    | 'headerStyle'
    | 'aboutStyle'
    | 'skillsStyle'
    | 'targetStyle'
    | 'graduationStyle'
    | 'specializationStyle'
    | 'projectsStyle'
    | 'experienceStyle'
    | 'diplomaIcon'
    | 'envelopeIcon'
    | 'githubIcon'
    | 'institutionIcon'
    | 'linkedinIcon'
    | 'locationIcon'
    | 'pinIcon'
    | 'siteIcon'
    | 'whatsappIcon';
  file: string;
  variables?: unknown;
}
