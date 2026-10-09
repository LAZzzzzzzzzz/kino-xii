import ProfileTab from './ProfileTab';
import { PROFILE_SECTIONS } from './helpers';

const ProfileTabs = ({
  activeSection,
  isProfileComplete,
  ticketCount,
  onSelect,
}) => {
  return (
    <nav
      role="tablist"
      aria-label="Profile sections"
      className="flex items-center gap-9"
    >
      {PROFILE_SECTIONS.map((section) => (
        <ProfileTab
          key={section.value}
          label={section.label}
          isSelected={section.value === activeSection}
          hasAlert={section.hasProfileAlert && !isProfileComplete}
          count={section.hasTicketCount ? ticketCount : 0}
          onClick={() => onSelect(section.value)}
        />
      ))}
    </nav>
  );
};

export default ProfileTabs;
