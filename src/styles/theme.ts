import { createTheme } from "@mui/material";

/**
 * Values from default theme to use in custom theme
 */
const { breakpoints, spacing } = createTheme();

/**
 * Custom theme for Material UI
 */
export default createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00aa46",
      light: "#46dc78",
      dark: "#007841",
    },
    secondary: {
      main: "#006e87",
    },
    error: {
      main: "#b70000",
    },
    warning: {
      main: "#ffa200",
    },
    success: {
      main: "#00aa46",
      dark: "#007841",
      light: "#46dc78",
    },
    divider: "#dadcde",
    background: {
      default: "#eff0f1",
    },
    text: {
      primary: "#4b5055",
      secondary: "#4B5055",
      disabled: "#7d8287",
    },
    info: {
      main: "#006e87",
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: "SBonusText-Regular",
    h1: {
      fontFamily: "SBonusDisplay-Black"
    },
    h2: {
      fontFamily: "SBonusDisplay-Black"
    },
    h3: {},
    h4: {},
    h5: {},
    h6: {
      fontFamily: "SBonusText-Bold"
    },
    button: {
      fontFamily: "SBonusText-Bold",
      textTransform: "inherit"
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".App": {
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw"
        },
        a: {
          textDecoration: "none"
        }
      }
    },
    MuiAppBar: {
      defaultProps: {
        color: "inherit"
      },
      styleOverrides: {
        root: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: spacing(4)
        },
        colorInherit: {
          backgroundColor: "#fff"
        },
      },
    },
    MuiSwitch: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          margin: 8
        },
        switchBase: {
          padding: 1,
          "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + $track": {
              opacity: 1,
              border: "none"
            },
          },
        },
        thumb: {
          width: 24,
          height: 24
        },
        track: {
          borderRadius: 13,
          border: "1px solid #bdbdbd",
          backgroundColor: "#fafafa",
          opacity: 1,
          transition: "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff"
        }
      }
    },
    MuiList: {
      defaultProps: {
        dense: true,
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #EFF0F1"
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          flex: 1
        },
        primary: {
          fontWeight: "bold"
        }
      }
    },
    MuiMenuItem: {
      defaultProps: {
        dense: true,
      }
    },
    MuiTable: {
      defaultProps: {
        size: "small"
      }
    },
    MuiButton: {
      defaultProps: {
        size: "small"
      }
    },
    MuiButtonGroup: {
      defaultProps: {
        size: "small"
      }
    },
    MuiCheckbox: {
      defaultProps: {
        size: "small"
      }
    },
    MuiFab: {
      defaultProps: {
        size: "small"
      }
    },
    MuiFormControl: {
      defaultProps: {
        margin: "dense",
        size: "small"
      }
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: "dense"
      }
    },
    MuiIconButton: {
      defaultProps: {
        size: "small"
      }
    },
    MuiInputBase: {
      defaultProps: {
        margin: "dense"
      }
    },
    MuiInputLabel: {
      defaultProps: {
        margin: "dense"
      }
    },
    MuiRadio: {
      defaultProps: {
        size: "small"
      }
    },
    MuiTextField: {
      defaultProps: {
        margin: "dense",
        size: "small",
      }
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true
      }
    },
  },
});