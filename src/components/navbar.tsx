"use client";

import React, { useState, type Key } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

interface MenuItem {
  id: Key;
  title: String;
  route: String;
}

const NavBar = () => {
  const menuItems: MenuItem[] = [
    {
      id: 1,
      title: "Home",
      route: "#home",
    },
    {
      id: 2,
      title: "About Me",
      route: "#profile",
    },
    {
      id: 3,
      title: "Services",
      route: "#tools",
    },
    {
      id: 4,
      title: "Portfolio",
      route: "#portfolio",
    },
    {
      id: 5,
      title: "Post",
      route: "#",
    },
  ];

  const [showDrawer, setShowDrawer] = useState(false);
  function drawerButtonClick() {
    setShowDrawer(!showDrawer);
  }

  return (
    <div className="bg-background sticky top-0 z-50 px-5 py-3">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <Link href={"#"}>
          <h1 className="text-primary text-2xl font-bold">Anjar.Hariadi</h1>
        </Link>
        <div
          className={`bg-background fixed flex h-screen w-[70%] flex-col items-center justify-center gap-4 p-4 shadow-md lg:static lg:h-fit lg:w-max lg:flex-row lg:shadow-none ${
            showDrawer ? "left-0" : "left-[-100%]"
          } top-0 transition-all`}
        >
          <ul className="flex flex-col gap-4 lg:flex-row">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link href={`${item.route}`} className="hover:text-hprimary">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={"#contact"} className={buttonVariants()}>
            Contact Me
          </Link>
          <ModeToggle />
        </div>
        <button className="block p-3 lg:hidden" onClick={drawerButtonClick}>
          <Menu />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
