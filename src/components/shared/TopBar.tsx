'use client';

import { UserButton, SignedIn } from '@clerk/nextjs';

import Link from 'next/link';

function TopBar() {
  return (
    <ul className='list-unstyled topbar-menu float-end'>
      <SignedIn>
        <li className='notification-list'>
          <Link className='nav-link end-bar-toggle mt-3' href='#'>
            <UserButton afterSwitchSessionUrl='/' />
          </Link>
        </li>
      </SignedIn>
    </ul>
  );
}

export default TopBar;
