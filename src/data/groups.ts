import type { Group } from '../types';

export const groups: Group[] = [
  { code: 'A', name: 'A组', teamIds: ['usa', 'mexico', 'canada', 'costa-rica'] },
  { code: 'B', name: 'B组', teamIds: ['brazil', 'morocco', 'scotland', 'uzbekistan'] },
  { code: 'C', name: 'C组', teamIds: ['argentina', 'senegal', 'poland', 'saudi-arabia'] },
  { code: 'D', name: 'D组', teamIds: ['france', 'japan', 'ecuador', 'new-zealand'] },
  { code: 'E', name: 'E组', teamIds: ['england', 'croatia', 'tunisia', 'australia'] },
  { code: 'F', name: 'F组', teamIds: ['netherlands', 'germany', 'south-korea', 'jamaica'] },
  { code: 'G', name: 'G组', teamIds: ['spain', 'colombia', 'sweden', 'china-pr'] },
  { code: 'H', name: 'H组', teamIds: ['portugal', 'uruguay', 'egypt', 'honduras'] },
  { code: 'I', name: 'I组', teamIds: ['belgium', 'nigeria', 'wales', 'iraq'] },
  { code: 'J', name: 'J组', teamIds: ['italy', 'chile', 'cameroon', 'uae'] },
  { code: 'K', name: 'K组', teamIds: ['denmark', 'serbia', 'iran', 'panama'] },
  { code: 'L', name: 'L组', teamIds: ['switzerland', 'austria', 'ghana', 'paraguay'] },
];

export const groupsMap = new Map(groups.map((g) => [g.code, g]));
