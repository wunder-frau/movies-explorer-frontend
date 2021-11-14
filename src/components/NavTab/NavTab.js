import './NavTab.css'

function NavTab() {
  return (
        <div className='navtab'>
          <ul className='navtab__list'>
            <li className='navtab__element'>О проекте </li>
            <li className='navtab__element'> Технологии </li>
            <li className='navtab__element'> Студент </li>
          </ul>
        </div>
  );
}

export default NavTab;