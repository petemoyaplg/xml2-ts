import { Injectable } from '@nestjs/common';

interface Type {
  id: number;
  name: string;
  type: string;
  date: Date;
  address: Address;
  code: string[];
}

interface Address {
  id: number;
  commune: string;
  quartier: string;
}

@Injectable()
export class AppService {
  index(): any {
    // this.loopObjet();

    return students;
  }

  loopObjet() {
    const codification: Type = {
      id: 1,
      name: 'plg',
      type: 'vehicule',
      date: new Date(),
      address: { id: 2, commune: 'Ngaliema', quartier: 'Jolie Park' },
      code: ['plg', 'kev'],
    };
    for (const field in codification) {
      console.log('==============================================');
      console.log(typeof codification[field as keyof typeof codification]);
      console.log(codification[field as keyof typeof codification]);
    }
  }
}
