export interface IGraduationItemDTO {
  title: string;
  institution: string;
  currently?: boolean;
  period?: string;
  description: string;
  startsAt: Date;
  endsAt?: Date;
}
