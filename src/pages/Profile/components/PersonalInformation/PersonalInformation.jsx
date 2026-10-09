import { Button, CalendarIcon, Input } from '@/components';
import {
  DATE_OF_BIRTH_RULES,
  FULL_NAME_RULES,
  MOBILE_NUMBER_RULES,
} from '@/config';
import { getDisplayName } from '@/helpers';
import { getEligibilityNote } from './helpers';
import usePersonalInformation from './usePersonalInformation';
import VenueSelect from './VenueSelect';

const PersonalInformation = ({ user }) => {
  const { register, errors, validFields, isSubmittable, isPending, onSubmit } =
    usePersonalInformation(user);

  return (
    <form onSubmit={onSubmit} className="flex w-220 flex-col items-start gap-9">
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col gap-4.5">
          <Input
            label="Full name"
            autoComplete="name"
            placeholder={getDisplayName(user)}
            isValid={validFields.fullName}
            error={errors.fullName?.message}
            {...register('fullName', FULL_NAME_RULES)}
          />

          <Input
            label="Email"
            type="email"
            value={user.email}
            hint="Set at registration and cannot be changed"
            readOnly
            disabled
          />
        </div>

        <div className="flex w-full flex-col gap-5">
          <Input
            label="Mobile number"
            autoComplete="tel-national"
            placeholder="e.g. 555 123 456"
            isValid={validFields.mobileNumber}
            error={errors.mobileNumber?.message}
            {...register('mobileNumber', MOBILE_NUMBER_RULES)}
          />

          <Input
            label="Date of birth"
            type="date"
            icon={<CalendarIcon />}
            hint={getEligibilityNote(user.age)}
            error={errors.dateOfBirth?.message}
            {...register('dateOfBirth', DATE_OF_BIRTH_RULES)}
          />

          <VenueSelect
            label="Preferred Venue (Optional)"
            {...register('preferredVenueId')}
          />
        </div>
      </div>

      {errors.root && (
        <p className="text-xs font-semibold text-red">{errors.root.message}</p>
      )}

      <Button type="submit" disabled={!isSubmittable}>
        {isPending ? 'Saving' : 'Save changes'}
      </Button>
    </form>
  );
};

export default PersonalInformation;
