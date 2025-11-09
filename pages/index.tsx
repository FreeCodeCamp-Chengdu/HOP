import { Hackathon, UserRank } from '@freecodecamp-chengdu/hop-service';
import { UserRankView } from 'idea-react';
import { observer } from 'mobx-react';
import { cache, compose, errorLogger } from 'next-ssr-middleware';
import { FC, useContext, useMemo } from 'react';
import { Badge, Button, Card, Carousel, Col, Container, Image, Row } from 'react-bootstrap';

import { ActivityListLayout } from '../components/Activity/ActivityList';
import { PageHead } from '../components/layout/PageHead';
import { ActivityModel } from '../models/Activity';
import { I18nContext } from '../models/Base/Translation';
import { UserModel } from '../models/User';

interface HomePageProps {
  activities: Hackathon[];
  topUsers: UserRank[];
}

export const getServerSideProps = compose<{}, HomePageProps>(cache(), errorLogger, async () => {
  const [activities, topUsers] = await Promise.all([
    new ActivityModel().getList({}, 1, 6),
    new UserModel().getUserTopList(),
  ]);

  return { props: JSON.parse(JSON.stringify({ activities, topUsers })) };
});

const HomePage: FC<HomePageProps> = observer(({ activities, topUsers }) => {
  const i18n = useContext(I18nContext);
  const { t } = i18n;

  const stats = useMemo(() => {
    const totalParticipants = activities.reduce(
      (sum, { enrollment = 0 }) => sum + (enrollment || 0),
      0,
    );
    const uniqueLocations = new Set(
      activities.map(({ location }) => location).filter((item): item is string => !!item),
    ).size;
    const contributorCount = new Set(topUsers.map(({ userId }) => userId)).size;
    const formatValue = (value: number, fallback: number) =>
      `${new Intl.NumberFormat(undefined, { notation: 'compact' }).format(value || fallback)}+`;

    return [
      { label: t('hero_stat_events'), value: formatValue(activities.length, 8) },
      {
        label: t('hero_stat_builders'),
        value: formatValue(totalParticipants || contributorCount, 32),
      },
      { label: t('hero_stat_cities'), value: formatValue(uniqueLocations, 6) },
    ];
  }, [activities, topUsers, t]);

  const features = useMemo(
    () => [
      {
        icon: 'bi-lightning-charge',
        title: t('feature_speed_title'),
        description: t('feature_speed_desc'),
      },
      {
        icon: 'bi-kanban',
        title: t('feature_tooling_title'),
        description: t('feature_tooling_desc'),
      },
      {
        icon: 'bi-people',
        title: t('feature_support_title'),
        description: t('feature_support_desc'),
      },
    ],
    [t],
  );

  const bannerActivities = useMemo(
    () => activities.filter(({ banners }) => banners?.[0]),
    [activities],
  );

  return (
    <>
      <PageHead />

      <section className="hero-section text-white pt-5">
        <Container className="position-relative">
          <Row className="align-items-center gy-5">
            <Col lg={6}>
              <Badge bg="light" text="dark" className="text-uppercase mb-3">
                {t('open_hackathon_platform')}
              </Badge>
              <h1 className="display-5 fw-semibold">{t('hero_title')}</h1>
              <p className="fs-5 text-white-50 mb-4">{t('hero_subtitle')}</p>

              <div className="d-flex flex-column flex-sm-row gap-3">
                <Button size="lg" variant="light" className="fw-semibold" href="/activity/">
                  {t('all_activity')}
                </Button>
                <Button
                  size="lg"
                  variant="outline-light"
                  className="fw-semibold"
                  href="/activity/create"
                >
                  {t('create_activity')}
                </Button>
              </div>

              <div className="d-flex flex-wrap gap-4 mt-5">
                {stats.map(({ label, value }) => (
                  <div key={label}>
                    <div className="display-6 fw-semibold">{value}</div>
                    <small className="text-white-50 text-uppercase">{label}</small>
                  </div>
                ))}
              </div>
            </Col>

            <Col lg={6}>
              <Card className="hero-carousel-card border-0 shadow-lg">
                <Card.Body className="p-0">
                  {bannerActivities.length ? (
                    <Carousel>
                      {bannerActivities.map(
                        ({ name: key, displayName, ribbon, banners: [{ uri, name }] }) => (
                          <Carousel.Item key={key}>
                            <a className="d-block stretched-link" href={`/activity/${key}/`}>
                              <Image
                                className="w-100 object-fit-cover hero-carousel-img"
                                src={uri}
                                alt={name}
                              />
                            </a>
                            <Carousel.Caption className="text-shadow">
                              <h3>{displayName}</h3>
                              <p>{ribbon}</p>
                            </Carousel.Caption>
                          </Carousel.Item>
                        ),
                      )}
                    </Carousel>
                  ) : (
                    <div className="p-5 text-center text-white-50">{t('no_news_yet')}</div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-body-tertiary">
        <Container>
          <div className="section-heading text-center mb-5">
            <Badge bg="primary-subtle" text="primary" className="text-uppercase">
              {t('features_section_title')}
            </Badge>
            <h2 className="mt-3">{t('features_section_subtitle')}</h2>
            <p className="text-muted">{t('platform_tagline')}</p>
          </div>

          <Row className="g-4">
            {features.map(({ icon, title, description }) => (
              <Col key={title} md={4}>
                <Card className="feature-card h-100 border-0 shadow-sm">
                  <Card.Body>
                    <div className="icon-circle mb-4">
                      <i className={`bi ${icon}`} aria-hidden />
                    </div>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text className="text-muted">{description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
            <div>
              <small className="text-uppercase text-muted fw-semibold">
                {t('featured_section_subtitle')}
              </small>
              <h2 className="mt-2">{t('featured_section_title')}</h2>
            </div>

            <Button variant="outline-primary" href="/activity/">
              {t('more_events')}
            </Button>
          </div>

          <ActivityListLayout defaultData={activities} size="lg" />
        </Container>
      </section>

      <section className="py-5 bg-body-tertiary">
        <Container>
          <Row className="align-items-center gy-4">
            <Col lg={5}>
              <Badge bg="info-subtle" text="dark" className="text-uppercase mb-3">
                {t('ranking_section_subtitle')}
              </Badge>
              <h2>{t('ranking_section_title')}</h2>
              <p className="text-muted">{t('hero_subtitle')}</p>
            </Col>
            <Col lg={7}>
              <div className="user-rank-panel p-4 rounded-4 bg-white shadow-sm">
                <UserRankView
                  style={{
                    // @ts-expect-error remove in React 19
                    '--logo-image':
                      'url(https://hackathon-api.static.kaiyuanshe.cn/6342619375fa1817e0f56ce1/2022/10/09/logo22.jpg)',
                  }}
                  title={t('hacker_pavilion')}
                  rank={topUsers.map(({ userId, user: { name, avatar, email }, score }) => ({
                    id: userId,
                    name,
                    avatar,
                    email,
                    score,
                  }))}
                  linkOf={({ id }) => `/user/${id}`}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <div className="cta-card rounded-4 p-4 p-md-5 text-white">
            <Row className="align-items-center gy-4">
              <Col lg={8}>
                <Badge bg="light" text="dark" className="text-uppercase mb-3">
                  {t('open_hackathon_platform')}
                </Badge>
                <h2 className="fw-semibold">{t('cta_section_title')}</h2>
                <p className="fs-5 text-white-50 mb-0">{t('cta_section_desc')}</p>
              </Col>
              <Col lg={4} className="text-lg-end">
                <div className="d-flex flex-column flex-sm-row justify-content-lg-end gap-3">
                  <Button size="lg" variant="light" href="/activity/create">
                    {t('create_activity')}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline-light"
                    href="https://kaiyuanshe.feishu.cn/wiki/wikcnR3wHyfVDrYW2TteaUzAnlh"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('get_started')}
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
});
export default HomePage;
