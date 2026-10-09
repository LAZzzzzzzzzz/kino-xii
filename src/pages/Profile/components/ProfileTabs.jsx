const ProfileTabs = ({ isProfileComplete }) => {
  return (
    <nav aria-label="Profile sections" className="flex items-center gap-8">
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center gap-2 px-0.5">
          <span className="text-sm font-semibold">Personal Information</span>
          {!isProfileComplete && (
            <span
              aria-label="Profile incomplete"
              role="img"
              className="size-2 rounded-full bg-orange"
            />
          )}
        </div>

        <span className="h-0.5 w-full rounded-t-xs bg-red" />
      </div>
    </nav>
  );
};

export default ProfileTabs;
