import { AccountEnum } from '../enum';

export type RefreshPayloadType = {
  user_id: string;
  account_type: AccountEnum;
  refresh_token: string;
};
