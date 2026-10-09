import { splitBandLabel } from '../../helpers';

export const getVenueOptions = (venues) =>
  venues.map((venue) => ({
    value: venue.slug,
    label: venue.name,
    detail: venue.city,
  }));

export const getFormatOptions = (formats) =>
  formats.map((format) => ({ value: format.slug, label: format.name }));

export const getLanguageOptions = (languages) =>
  languages.map((language) => ({
    value: language.slug,
    label: language.name,
  }));

export const getBandOptions = (timeBands) =>
  timeBands.map((band) => {
    const { name, detail } = splitBandLabel(band.label);

    return { value: band.id, label: name, detail };
  });
