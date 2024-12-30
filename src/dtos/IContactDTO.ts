import { IAssertNumberDTO } from './IAssertNumberDTO';

export interface IContactDTO {
  whatsapp?: {
    value: IAssertNumberDTO;
  };
  github?: {
    value: string;
  };
  email?: {
    value: string;
  };
  address?: {
    value: string;
  };
  linkedin?: {
    value: string;
  };
  personal?: Array<{
    value: string;
    ref: string;
  }>;
}
