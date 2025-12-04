import classNames from 'classnames';
import { observer } from 'mobx-react';
import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';

import { I18nContext } from '../../models/Base/Translation';
import styles from './MainNavigation.module.less';

const UserBar = dynamic(() => import('../User/UserBar'), { ssr: false });

export const MainNavigation = observer(() => {
  const { t } = useContext(I18nContext);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar
      fixed="top"
      expand="lg"
      collapseOnSelect
      className={classNames(styles['glass-nav'], 'py-3', isScrolled && styles.scrolled)}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center gap-3 text-white">
          <Image
            className={classNames('align-top', styles.logo)}
            src="https://hackathon-api.static.kaiyuanshe.cn/static/logo.jpg"
            alt="logo"
          />
          <div className="fw-semibold">{t('open_hackathon_platform')}</div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-inner" />

        <Navbar.Collapse id="navbar-inner">
          <div className="w-100 d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-lg-between gap-4">
            <Nav className="me-lg-auto w-100 w-lg-auto text-uppercase small fw-semibold d-flex flex-row flex-wrap align-items-center gap-3">
              <Nav.Link className="text-white-50 text-nowrap" href="/activity/">
                {t('all_activity')}
              </Nav.Link>
              <Nav.Link
                className="text-white-50 text-nowrap"
                target="_blank"
                href="https://kaiyuanshe.feishu.cn/wiki/wikcnR3wHyfVDrYW2TteaUzAnlh"
              >
                {t('get_started')}
              </Nav.Link>
            </Nav>

            <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-3 w-100 justify-content-sm-end ms-lg-auto justify-content-lg-end">
              <UserBar />
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});
