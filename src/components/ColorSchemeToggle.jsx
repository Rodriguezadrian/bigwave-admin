import * as React from "react";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function ColorSchemeToggle(props) {
  const { onClick, sx, ...other } = props;
  const theme = useTheme();
  const mode = theme.palette.mode;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <IconButton
        size="small"
        variant="outlined"
        color="neutral"
        {...other}
        sx={sx}
        disabled
      />
    );
  }

  return (
    <IconButton
      id="toggle-mode"
      size="small"
      variant="outlined"
      color="neutral"
      {...other}
      onClick={(event) => {
        theme.palette.mode === "light"
          ? (theme.palette.mode = "dark")
          : (theme.palette.mode = "light");
        onClick?.(event);
      }}
      sx={[
        mode === "dark"
          ? { "& > *:first-of-type": { display: "none" } }
          : { "& > *:first-of-type": { display: "initial" } },
        mode === "light"
          ? { "& > *:last-of-type": { display: "none" } }
          : { "& > *:last-of-type": { display: "initial" } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {mode === "dark" ? <DarkModeRoundedIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
