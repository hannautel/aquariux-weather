import useConst from '@hooks/useConst';
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { DEFAULT_COORDINATE } from '@constants/coordinate';
import type { ILocation } from '@typed/city';
import { getSearchHistory } from '@utils/weather-history.util';

interface Props {
  children: ReactNode;
}

interface ISelectedLocationContext {
  coord: ILocation;
  onChangeCoord: (newCoord: ILocation) => void;
}

const SelectedLocationContext = createContext<ISelectedLocationContext>({
  coord: { lat: 0, lon: 0, name: '', state: '', country: '' },
  onChangeCoord: () => {},
});

function useSelectedLocationContext() {
  return useContext(SelectedLocationContext);
}

function SelectedLocationProvider({ children }: Props) {
  const initialCoord = useConst<ILocation>(() => {
    const weatherHistories = getSearchHistory();
    if (weatherHistories.length === 0) return DEFAULT_COORDINATE;
    return {
      lat: weatherHistories[0].lat,
      lon: weatherHistories[0].lon,
      name: weatherHistories[0].name,
      state: weatherHistories[0].state,
      country: weatherHistories[0].country,
    };
  });
  const [coord, setCoord] = useState<ILocation>(initialCoord);

  const values = useMemo<ISelectedLocationContext>(
    () => ({
      coord,
      onChangeCoord: setCoord,
    }),
    [coord],
  );

  return (
    <SelectedLocationContext.Provider value={values}>
      {children}
    </SelectedLocationContext.Provider>
  );
}

export { useSelectedLocationContext };
export default SelectedLocationProvider;
