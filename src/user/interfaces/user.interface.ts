import { Types } from "mongoose";
import { ERoles } from "../enums/roles.enum";
import { EStatus } from "../enums/status.enum";

export interface IUser {
  _id?: Types.ObjectId;
  firstName?: string;
  lastName?: string;
  email?: string;
  pass?: string;
  roles?: ERoles[];
  status?: EStatus;
}
