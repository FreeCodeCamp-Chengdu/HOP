import '../styles/globals.less';

import { Icon } from 'idea-react';
import { HTTPError } from 'koajax';
import { configure } from 'mobx';
import { enableStaticRendering, observer } from 'mobx-react';
import App, { AppContext } from 'next/app';
import Head from 'next/head';
import { Col, Container, Image, Row } from 'react-bootstrap';

import { MainNavigation } from '../components/layout/MainNavigation';
import { isServer } from '../configuration';
import {
  createI18nStore,
  I18nContext,
  I18nProps,
  loadSSRLanguage,
} from '../models/Base/Translation';

configure({ enforceActions: 'never' });

enableStaticRendering(isServer());

@observer
export default class CustomApp extends App<I18nProps> {
  static async getInitialProps(context: AppContext) {
    return {
      ...(await App.getInitialProps(context)),
      ...(await loadSSRLanguage(context.ctx)),
    };
  }

  i18nStore = createI18nStore(this.props.language, this.props.languageMap);

  componentDidMount() {
    window.addEventListener('unhandledrejection', ({ reason }) => {
      const { message, response } = reason as HTTPError;
      const { statusText, body } = response || {};

      const tips = body?.message || statusText || message;

      if (tips) alert(tips);
    });
  }

  render() {
    const { Component, pageProps, router } = this.props,
      { t } = this.i18nStore;

    return (
      <I18nContext.Provider value={this.i18nStore}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <MainNavigation />

        <main className="app-shell pt-5 mt-4">
          <Component {...pageProps} />
        </main>

        {!/manage|admin/.test(router.pathname) && (
          <footer className="modern-footer text-white mt-5 py-5">
            <Container>
              <Row className="gy-4">
                <Col lg={5}>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <Image
                      className="rounded-3"
                      src="https://hackathon-api.static.kaiyuanshe.cn/static/logo.jpg"
                      alt="logo"
                      width={56}
                      height={56}
                    />
                    <div>
                      <div className="fw-semibold">{t('open_hackathon_platform')}</div>
                      <small className="text-white-50 d-block">{t('platform_tagline')}</small>
                    </div>
                  </div>
                  <p className="text-white-50 mb-4">{t('hero_subtitle')}</p>

                  <div className="d-flex gap-3">
                    <a
                      className="footer-icon"
                      href="https://github.com/FreeCodeCamp-Chengdu/HOP"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                    >
                      <i className="bi bi-github" />
                    </a>
                    <a
                      className="footer-icon"
                      href="https://monitor.fcc-cd.dev/status/service"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Status"
                    >
                      <Icon name="hdd-network" size={1.1} />
                    </a>
                    <a
                      className="footer-icon"
                      href="mailto:hackathon@kaiyuanshe.cn"
                      aria-label="Email"
                    >
                      <i className="bi bi-envelope" />
                    </a>
                  </div>
                </Col>

                <Col xs={6} md={4} lg={3}>
                  <h6 className="text-uppercase small text-white-50 mb-3">
                    {t('footer_links_resources')}
                  </h6>
                  <ul className="list-unstyled text-white-50">
                    <li className="mb-2">
                      <a className="footer-link" href="/activity/">
                        {t('all_activity')}
                      </a>
                    </li>
                    <li className="mb-2">
                      <a className="footer-link" href="/open-source">
                        {t('open_source_code')}
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        className="footer-link"
                        href="https://kaiyuanshe.feishu.cn/wiki/wikcnR3wHyfVDrYW2TteaUzAnlh"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t('get_started')}
                      </a>
                    </li>
                  </ul>
                </Col>

                <Col xs={6} md={4} lg={2}>
                  <h6 className="text-uppercase small text-white-50 mb-3">
                    {t('footer_links_actions')}
                  </h6>
                  <ul className="list-unstyled text-white-50">
                    <li className="mb-2">
                      <a className="footer-link" href="/activity/create">
                        {t('create_activity')}
                      </a>
                    </li>
                    <li className="mb-2">
                      <a className="footer-link" href="/activity/">
                        {t('register')}
                      </a>
                    </li>
                    <li className="mb-2">
                      <a className="footer-link" href="/activity/index">
                        {t('hackathons')}
                      </a>
                    </li>
                  </ul>
                </Col>

                <Col xs={12} md={4} lg={2}>
                  <h6 className="text-uppercase small text-white-50 mb-3">
                    {t('footer_links_connect')}
                  </h6>
                  <ul className="list-unstyled text-white-50">
                    <li className="mb-2">
                      <a className="footer-link" href="mailto:hackathon@kaiyuanshe.cn">
                        hackathon@kaiyuanshe.cn
                      </a>
                    </li>
                    <li className="mb-2">
                      <a className="footer-link" href="https://kaiyuanshe.feishu.cn/wiki/">
                        Feishu Wiki
                      </a>
                    </li>
                    <li>
                      <a
                        className="footer-link"
                        href="https://monitor.fcc-cd.dev/status/service"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Status
                      </a>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Container>
          </footer>
        )}
      </I18nContext.Provider>
    );
  }
}
