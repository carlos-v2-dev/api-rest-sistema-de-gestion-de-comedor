import { SetMetadata } from "@nestjs/common";
import { MASTER_KEY } from "src/common/constants/keys-role.constant";
import { UserRole } from "src/common/enums/user-role.enum";

export const MasterAccess = () => SetMetadata( MASTER_KEY, UserRole.MASTER );