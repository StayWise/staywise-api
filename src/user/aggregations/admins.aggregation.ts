import { ERoles } from "../enums/roles.enum";
import { EStatus } from "../enums/status.enum";

export const getAdminsAggregation = (roles:ERoles[]) => ([
    {
        $match: {
            roles: { $in: roles },
            status: { $ne: EStatus.DELETED },
        }
    }
])