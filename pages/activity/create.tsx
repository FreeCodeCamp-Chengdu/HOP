import classNames from 'classnames';
import { Icon } from 'idea-react';
import { observer } from 'mobx-react';
import { JWTProps } from 'next-ssr-middleware';
import { FC, useContext } from 'react';
import { Badge, Card, Col, Container, Row } from 'react-bootstrap';

import { ActivityEditor } from '../../components/Activity/ActivityEditor';
import { PageHead } from '../../components/layout/PageHead';
import { I18nContext } from '../../models/Base/Translation';
import { sessionGuard } from '../api/core';
import styles from './create.module.less';

export const getServerSideProps = sessionGuard;

const ActivityCreatePage: FC<JWTProps> = observer(() => {
  const { t } = useContext(I18nContext);

  return (
    <>
      <PageHead title={t('create_activity')} />

      <section className={classNames(styles['hero-section'], 'text-white')}>
        <hgroup className="d-flex flex-column align-items-center">
          <Badge bg="light" text="dark" className="text-uppercase mb-3">
            {t('open_hackathon_platform')}
          </Badge>
          <h1 className="display-6 fw-semibold mb-3">{t('create_activity')}</h1>
          <p className="text-white-50 fs-5">{t('platform_tagline')}</p>
        </hgroup>
      </section>

      <section className="py-5 bg-body-tertiary">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} xl={8}>
              <Card className={classNames(styles['form-card'], 'border-0 rounded-4')}>
                <Card.Body className="p-4 p-md-5">
                  <ActivityEditor />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
});

export default ActivityCreatePage;
