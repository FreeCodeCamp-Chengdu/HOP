import { faCalendarDay, faMapLocationDot, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Hackathon } from '@freecodecamp-chengdu/hop-service';
import classNames from 'classnames';
import { FC, useContext } from 'react';
import { Badge, Card, ProgressBar } from 'react-bootstrap';

import { I18nContext } from '../../models/Base/Translation';
import { convertDatetime } from '../../utils/time';
import { ActivityControl, ActivityControlProps } from './ActivityControl';
import { ActivityEntry, getActivityStatusText } from './ActivityEntry';

export interface ActivityCardProps extends Hackathon, ActivityControlProps {
  className?: string;
  controls?: boolean;
}

export const ActivityCard: FC<ActivityCardProps> = ({
  className,
  controls,
  name,
  displayName,
  eventStartedAt,
  location,
  tags,
  banners,
  enrollment,
  maxEnrollment,
  status,
  enrollmentStartedAt,
  enrollmentEndedAt,
  eventEndedAt,
  judgeStartedAt,
  judgeEndedAt,
  onPublish,
  onDelete,
  ...rest
}) => {
  const i18nStore = useContext(I18nContext);
  const { t } = i18nStore;
  const eventStartedAtText = convertDatetime(eventStartedAt);

  const cover = banners?.[0]?.uri;
  const capacity = maxEnrollment || Math.max(enrollment || 0, 1);
  const progress = Math.min(100, Math.round(((enrollment || 0) / capacity) * 100));
  const statusText = getActivityStatusText(i18nStore, {
    status,
    enrollmentStartedAt,
    enrollmentEndedAt,
    eventStartedAt,
    eventEndedAt,
    judgeStartedAt,
    judgeEndedAt,
  });
  const statusBadge = (
    <Badge bg="light" text="dark" className="text-uppercase fw-semibold">
      {statusText}
    </Badge>
  );

  return (
    <Card
      className={classNames(
        'activity-card border-0 shadow-sm h-100 position-relative overflow-hidden',
        className,
      )}
    >
      {cover && (
        <div
          className="activity-card__cover rounded-top"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(14,22,40,.35), rgba(14,22,40,.8)), url(${cover})`,
          }}
        >
          {statusBadge}
        </div>
      )}
      <Card.Body>
        {!cover && <div className="mb-3">{statusBadge}</div>}

        <Card.Title
          as="a"
          className="stretched-link text-decoration-none text-reset"
          title={displayName}
          href={`/activity/${name}`}
        >
          {displayName}
        </Card.Title>

        <div className="d-flex flex-column gap-2 small text-muted mt-3">
          <span className="text-truncate" title={eventStartedAtText}>
            <FontAwesomeIcon className="text-success me-2" icon={faCalendarDay} />
            {eventStartedAtText}
          </span>
          <span className="text-truncate" title={location}>
            <FontAwesomeIcon className="text-success me-2" icon={faMapLocationDot} />
            {location}
          </span>
        </div>

        {!!tags?.length && (
          <div className="d-flex flex-wrap gap-2 mt-3">
            {tags.map(tag => (
              <Badge key={tag} bg="success-subtle" text="success" pill>
                <FontAwesomeIcon className="me-1" icon={faTags} />
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </Card.Body>
      <Card.Footer className="bg-transparent border-0 pt-0">
        <div className="mb-3">
          <div className="d-flex justify-content-between small text-muted">
            <span>{t('people_registered')}</span>
            <span>
              {enrollment} / {maxEnrollment || t('unlimited')}
            </span>
          </div>
          <ProgressBar now={progress} variant="success" className="activity-card__progress" />
        </div>

        {controls ? (
          <ActivityControl {...{ name, status, onPublish, onDelete }} />
        ) : (
          <ActivityEntry
            {...{
              ...rest,
              status,
              eventStartedAt,
              eventEndedAt,
              enrollmentStartedAt,
              enrollmentEndedAt,
              judgeStartedAt,
              judgeEndedAt,
              href: `/activity/${name}`,
            }}
          />
        )}
      </Card.Footer>
    </Card>
  );
};
