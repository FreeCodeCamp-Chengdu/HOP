import { User } from '@freecodecamp-chengdu/hop-service';
import classNames from 'classnames';
import { Icon } from 'idea-react';
import { observer } from 'mobx-react';
import dynamic from 'next/dynamic';
import { cache, compose, errorLogger } from 'next-ssr-middleware';
import { FC, useContext, useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Container, Image, Nav, Row, Tab } from 'react-bootstrap';

import { PageHead } from '../../components/layout/PageHead';
import { I18nContext } from '../../models/Base/Translation';
import sessionStore from '../../models/User/Session';
import userStore from '../../models/User';
import styles from './[id].module.less';

const ActivityList = dynamic(() => import('../../components/Activity/ActivityList'), {
  ssr: false,
});

type PublicUser = Omit<User, 'email' | 'mobilePhone' | 'password' | 'token'>;

export const getServerSideProps = compose<{ id?: string }, PublicUser>(
  cache(),
  errorLogger,
  async ({ params: { id = '' } = {} }) => {
    const {
      email: _email,
      mobilePhone: _mobilePhone,
      password: _password,
      token: _token,
      ...user
    } = await userStore.getOne(id);

    return JSON.parse(JSON.stringify({ props: user }));
  },
);

const UserDetailPage: FC<PublicUser> = observer(({ id, name, avatar }) => {
  const { t } = useContext(I18nContext);
  const { user } = sessionStore;
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    setIsOwner(user?.id === id);
  }, [id, user?.id]);

  const visibleEmail = isOwner ? user?.email : undefined;

  return (
    <>
      <PageHead title={name || t('profile')} />

      <section className={classNames(styles['hero-section'], 'text-white text-center')}>
        <Container>
          <Badge bg="light" text="dark" className="text-uppercase mb-3">
            {t('hacker_pavilion')}
          </Badge>
          <h1 className="display-6 fw-semibold">{name || t('mystery_hacker')}</h1>
          {visibleEmail && (
            <p className="mb-0">
              <a className="text-white-50" href={`mailto:${visibleEmail}`}>
                {visibleEmail}
              </a>
            </p>
          )}
        </Container>
      </section>

      <Container className="pb-5" style={{ marginTop: '-4rem' }}>
        <Row className="g-4">
          <Col lg={4} xl={3}>
            <div className="text-center mb-3">
              {avatar ? (
                <Image
                  className="border border-4 border-white shadow"
                  roundedCircle
                  width={120}
                  height={120}
                  src={avatar}
                  alt={name || 'avatar'}
                />
              ) : (
                <div
                  className={classNames(
                    styles['avatar-placeholder'],
                    'rounded-circle d-inline-flex align-items-center justify-content-center border border-4 border-white shadow',
                  )}
                >
                  <Icon name="person" size={3} className="text-white" />
                </div>
              )}
            </div>

            <Card className="border-0 shadow-lg rounded-4 text-center">
              <Card.Body className="p-4">
                <h4 className="fw-semibold mb-1">{name || t('mystery_hacker')}</h4>
                {visibleEmail && (
                  <p className="text-muted small mb-3">
                    <a className="text-muted" href={`mailto:${visibleEmail}`}>
                      {visibleEmail}
                    </a>
                  </p>
                )}
                {isOwner && user?.mobilePhone && (
                  <a
                    className="text-muted small mb-3 d-inline-block"
                    href={`tel:${user.mobilePhone}`}
                  >
                    {user.mobilePhone}
                  </a>
                )}

                {isOwner && (
                  <Button
                    className="w-100 mt-4 rounded-3"
                    variant="outline-secondary"
                    href="https://github.com/settings/profile"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sessionStore.signOut()}
                  >
                    <Icon name="pencil" className="me-2" />
                    {t('edit_profile')}
                  </Button>
                )}
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
