import { Icon } from 'idea-react';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Button, Dropdown } from 'react-bootstrap';

import { I18nContext } from '../../models/Base/Translation';
import sessionStore from '../../models/User/Session';
import LanguageMenu from './LanguageMenu';

const UserBar = observer(() => {
  const { t } = useContext(I18nContext),
    { user } = sessionStore;
  const router = useRouter();

  const showName = user?.name || user?.email || user?.mobilePhone || '';
  const loginUrl = `/login?redirect=${encodeURIComponent(router.asPath)}`;

  return (
    <>
      <Button variant="success" href="/activity/create">
        {t('create_hackathons')}
      </Button>

      {user ? (
        <Dropdown>
          <Dropdown.Toggle>{showName}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/me">{t('profile')}</Dropdown.Item>
            <Dropdown.Item href={`/user/${user.id}`}>{t('home_page')}</Dropdown.Item>
            <Dropdown.Item
              title={t('edit_profile_tips')}
              target="_blank"
              href="https://github.com/settings/profile"
            >
              {t('edit_profile')}
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => sessionStore.signOut(true)}>
              {t('sign_out')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button variant="outline-light" href={loginUrl}>
          <Icon name="github" className="me-2" />
          {t('sign_in')}
        </Button>
      )}
      <LanguageMenu />
    </>
  );
});
export default UserBar;
