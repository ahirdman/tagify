export const randomizeTagColor = (): string => {
  const randomNumber = Math.floor(Math.random() * 7);

  switch (randomNumber) {
    case 0:
      return '#573D57';
    case 1:
      return '#874756';
    case 2:
      return '#B8433E';
    case 3:
      return '#DD542F';
    case 4:
      return '#F5823F';
    case 5:
      return '#F6A943';
    default:
      return '#FBD566';
  }
};

export const linearGradient = (color1: string, color2: string) =>
  `linear-gradient(to bottom right, ${color1}, ${color2})`;
