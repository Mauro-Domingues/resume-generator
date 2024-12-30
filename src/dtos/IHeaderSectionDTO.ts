import { IContactDTO } from './IContactDTO';
import { IProfileDTO } from './IProfileDTO';

export interface IHeaderSectionDTO {
  header: IProfileDTO;
  contact: IContactDTO;
}
