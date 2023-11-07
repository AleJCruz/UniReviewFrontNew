import {Image} from "./Image";

export class University {
  id: number; // Optional since it's auto-generated
  name: string;
  campus: string;
  pension: number;
  havepostgraduate: boolean;
  haveundergraduate: boolean;
  havepeoplewhowork: boolean;
  qualification:number;
  enrollmentLink:string;
  image:Image;
}
