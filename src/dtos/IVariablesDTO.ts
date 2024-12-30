import { IAboutSectionDTO } from './IAboutSectionDTO';
import { IExperienceSectionDTO } from './IExperienceSectionDTO';
import { IGraduationSectionDTO } from './IGraduationSectionDTO';
import { IHeaderSectionDTO } from './IHeaderSectionDTO';
import { IProjectSectionDTO } from './IProjectSectionDTO';
import { ISkillSectionDTO } from './ISkillSectionDTO';
import { ISpecializationSectionDTO } from './ISpecializationSectionDTO';
import { ITargetSectionDTO } from './ITargetSectionDTO';
import { ITemplateConfigDTO } from './ITemplateConfigDTO';

export interface IVariablesDTO {
  templateConfig: ITemplateConfigDTO;
  headerSection: IHeaderSectionDTO;
  aboutSection: IAboutSectionDTO;
  skillSection: ISkillSectionDTO;
  targetSection: ITargetSectionDTO;
  graduationSection: IGraduationSectionDTO;
  specializationSection: ISpecializationSectionDTO;
  projectSection: IProjectSectionDTO;
  experienceSection: IExperienceSectionDTO;
}
