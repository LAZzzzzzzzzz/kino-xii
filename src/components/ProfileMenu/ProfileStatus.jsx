import { CheckIcon } from '../icons';

const ProfileStatus = ({ isComplete }) => {
  if (isComplete) {
    return (
      <div className="flex w-full items-center gap-1.5 rounded-menu bg-tint-green px-3 py-2.5">
        <p className="text-sm font-semibold text-green">Profile Complete</p>
        <CheckIcon className="size-4 text-green" />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-0.5 rounded-menu bg-tint-orange px-3 py-2.5">
      <p className="text-sm font-semibold text-orange">Profile incomplete</p>
      <p className="text-xs leading-body text-secondary">
        Please complete your profile to enable booking
      </p>
    </div>
  );
};

export default ProfileStatus;
