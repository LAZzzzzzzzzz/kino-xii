import { ProfileStatus } from '@/components';
import { PersonalInformation, ProfileTabs } from './components';
import { useProfile } from './useProfile';

const Profile = () => {
  const { user } = useProfile();

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-10 px-12.75 pt-29.5 pb-65">
      <div className="flex w-full flex-col gap-7 border-b border-card">
        <h1 className="text-2xl font-extrabold">My Profile</h1>
        <ProfileTabs isProfileComplete={user.profileComplete} />
      </div>

      <ProfileStatus isComplete={user.profileComplete} className="w-220" />

      <PersonalInformation user={user} />
    </div>
  );
};

export default Profile;
