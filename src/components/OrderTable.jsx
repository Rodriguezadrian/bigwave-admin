/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";

import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const data = [
  {
    id: 1,
    invoice: "INV-001",
    date: "2023-07-01",
    status: "Paid",
    customer: "John Doe",
    email: "john@example.com",
    avatar: "",
  },
  {
    id: 2,
    invoice: "INV-002",
    date: "2024-07-02",
    status: "Pending",
    customer: "Steve Hampton",
    email: "steve.hampton@example.com",
    avatar: "https://i.pravatar.cc/300?img=2",
    products: ["Product C", "Product D"],
  },
  {
    id: 3,
    invoice: "INV-003",
    date: "2023-07-03",
    status: "Cancelled",
    customer: "Bob Brown",
    email: "bob@example.com",
    avatar: "",
  },
];
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function OrderTable() {
  const [order, setOrder] = React.useState("desc");
  const [selected, setSelected] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => state.user);

  const [orders, setOrders] = useState();

  useEffect(() => {
    const getOrders = async () => {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/orders`,
        method: "get",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      setOrders(response.data);
    };
    getOrders();
  }, []);

  function RowMenu({ order }) {
  
    return (
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{
            root: { variant: "plain", color: "neutral", size: "sm" },
          }}
        >
          <MoreHorizRoundedIcon />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          <MenuItem>
            <NavLink to={`/orders/details/${order.id}`}>Editsss</NavLink>
          </MenuItem>
          <MenuItem>Rename</MenuItem>
          <MenuItem>Move</MenuItem>
          <Divider />
          <MenuItem color="danger">Delete</MenuItem>
        </Menu>
      </Dropdown>
    );
  }

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        >
          <Option value="paid">Paid</Option>
          <Option value="pending">Pending</Option>
          <Option value="refunded">Refunded</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Category</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="refund">Refund</Option>
          <Option value="purchase">Purchase</Option>
          <Option value="debit">Debit</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Customer</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="olivia">Olivia Rhye</Option>
          <Option value="steve">Steve Hampton</Option>
          <Option value="ciaran">Ciaran Murray</Option>
          <Option value="marina">Marina Macdonald</Option>
          <Option value="charles">Charles Fulton</Option>
          <Option value="jay">Jay Hoper</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );

  return (
    orders && (
      <React.Fragment>
        <Sheet
          className="SearchAndFilters-mobile"
          sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}
        >
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
            sx={{ flexGrow: 1 }}
          />
          <IconButton
            size="sm"
            variant="outlined"
            color="neutral"
            onClick={() => setOpen(true)}
          >
            <FilterAltIcon />
          </IconButton>
          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
              <ModalClose />
              <Typography id="filter-modal" level="h2">
                Filters
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {renderFilters()}
                <Button color="primary" onClick={() => setOpen(false)}>
                  Submit
                </Button>
              </Sheet>
            </ModalDialog>
          </Modal>
        </Sheet>
        <Box
          className="SearchAndFilters-tabletUp"
          sx={{
            borderRadius: "sm",
            py: 2,
            display: { xs: "none", sm: "flex" },
            flexWrap: "wrap",
            gap: 1.5,
            "& > *": {
              minWidth: { xs: "120px", md: "160px" },
            },
          }}
        >
          <FormControl sx={{ flex: 1 }} size="sm">
            <FormLabel>Search for order</FormLabel>
            <Input
              size="sm"
              placeholder="Search"
              startDecorator={<SearchIcon />}
            />
          </FormControl>
          {renderFilters()}
        </Box>
        <Sheet
          className="OrderTableContainer"
          variant="outlined"
          sx={{
            display: { xs: "none", sm: "initial" },
            width: "100%",
            borderRadius: "sm",
            flexShrink: 1,
            overflow: "auto",
            minHeight: 0,
          }}
        >
          <Table
            aria-labelledby="tableTitle"
            stickyHeader
            hoverRow
            sx={{
              "--TableCell-headBackground":
                "var(--joy-palette-background-level1)",
              "--Table-headerUnderlineThickness": "1px",
              "--TableRow-hoverBackground":
                "var(--joy-palette-background-level1)",
              "--TableCell-paddingY": "4px",
              "--TableCell-paddingX": "8px",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    width: 48,
                    textAlign: "center",
                    padding: "12px 6px",
                  }}
                >
                  <Checkbox
                    size="sm"
                    indeterminate={
                      selected.length > 0 && selected.length !== data.length
                    }
                    checked={selected.length === data.length}
                    onChange={(event) => {
                      setSelected(
                        event.target.checked ? data.map((row) => row.id) : []
                      );
                    }}
                    color={
                      selected.length > 0 || selected.length === data.length
                        ? "primary"
                        : undefined
                    }
                    sx={{ verticalAlign: "text-bottom" }}
                  />
                </th>
                <th style={{ width: 120, padding: "12px 6px" }}>
                  <Link
                    underline="none"
                    color="primary"
                    component="button"
                    onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                    endDecorator={<ArrowDropDownIcon />}
                    sx={[
                      {
                        fontWeight: "lg",
                        "& svg": {
                          transition: "0.2s",
                          transform:
                            order === "desc"
                              ? "rotate(0deg)"
                              : "rotate(180deg)",
                        },
                      },
                      order === "desc"
                        ? { "& svg": { transform: "rotate(0deg)" } }
                        : { "& svg": { transform: "rotate(180deg)" } },
                    ]}
                  >
                    Invoice
                  </Link>
                </th>
                <th style={{ width: 140, padding: "12px 6px" }}>Date</th>
                <th style={{ width: 140, padding: "12px 6px" }}>Status</th>
                <th style={{ width: 240, padding: "12px 6px" }}>Customer</th>
                <th style={{ width: 140, padding: "12px 6px" }}> </th>
              </tr>
            </thead>
            {/* ***********************aca se renderiza la tabla *********************************** */}
            <tbody>
              {orders.map((order) => {
                const isSelected = selected.indexOf(order.id) !== -1;
                return (
                  <tr key={order.id} aria-checked={isSelected} role="checkbox">
                    <td style={{ textAlign: "center" }}>
                      <Checkbox
                        size="sm"
                        checked={isSelected}
                        onChange={(event) => {
                          setSelected((prevSelected) =>
                            event.target.checked
                              ? [...prevSelected, order.id]
                              : prevSelected.filter((id) => id !== order.id)
                          );
                        }}
                        color={isSelected ? "primary" : undefined}
                        slotProps={{
                          checkbox: { sx: { verticalAlign: "text-bottom" } },
                        }}
                      />
                    </td>
                    <td>
                      <Link
                        component="button"
                        onClick={() =>
                          console.log(`Navigating to invoice ${order.id}`)
                        }
                      >
                        {order.id}
                      </Link>
                    </td>
                    <td>{order.updatedAt.slice(0, 10)}</td>
                    <td>
                      <Chip
                        variant="soft"
                        size="sm"
                        color={
                          order.status === "Paid"
                            ? "success"
                            : order.status === "Pending"
                            ? "warning"
                            : order.status === "Cancelled"
                            ? "danger"
                            : "neutral"
                        }
                        startDecorator={
                          order.status === "Paid" ? (
                            <CheckRoundedIcon />
                          ) : order.status === "Cancelled" ? (
                            <BlockIcon />
                          ) : (
                            <AutorenewRoundedIcon />
                          )
                        }
                      >
                        {order.status}
                      </Chip>
                    </td>
                    <td>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar size="sm" src={order.avatar} sx={{ mr: 2 }} />
                        <Box>
                          <Typography fontWeight="lg" level="body2">
                            {order.address}
                          </Typography>
                          <Typography
                            level="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            {order.email}
                          </Typography>
                        </Box>
                      </Box>
                    </td>
                    <td>
                      <RowMenu order={order} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Sheet>
      </React.Fragment>
    )
  );
}
