import { User } from '@freecodecamp-chengdu/hop-service';
import classNames from 'classnames';
import { Icon } from 'idea-react';
import { observer } from 'mobx-react';
import dynamic from 'next/dynamic';
import { cache, compose, errorLogger } from 'next-ssr-middleware';
import { FC, useContext } from 'react';
import { Badge, Card, Col, Container, Image, Nav, Row, Tab } from 'react-bootstrap';

import { PageHead } from '../../components/layout/PageHead';
import { I18nContext } from '../../models/Base/Translation';
import userStore from '../../models/User';
import styles from './[id].module.less';

const ActivityList = dynamic(() => import('../../components/Activity/ActivityList'), {
  ssr: false,
});

export const getServerSideProps = compose<{ id?: string }, User>(
  cache(),
  errorLogger,
  async ({ params: { id = '' } = {} }) =>
    JSON.parse(JSON.stringify({ props: await userStore.getOne(id) })),
);

const UserDetailPage: FC<User> = observer(({ id, name, avatar, email }) => {
  const { t } = useContext(I18nContext);

  return (
    <>
      <PageHead title={name || t('profile')} />

      <section className={classNames(styles['hero-section'], 'text-white text-center')}>
        <Container>
          <Badge bg="light" text="dark" className="text-uppercase mb-3">
            {t('hacker_pavilion')}
          </Badge>
          <h1 className="display-6 fw-semibold">{name || t('mystery_hacker')}</h1>
          {email && <p className="text-white-50 mb-0">{email}</p>}
        </Container>
      </section>

      <Container className="pb-5" style={{ marginTop: '-4rem' }}>
        <Row className="g-4">
          <Col lg={4} xl={3}>
            <div className="text-center mb-3">
              {avatar ? (
                <Image
                  src={avatar}
                  alt={name || 'avatar'}
                  roundedCircle
                  width={120}
                  height={120}
                  className="border border-4 border-white shadow"
                />
              ) : (
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center border border-4 border-white shadow"
                  style={{
                    width: 120,
                    height: 120,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  <Icon name="person" size={3} className="text-white" />
                </div>
              )}
            </div>

            <Card className="border-0 shadow-lg rounded-4 text-center">
              <Card.Body className="p-4">
                <h4 className="fw-semibold mb-1">{name || t('mystery_hacker')}</h4>
                {email && <p className="text-muted small mb-3">{email}</p>}

                <div className="d-flex justify-content-center gap-2">
                  <a
                    href={`https://github.com/${name}`}
                    target="_blank"
                    rel="noreferrer"
                    className={classNames(
                      styles['social-btn'],
                      styles.active,
                      'd-flex align-items-center justify-content-center rounded-2',
                    )}
                    style={{ width: 40, height: 40 }}
                    title="GitHub"
                  >
                    <Icon name="github" />
                  </a>
                  <span
                    className={classNames(
                      styles['social-btn'],
                      'd-flex align-items-center justify-content-center rounded-2',
                    )}
                    style={{ width: 40, height: 40 }}
                    title="QQ"
                  >
                    <Icon name="chat-dots" />
                  </span>
                  <span
                    className={classNames(
                      styles['social-btn'],
                      'd-flex align-items-center justify-content-center rounded-2',
                    )}
                    style={{ width: 40, height: 40 }}
                    title="WeChat"
                  >
                    <Icon name="wechat" />
                  </span>
                  <span
                    className={classNames(
                      styles['social-btn'],
                      'd-flex align-items-center justify-content-center rounded-2',
                    )}
                    style={{ width: 40, height: 40 }}
                    title="Weibo"
                  >
                    <Icon name="broadcast" />
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8} xl={9}>
            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body className="p-4">
                <Tab.Container defaultActiveKey="enrolled">
                  <Nav className={styles['custom-tabs']}>
                    <Nav.Item>
                      <Nav.Link eventKey="enrolled">
                        <Icon name="calendar-check" className="me-2" />
                        {t('followed_hackathons')}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="created">
                        <Icon name="plus-circle" className="me-2" />
                        {t('owned_hackathons')}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="admin">
                        <Icon name="people" className="me-2" />
                        {t('joined_hackathons')}
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content>
                    <Tab.Pane eventKey="enrolled">
                      <ActivityList type="enrolled" userId={id} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="created">
                      <ActivityList type="created" userId={id} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="admin">
                      <ActivityList type="admin" userId={id} />
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
});

export default UserDetailPage;
