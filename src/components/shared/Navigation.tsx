'use client';

import { NAVIGATION } from '@/constants/navigation.constant';
import { SignedIn, SignOutButton } from '@clerk/nextjs';

import Link from 'next/link';

function Navigation() {
  return (
    <ul className='side-nav'>
      <li className='side-nav-title side-nav-item'>Navigation</li>
      {NAVIGATION.map((navigation, index) => (
        <li className='side-nav-item' key={`navigation-${index}`}>
          <Link href={navigation.route} className='side-nav-link'>
            <i className={navigation.icon}></i>
            <span>{navigation.label}</span>
          </Link>
        </li>
      ))}
      <SignedIn>
        <SignOutButton>
          <li className='side-nav-item'>
            <Link href='#' className='side-nav-link'>
              <i className='mdi mdi-logout'></i>
              <span>Sign Out</span>
            </Link>
          </li>
        </SignOutButton>
      </SignedIn>
    </ul>
  );
}

export default Navigation;
