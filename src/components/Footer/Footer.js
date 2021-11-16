import './Footer.css'

function Footer() {
  return (
        <footer className='footer'>
          <div className='footer__wraper'>
            <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className='footer__copyright-wraper'>
              <div className='footer__copyright-year '>© 2021</div>
              <div className='footer__copyright-links'>
                <ul className='footer__profiles-list'>
                <a href='/' className='footer__profiles-item'>
                  <li>Яндекс.Практикум</li>
                </a>
                <a href='/' className='footer__profiles-item'>
                  <li>Github</li>
                </a>
                <a href='/' className='footer__profiles-item'>
                  <li className='footer__profiles-item'>Facebook</li>
                </a>
              </ul>
              </div>
            </div>
          </div>
        </footer>
  );
}

export default Footer;