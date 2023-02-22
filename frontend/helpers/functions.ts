export const capitalize = (word: string): string => {
  return (
    word.slice(0, 1).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase()
  );
};

export function emailValidation(email: string): boolean {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}