export const AppColors = ["success", "primary", "secondary", "favorite", "tertiary", "light", "paper", "medium", "dark", "clear", "warning", "danger"];
export const rogueColorToStyle = ({
  bg,
  text
}) => ({
  color: text,
  "--color": text,
  "--ion-color-primary": bg,
  "--placeholder-color": text
});