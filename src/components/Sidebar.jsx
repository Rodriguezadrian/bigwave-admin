import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import { IconButton } from "@mui/joy";
import Input from "@mui/joy/Input";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ColorSchemeToggle from "./ColorSchemeToggle";
import { closeSidebar } from "../utils";
import { LoginOutlined } from "@mui/icons-material";
import { logout } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

function Toggler({ defaultExpanded = false, renderToggle, children }) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={[
          {
            display: "grid",
            transition: "0.2s ease",
            "& > *": {
              overflow: "hidden",
            },
          },
          open ? { gridTemplateRows: "1fr" } : { gridTemplateRows: "0fr" },
        ]}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      dispatch(logout());
      toast.info("you logged out");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <Sheet
        className="Sidebar"
        sx={{
          position: { xs: "fixed", md: "sticky" },
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
            md: "none",
          },
          transition: "transform 0.4s, width 0.4s",
          zIndex: 10000,
          height: "100dvh",
          width: "var(--Sidebar-width)",
          top: 0,
          p: 2,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        <GlobalStyles
          styles={(theme) => ({
            ":root": {
              "--Sidebar-width": "220px",
              [theme.breakpoints.up("lg")]: {
                "--Sidebar-width": "240px",
              },
            },
          })}
        />
        <Box
          className="Sidebar-overlay"
          sx={{
            position: "fixed",
            zIndex: 9998,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            opacity: "var(--SideNavigation-slideIn)",
            backgroundColor: "var(--joy-palette-background-backdrop)",
            transition: "opacity 0.4s",
            transform: {
              xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
              lg: "translateX(-100%)",
            },
          }}
          onClick={() => closeSidebar()}
        />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Link to={"/"}>
            <IconButton variant="soft" color="primary" size="sm">
              <BrightnessAutoRoundedIcon />
            </IconButton>
          </Link>
          <Typography level="title-lg">BigWave</Typography>
          <ColorSchemeToggle sx={{ ml: "auto" }} />
        </Box>
        <Input
          size="sm"
          startDecorator={<SearchRoundedIcon />}
          placeholder="Search"
        />
        <Box
          sx={{
            minHeight: 0,
            overflow: "hidden auto",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            [`& .${listItemButtonClasses.root}`]: {
              gap: 1.5,
            },
          }}
        >
          <List
            size="sm"
            sx={{
              gap: 1,
              "--List-nestedInsetStart": "30px",
              "--ListItem-radius": (theme) => theme.vars.radius.sm,
            }}
          >
          
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to={"/"}
            >
              <ListItem>
                <ListItemButton>
                  <DashboardRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Dashboard</Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to={"/orders"}
              style={{ color: "black", textDecoration: "none" }}
            >
              <ListItem>
                <ListItemButton>
                  <ShoppingCartRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Orders</Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
            </Link>

            <ListItem nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton onClick={() => setOpen(!open)}>
                    <AssignmentRoundedIcon />
                    <ListItemContent>
                      <Typography level="title-sm">Edit Store </Typography>
                    </ListItemContent>
                    <KeyboardArrowDownIcon
                      sx={[
                        open
                          ? {
                              transform: "rotate(180deg)",
                            }
                          : {
                              transform: "none",
                            },
                      ]}
                    />
                  </ListItemButton>
                )}
              >
                <List sx={{ gap: 0.5 }}>
                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    to={"/categories"}
                  >
                    <ListItem sx={{ mt: 0.5 }}>
                      <ListItemButton>Categories</ListItemButton>
                    </ListItem>
                  </Link>

                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    to={"/products"}
                  >
                    <ListItem>
                      <ListItemButton> Products</ListItemButton>
                    </ListItem>
                  </Link>
                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    to={"/images"}
                  >
                    <ListItem>
                      <ListItemButton> Images</ListItemButton>
                    </ListItem>
                  </Link>
                </List>
              </Toggler>
            </ListItem>

            {/* <ListItem nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton onClick={() => setOpen(!open)}>
                    <AssignmentRoundedIcon />
                    <ListItemContent>
                      <Typography level="title-sm">Tasks</Typography>
                    </ListItemContent>
                    <KeyboardArrowDownIcon
                      sx={[
                        open
                          ? {
                              transform: "rotate(180deg)",
                            }
                          : {
                              transform: "none",
                            },
                      ]}
                    />
                  </ListItemButton>
                )}
              >
                <List sx={{ gap: 0.5 }}>
                  <ListItem sx={{ mt: 0.5 }}>
                    <ListItemButton>All tasks</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>Backlog</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>In progress</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>Done</ListItemButton>
                  </ListItem>
                </List>
              </Toggler>
            </ListItem> */}
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to={"/messages"}
            >
              <ListItem>
                <ListItemButton role="menuitem">
                  <QuestionAnswerRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Messages</Typography>
                  </ListItemContent>
                  <Chip size="sm" color="primary" variant="solid">
                    4
                  </Chip>
                </ListItemButton>
              </ListItem>
            </Link>

            <ListItem nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton onClick={() => setOpen(!open)}>
                    <GroupRoundedIcon />
                    <ListItemContent>
                      <Typography level="title-sm">
                        <Link
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          Users
                        </Link>
                      </Typography>
                    </ListItemContent>
                    <KeyboardArrowDownIcon
                      sx={[
                        open
                          ? {
                              transform: "rotate(180deg)",
                            }
                          : {
                              transform: "none",
                            },
                      ]}
                    />
                  </ListItemButton>
                )}
              >
                <List sx={{ gap: 0.5 }}>
                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    to={"/users"}
                  >
                    <ListItem sx={{ mt: 0.5 }}>
                      <ListItemButton role="menuitem">All users</ListItemButton>
                    </ListItem>
                  </Link>
                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    to={"/profile"}
                  >
                    <ListItem sx={{ mt: 0.5 }}>
                      <ListItemButton role="menuitem">
                        My Profile
                      </ListItemButton>
                    </ListItem>
                  </Link>

                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    to={"/create-user"}
                  >
                    <ListItem>
                      <ListItemButton>Create a new user</ListItemButton>
                    </ListItem>
                  </Link>

                  <Link
                    to={"/update-user"}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <ListItem>
                      <ListItemButton>Update user</ListItemButton>
                    </ListItem>
                  </Link>
                </List>
              </Toggler>
            </ListItem>
          </List>
          <List
            size="sm"
            sx={{
              mt: "auto",
              flexGrow: 0,
              "--ListItem-minHeight": "32px",
            }}
          >
            <ListItem>
              <ListItemButton>
                <SupportRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Support</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
            {user.token ? (
              <ListItem>
                <ListItemButton>
                  <LogoutRoundedIcon />
                  <ListItemContent>
                    <Typography onClick={handleLogout} level="title-sm">
                      Log out
                    </Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem>
                <ListItemButton>
                  <LoginOutlined />
                  <ListItemContent>
                    <Typography level="title-sm">
                      <Link
                        style={{ color: "black", textDecoration: "none" }}
                        to={"/login"}
                      >
                        Login
                      </Link>
                    </Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
        <Card
          variant="soft"
          color="primary"
          invertedColors
          sx={{
            bgcolor: "background.level1",
            boxShadow: "none",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            flexGrow: 0,
          }}
        >
          <Typography level="body2">Need Help?</Typography>
          <Typography level="body2" fontWeight="lg">
            Please check our docs.
          </Typography>
        </Card>
      </Sheet>
    </>
  );
}
