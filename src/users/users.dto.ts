import { Permission } from 'src/permissions/entities/permission.entity';

export class UserDTO {
  /**
   * @example 'string'
   */
  id: number;

  /**
   * @example 'string'
   */
  username: string;

  /**
   * @example 'string'
   */
  email: string;

  /**
   * @example 'string'
   */
  role: string;

  permissions?: Permission[];
}
