import type { ICoordinate } from './coordinate';

export interface ILocation extends ICoordinate {
  name: string;
  country: string;
  state: string;
}
