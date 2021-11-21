import './NavTab.css'

function NavTab() {
  return (
        <div className='navtab'>
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
        </div>
  );
}

export default NavTab;