import { User } from '@freecodecamp-chengdu/hop-service';
import classNames from 'classnames';
import { Icon } from 'idea-react';
import { observer } from 'mobx-react';
import { JWTProps } from 'next-ssr-middleware';
import { FC, useContext, useEffect } from 'react';
import { Badge, Button, Card, Col, Container, Image, Row } from 'react-bootstrap';

import { PageHead } from '../../components/layout/PageHead';
import { I18nContext } from '../../models/Base/Translation';
import sessionStore from '../../models/User/Session';
import { sessionGuard } from '../api/core';
import styles from './index.module.less';

export const getServerSideProps = sessionGuard;

const ProfilePage: FC<JWTProps<User>> = observer(({ jwtPayload }) => {
  const { t } = useContext(I18nContext);

  useEffect(() => {
    if (jwtPayload) sessionStore.user = jwtPayload;
  }, [jwtPayload]);

  const user = jwtPayload || sessionStore.user;

  if (!user) return null;

  const { name, email, avatar, mobilePhone } = user;

  return (
    <>
      <PageHead title={t('profile')} />

      <section className={classNames(styles['hero-section'], 'text-white text-center')}>
        <Container>
          <Badge bg="light" text="dark" className="text-uppercase mb-3">
            {t('profile')}
          </Badge>
          <h1 className="display-6 fw-semibold mb-2">{name || t('mystery_hacker')}</h1>
          <p className="text-white-50 mb-0">{email || t('mystery_hacker')}</p>
        </Container>
      </section>

      <Container className="pb-5" style={{ marginTop: '-4rem' }}>
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <div className="text-center mb-4">
              {avatar ? (
                <Image
                  src={avatar}
                  alt={name || 'avatar'}
                  roundedCircle
                  width={140}
                  height={140}
                  className="border border-4 border-white shadow"
                />
              ) : (
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center border border-4 border-white shadow"
                  style={{
                    width: 140,
                    height: 140,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  <Icon name="person" size={3} className="text-white" />
                </div>
              )}
            </div>

            <Card className="border-0 shadow-lg rounded-4">
              <Card.Body className="p-4 p-md-5">
                <Row className="g-3 mb-4">
                  <Col md={6}>
                    <div
                      className={classNames(
                        styles['info-item'],
                        'd-flex align-items-center gap-3 p-3 rounded-3',
                      )}
                    >
                      <div
                        className={classNames(
                          styles['info-icon'],
                          'd-flex align-items-center justify-content-center rounded-2 flex-shrink-0',
                        )}
                        style={{ width: 40, height: 40 }}
                      >
                        <Icon name="envelope" />
                      </div>
                      <div>
                        <small className="text-muted d-block">{t('mail')}</small>
                        <span className="fw-medium">{email || '-'}</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div
                      className={classNames(
                        styles['info-item'],
                        'd-flex align-items-center gap-3 p-3 rounded-3',
                      )}
                    >
                      <div
                        className={classNames(
                          styles['info-icon'],
                          'd-flex align-items-center justify-content-center rounded-2 flex-shrink-0',
                        )}
                        style={{ width: 40, height: 40 }}
                      >
                        <Icon name="telephone" />
                      </div>
                      <div>
                        <small className="text-muted d-block">{t('phone_number')}</small>
                        <span className="fw-medium">{mobilePhone || '-'}</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div
                      className={classNames(
                        styles['info-item'],
                        'd-flex align-items-center gap-3 p-3 rounded-3',
                      )}
                    >
                      <div
                        className={classNames(
                          styles['info-icon'],
                          'd-flex align-items-center justify-content-center rounded-2 flex-shrink-0',
                        )}
                        style={{ width: 40, height: 40 }}
                      >
                        <Icon name="github" />
                      </div>
                      <div>
                        <small className="text-muted d-block">{t('role_source')}</small>
                        <span className="fw-medium">GitHub</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div
                      className={classNames(
                        styles['info-item'],
                        'd-flex align-items-center gap-3 p-3 rounded-3',
                      )}
                    >
                      <div
                        className={classNames(
                          styles['info-icon'],
                          'd-flex align-items-center justify-content-center rounded-2 flex-shrink-0',
                        )}
                        style={{ width: 40, height: 40 }}
                      >
                        <Icon name="person-badge" />
                      </div>
                      <div>
                        <small className="text-muted d-block">{t('user_name')}</small>
                        <span className="fw-medium">{name || '-'}</span>
                      </div>
                    </div>
                  </Col>
                </Row>

                <hr className="my-4" />

                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <Button variant="primary" href={`/user/${user.id}`} className="rounded-3 px-4">
                    <Icon name="person" className="me-2" />
                    {t('home_page')}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    href="https://github.com/settings/profile"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-3 px-4"
                  >
                    <Icon name="pencil" className="me-2" />
                    {t('edit_profile')}
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => sessionStore.signOut(true)}
                    className="rounded-3 px-4"
                  >
                    <Icon name="box-arrow-right" className="me-2" />
                    {t('sign_out')}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
});

export default ProfilePage;
