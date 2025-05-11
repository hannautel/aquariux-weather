import LOCALSTORAGE_KEYS from '@constants/localstorage';
import type { ILocation } from '@typed/location';
import { getLocalstorageItem } from '@utils/localstorage.util';

function getSearchHistory(): ILocation[] {
  try {
    const weatherHistory = getLocalstorageItem(
      LOCALSTORAGE_KEYS.WEARTHER_HISTORY,
    );
    if (!weatherHistory) return [];
    const parsedHistory = JSON.parse(weatherHistory);
    return parsedHistory;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return [];
  }
}

export { getSearchHistory };
