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

      <div className="flex h-10 items-center gap-1.5 rounded-xl bg-card px-4">
        <select
          {...rest}
          className="min-w-0 flex-1 cursor-pointer appearance-none bg-transparent outline-none"
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

        <CaretDownIcon className="size-4" />
      </div>
    </label>
  );
};

export default VenueSelect;
