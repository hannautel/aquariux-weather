import type { ILocation } from '@typed/location';

interface Props {
  location: ILocation;
}

function LocationInfo({ location }: Props) {
  return (
    <>
      <div className="font-medium text-gray-900">{location.name}</div>
      <div className="text-sm text-gray-600">
        {[location.state, location.country].filter(Boolean).join(', ')}
      </div>
    </>
  );
}

export default LocationInfo;
