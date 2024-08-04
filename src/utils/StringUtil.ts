export const getUserFirstName = (name?: string) => {
  if (!name || name === "") {
    return "";
  }

  return name.split(" ").slice(0, 2).join(" ");
};
