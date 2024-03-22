export const rarityColor = (rarity: number) => {
  switch (rarity) {
    case 1:
      return 'border-blue-400';
    case 2:
      return 'border-yellow-400';
    case 3:
      return 'border-orange-600';
    case 4:
      return 'border-red-800';
    default:
      return 'border-blue-400';
  }
};
