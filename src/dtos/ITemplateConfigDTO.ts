import { IHEXColorDTO } from './IHEXColorDTO';

export interface ITemplateConfigDTO {
  name: 'default';
  monochrome: boolean;
  fontColor: IHEXColorDTO;
  fontSize: number;
}
