import { IUser } from './user.model';

export const enum Unit {
  KG = 'KG',
  LB = 'LB'
}

export interface IPreferences {
  id?: number;
  weeklyGoal?: number;
  weightUnits?: Unit;
  user?: IUser;
}

export class Preferences implements IPreferences {
  constructor(public id?: number, public weeklyGoal?: number, public weightUnits?: Unit, public user?: IUser) {}
}
