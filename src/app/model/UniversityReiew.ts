import {University} from "./University";
import {User} from "./User";

export class UniversityReiew{
  id:number;
  reviewdate:string;
  relatedCareer:string;
  description:string;
  score:number;
  university: University;
  user: User;
}
