import React from 'react';
import './NavTab.css';

function NavTab() {
  return (
        <nav className='navtab'>
          <ul className='navtab__list'>
            <a href='/' className='navtab__element' href='#aboutproject'>
              <li className='navtab__element'>О проекте </li>
            </a>
            <a href='/' className='navtab__element' href='#techs'>
              <li className='navtab__element'> Технологии </li>
            </a>
            <a href='/' className='navtab__element' href='#aboutme'>
              <li className='navtab__element'> Студент </li>
            </a>
          </ul>
        </nav>
  );
}

export default NavTab;