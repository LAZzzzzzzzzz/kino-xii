import { useQuery } from '@tanstack/react-query';
import { CaretDownIcon } from '@/components';
import { FILTER_OPTIONS_QUERY_KEY } from '@/config';
import { getFilterOptionsRequest } from '@/services';

const VenueSelect = ({ label, ...rest }) => {
  const { data: venues = [] } = useQuery({
    queryKey: [FILTER_OPTIONS_QUERY_KEY],
    queryFn: getFilterOptionsRequest,
    select: (response) => response.data.data.venues,
  });

  return (
    <label className="flex w-full min-w-0 flex-col gap-2.5 text-xs font-semibold">
      <span>{label}</span>

      <div className="relative flex h-10 items-center rounded-xl bg-card">
        <select
          {...rest}
          className="size-full min-w-0 cursor-pointer appearance-none bg-transparent pr-10 pl-4 outline-none"
        >
          <option value="" className="bg-card">
            Select a venue
          </option>

          {venues.map((venue) => (
            <option key={venue.id} value={venue.id} className="bg-card">
              {venue.name}
            </option>
          ))}
        </select>

        <CaretDownIcon className="pointer-events-none absolute right-4 size-4" />
      </div>
    </label>
  );
};

export default VenueSelect;
