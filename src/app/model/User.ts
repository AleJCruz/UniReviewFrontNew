import {Role} from "./Role";
import {Image} from "./Image";

export class User {
  id?: number;
  name: string;
  email: string;
  username: string;
  password: string;
  district?: string; // Opcional, porque puede ser nulo
  age: number;
  enabled: boolean;
  roles: Role[];
  image: Image;
}
