import {Teacher} from "./Teacher";
import {User} from "./User";

export class TeacherReview {
  id: number;
  reviewdate: string;
  description: string;
  score: number;
  teacherDTO: Teacher;
  user: User;
  rigurosityTitle: string;
}
