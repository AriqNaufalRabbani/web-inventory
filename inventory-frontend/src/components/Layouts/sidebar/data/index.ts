import { useEffect, useState } from "react";
import * as Icons from "../icons";

interface NavItem {
  title: string;
  url: string;
  icon?: React.ElementType;
  roles?: number[];
  items?: NavItem[];
}

interface NavSection {
  label: string;
  items: NavItem[];
}

interface CustomUser {
  fullname: string;
  email?: string;
  role?: number;
}

export const NAV_DATA: NavSection[] = [
  {
    label: "MAIN MENU",
    items: [
      { title: "Dashboard", icon: Icons.HomeIcon, url: "/dashboard", roles: [1,2,3], items: [] },
      { 
        title: "Master Data", url: "/", icon: Icons.Table, roles: [1,2], items: [
          { title: "Users", url: "/Master/Users" },
          { title: "Items", url: "/Master/Items" },
          { title: "Suppliers", url: "/Master/Suppliers" },
          { title: "Customers", url: "/Master/Customers" },
        ]
      },
      { 
        title: "Transaksi", url: "/", icon: Icons.Table, roles: [1,2,3], items: [
          { title: "Purchase Order (PO)", url: "/Transaksi/PO" },
          { title: "Good Receipt", url: "/Transaksi/GR" },
          { title: "Sales Order (SO)", url: "/Transaksi/SO" },
          { title: "Delivery", url: "/Transaksi/Delivery" },
        ]
      },
      { title: "Approvals", url: "/Approvals", icon: Icons.Table, roles: [1,2,3], items: [] },
      {
        title: "Reports", url: "/", icon: Icons.Table, roles: [1,2], items: [
          { title: "Laporan Stock", url: "/Report/Stock" },
          { title: "Laporan Stock Card", url: "/Report/StockCard" },
          { title: "Laporan Top 5 Produk Terjual", url: "/Report/TopProduk" },
          { title: "Laporan Aging Stock", url: "/Report/AgingStock" },
        ]
      }
    ]
  }
];



// Custom hook untuk filter menu sesuai role
export const useNavByRole = () => {
  const [nav, setNav] = useState<NavSection[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    try {
      const user: CustomUser = JSON.parse(storedUser);
      const USER_ROLE = user.role || 0;
      // console.log(USER_ROLE)

      const filterItems = (items: NavItem[]): NavItem[] =>
        items
          .filter(item => !item.roles || item.roles.includes(USER_ROLE))
          .map(item => ({
            ...item,
            items: item.items ? filterItems(item.items) : [],
          }));

      const filteredNav = NAV_DATA.map(section => ({
        ...section,
        items: filterItems(section.items),
      }));

      setNav(filteredNav);
    } catch (e) {
      console.error("Invalid user data in localStorage", e);
      localStorage.removeItem("user");
    }
  }, []);

  // console.log(nav)

  return nav;
};
