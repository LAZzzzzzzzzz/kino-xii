import { ProfileStatus } from '@/components';
import {
  MyTickets,
  PersonalInformation,
  ProfileTabs,
  TICKETS_SECTION,
} from './components';
import { useProfile } from './useProfile';

const Profile = () => {
  const { user, activeSection, selectSection, upcomingCount } = useProfile();

  if (!user) {
    return null;
  }

  const isTicketsSection = activeSection === TICKETS_SECTION;

  return (
    <div className="flex flex-col items-start gap-10 px-12.75 pt-29.5 pb-65">
      <div className="flex w-full flex-col gap-7 border-b border-card">
        <h1 className="text-2xl font-extrabold">My Profile</h1>

        <ProfileTabs
          activeSection={activeSection}
          isProfileComplete={user.profileComplete}
          ticketCount={upcomingCount}
          onSelect={selectSection}
        />
      </div>

      {isTicketsSection ? (
        <MyTickets />
      ) : (
        <>
          <ProfileStatus isComplete={user.profileComplete} className="w-220" />
          <PersonalInformation user={user} />
        </>
      )}
    </div>
  );
};

export default Profile;
