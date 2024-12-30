export interface ISkillItemDTO {
  title: string;
  level:
    | 'basic'
    | 'basic-average'
    | 'average'
    | 'average-advanced'
    | 'advanced'
    | 'advanced-specialized'
    | 'specialized';
}
