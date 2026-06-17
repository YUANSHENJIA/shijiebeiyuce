import type { Team } from '@/types';

export const teams: Team[] = [
  // Group A
  { id: 'usa', name: '美国', nameEn: 'USA', flag: '🇺🇸', groupCode: 'A', fifaRank: 13, region: 'CONCACAF' },
  { id: 'mexico', name: '墨西哥', nameEn: 'Mexico', flag: '🇲🇽', groupCode: 'A', fifaRank: 15, region: 'CONCACAF' },
  { id: 'canada', name: '加拿大', nameEn: 'Canada', flag: '🇨🇦', groupCode: 'A', fifaRank: 47, region: 'CONCACAF' },
  { id: 'costa-rica', name: '哥斯达黎加', nameEn: 'Costa Rica', flag: '🇨🇷', groupCode: 'A', fifaRank: 52, region: 'CONCACAF' },
  // Group B
  { id: 'brazil', name: '巴西', nameEn: 'Brazil', flag: '🇧🇷', groupCode: 'B', fifaRank: 5, region: 'CONMEBOL' },
  { id: 'morocco', name: '摩洛哥', nameEn: 'Morocco', flag: '🇲🇦', groupCode: 'B', fifaRank: 14, region: 'CAF' },
  { id: 'scotland', name: '苏格兰', nameEn: 'Scotland', flag: '🏴', groupCode: 'B', fifaRank: 39, region: 'UEFA' },
  { id: 'uzbekistan', name: '乌兹别克斯坦', nameEn: 'Uzbekistan', flag: '🇺🇿', groupCode: 'B', fifaRank: 58, region: 'AFC' },
  // Group C
  { id: 'argentina', name: '阿根廷', nameEn: 'Argentina', flag: '🇦🇷', groupCode: 'C', fifaRank: 1, region: 'CONMEBOL' },
  { id: 'senegal', name: '塞内加尔', nameEn: 'Senegal', flag: '🇸🇳', groupCode: 'C', fifaRank: 17, region: 'CAF' },
  { id: 'poland', name: '波兰', nameEn: 'Poland', flag: '🇵🇱', groupCode: 'C', fifaRank: 28, region: 'UEFA' },
  { id: 'saudi-arabia', name: '沙特阿拉伯', nameEn: 'Saudi Arabia', flag: '🇸🇦', groupCode: 'C', fifaRank: 53, region: 'AFC' },
  // Group D
  { id: 'france', name: '法国', nameEn: 'France', flag: '🇫🇷', groupCode: 'D', fifaRank: 2, region: 'UEFA' },
  { id: 'japan', name: '日本', nameEn: 'Japan', flag: '🇯🇵', groupCode: 'D', fifaRank: 18, region: 'AFC' },
  { id: 'ecuador', name: '厄瓜多尔', nameEn: 'Ecuador', flag: '🇪🇨', groupCode: 'D', fifaRank: 30, region: 'CONMEBOL' },
  { id: 'new-zealand', name: '新西兰', nameEn: 'New Zealand', flag: '🇳🇿', groupCode: 'D', fifaRank: 95, region: 'OFC' },
  // Group E
  { id: 'england', name: '英格兰', nameEn: 'England', flag: '🏴', groupCode: 'E', fifaRank: 4, region: 'UEFA' },
  { id: 'croatia', name: '克罗地亚', nameEn: 'Croatia', flag: '🇭🇷', groupCode: 'E', fifaRank: 10, region: 'UEFA' },
  { id: 'tunisia', name: '突尼斯', nameEn: 'Tunisia', flag: '🇹🇳', groupCode: 'E', fifaRank: 35, region: 'CAF' },
  { id: 'australia', name: '澳大利亚', nameEn: 'Australia', flag: '🇦🇺', groupCode: 'E', fifaRank: 25, region: 'AFC' },
  // Group F
  { id: 'netherlands', name: '荷兰', nameEn: 'Netherlands', flag: '🇳🇱', groupCode: 'F', fifaRank: 7, region: 'UEFA' },
  { id: 'germany', name: '德国', nameEn: 'Germany', flag: '🇩🇪', groupCode: 'F', fifaRank: 16, region: 'UEFA' },
  { id: 'south-korea', name: '韩国', nameEn: 'South Korea', flag: '🇰🇷', groupCode: 'F', fifaRank: 23, region: 'AFC' },
  { id: 'jamaica', name: '牙买加', nameEn: 'Jamaica', flag: '🇯🇲', groupCode: 'F', fifaRank: 55, region: 'CONCACAF' },
  // Group G
  { id: 'spain', name: '西班牙', nameEn: 'Spain', flag: '🇪🇸', groupCode: 'G', fifaRank: 8, region: 'UEFA' },
  { id: 'colombia', name: '哥伦比亚', nameEn: 'Colombia', flag: '🇨🇴', groupCode: 'G', fifaRank: 12, region: 'CONMEBOL' },
  { id: 'sweden', name: '瑞典', nameEn: 'Sweden', flag: '🇸🇪', groupCode: 'G', fifaRank: 26, region: 'UEFA' },
  { id: 'china-pr', name: '中国', nameEn: 'China PR', flag: '🇨🇳', groupCode: 'G', fifaRank: 80, region: 'AFC' },
  // Group H
  { id: 'portugal', name: '葡萄牙', nameEn: 'Portugal', flag: '🇵🇹', groupCode: 'H', fifaRank: 6, region: 'UEFA' },
  { id: 'uruguay', name: '乌拉圭', nameEn: 'Uruguay', flag: '🇺🇾', groupCode: 'H', fifaRank: 11, region: 'CONMEBOL' },
  { id: 'egypt', name: '埃及', nameEn: 'Egypt', flag: '🇪🇬', groupCode: 'H', fifaRank: 37, region: 'CAF' },
  { id: 'honduras', name: '洪都拉斯', nameEn: 'Honduras', flag: '🇭🇳', groupCode: 'H', fifaRank: 70, region: 'CONCACAF' },
  // Group I
  { id: 'belgium', name: '比利时', nameEn: 'Belgium', flag: '🇧🇪', groupCode: 'I', fifaRank: 3, region: 'UEFA' },
  { id: 'nigeria', name: '尼日利亚', nameEn: 'Nigeria', flag: '🇳🇬', groupCode: 'I', fifaRank: 36, region: 'CAF' },
  { id: 'wales', name: '威尔士', nameEn: 'Wales', flag: '🏴', groupCode: 'I', fifaRank: 29, region: 'UEFA' },
  { id: 'iraq', name: '伊拉克', nameEn: 'Iraq', flag: '🇮🇶', groupCode: 'I', fifaRank: 68, region: 'AFC' },
  // Group J
  { id: 'italy', name: '意大利', nameEn: 'Italy', flag: '🇮🇹', groupCode: 'J', fifaRank: 9, region: 'UEFA' },
  { id: 'chile', name: '智利', nameEn: 'Chile', flag: '🇨🇱', groupCode: 'J', fifaRank: 40, region: 'CONMEBOL' },
  { id: 'cameroon', name: '喀麦隆', nameEn: 'Cameroon', flag: '🇨🇲', groupCode: 'J', fifaRank: 43, region: 'CAF' },
  { id: 'uae', name: '阿联酋', nameEn: 'UAE', flag: '🇦🇪', groupCode: 'J', fifaRank: 64, region: 'AFC' },
  // Group K
  { id: 'denmark', name: '丹麦', nameEn: 'Denmark', flag: '🇩🇰', groupCode: 'K', fifaRank: 21, region: 'UEFA' },
  { id: 'serbia', name: '塞尔维亚', nameEn: 'Serbia', flag: '🇷🇸', groupCode: 'K', fifaRank: 33, region: 'UEFA' },
  { id: 'iran', name: '伊朗', nameEn: 'Iran', flag: '🇮🇷', groupCode: 'K', fifaRank: 20, region: 'AFC' },
  { id: 'panama', name: '巴拿马', nameEn: 'Panama', flag: '🇵🇦', groupCode: 'K', fifaRank: 47, region: 'CONCACAF' },
  // Group L
  { id: 'switzerland', name: '瑞士', nameEn: 'Switzerland', flag: '🇨🇭', groupCode: 'L', fifaRank: 19, region: 'UEFA' },
  { id: 'austria', name: '奥地利', nameEn: 'Austria', flag: '🇦🇹', groupCode: 'L', fifaRank: 22, region: 'UEFA' },
  { id: 'ghana', name: '加纳', nameEn: 'Ghana', flag: '🇬🇭', groupCode: 'L', fifaRank: 50, region: 'CAF' },
  { id: 'paraguay', name: '巴拉圭', nameEn: 'Paraguay', flag: '🇵🇾', groupCode: 'L', fifaRank: 55, region: 'CONMEBOL' },
];

export const teamsMap = new Map(teams.map((t) => [t.id, t]));
