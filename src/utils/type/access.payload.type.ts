import { AccountEnum } from '../enum';

export type AccessPayloadType = {
  user_id: string;
  account_type: AccountEnum;
};
