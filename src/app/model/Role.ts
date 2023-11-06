export class Role{
  constructor(number: number, preUniversitario: string) {
    this.id=number;
    this.rol=preUniversitario;
  }

  id:number;
  rol:string;
}
//id 1 es para Preuni y 2 es para universitario
