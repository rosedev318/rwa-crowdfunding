"use client";

import { useRouter } from 'next/router';
import { Avatar, Dropdown, Navbar, DarkThemeToggle } from "flowbite-react";

import { useAuth } from "@/hooks/useAuth";

interface NavigationItem {
  name: string;
  href: string;
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/' },
  { name: 'Properties', href: '/properties' },
  { name: 'Governance', href: '/governance' },
];

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <Navbar className='border-b'>
      <Navbar.Brand href="/">
        <img src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">RWA Crowdfunding</span>
      </Navbar.Brand>
      <div className="flex gap-4 md:order-2">
        <DarkThemeToggle />
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{user?.username}</span>
            <span className="block truncate text-sm font-medium">{user?.email}</span>
          </Dropdown.Header>
          <Dropdown.Item href='/profile'>Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {navigation.map((item) =>
          <Navbar.Link
            key={item.name}
            href={item.href}
            active={router.pathname == item.href ? true : false}
          >
            {item.name}
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header