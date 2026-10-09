import { useAuth } from '@/context';
import Avatar from '../Avatar';
import { CaretDownIcon, LogOutIcon, TicketIcon, UserIcon } from '../icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui';
import { getDisplayName } from '@/helpers';
import { getFirstName, getInitials } from './helpers';
import ProfileMenuItem from './ProfileMenuItem';
import ProfileStatus from '../ProfileStatus';

const ProfileMenu = () => {
  const { user, logout } = useAuth();

  const isProfileComplete = Boolean(user?.profileComplete);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex cursor-pointer items-center gap-6 outline-none">
        <div className="flex items-center gap-3">
          <Avatar
            src={user?.avatar}
            initials={getInitials(user)}
            isProfileComplete={isProfileComplete}
          />
          <span className="text-sm font-semibold whitespace-nowrap">
            {getFirstName(user)}
          </span>
        </div>

        <CaretDownIcon className="size-4 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="flex w-75.5 flex-col gap-1 overflow-hidden rounded-2xl border border-raised bg-page pb-2.5 text-primary"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5 pt-5 pl-5">
            <Avatar
              src={user?.avatar}
              initials={getInitials(user)}
              isProfileComplete={isProfileComplete}
              className="size-10.5"
            />

            <div className="flex w-47.5 flex-col gap-0.5 overflow-hidden">
              <p className="truncate text-sm font-semibold">
                {getDisplayName(user)}
              </p>
              <p className="truncate text-xs leading-body text-secondary">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="px-5">
            <ProfileStatus isComplete={isProfileComplete} />
          </div>
        </div>

        <div className="flex w-full flex-col gap-1">
          <div className="flex flex-col gap-0.5 pt-1">
            <ProfileMenuItem
              to="/profile"
              icon={<UserIcon className="size-4" />}
            >
              My Profile
            </ProfileMenuItem>

            <ProfileMenuItem
              to="/tickets"
              icon={<TicketIcon className="size-4" />}
            >
              My Tickets
            </ProfileMenuItem>
          </div>

          <DropdownMenuSeparator />

          <ProfileMenuItem
            onSelect={logout}
            icon={<LogOutIcon className="size-4" />}
            className="text-red"
          >
            Log out
          </ProfileMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
