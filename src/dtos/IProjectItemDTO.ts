export interface IProjectItemDTO {
  title: string;
  description: string;
  banner?: string;
  link?: {
    ref: string;
    value: string;
  };
}
