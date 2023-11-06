import {Course} from "./Course";
import {Rigurosity} from "./Rigurosity";
import {Image} from "./Image";

export class Teacher{
  id:number;
  fullname:string;
  qualification:number;
  summary:string;
  coursesarray:Course[];
  rigurosity:Rigurosity;
  image: Image;
}
