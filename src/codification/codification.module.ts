import { Module } from '@nestjs/common';
import { CodificationService } from './codification.service';
import { CodificationController } from './codification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnergieVehicule } from './entities/EnergieVehicule';
import { UsageVehicule } from './entities/UsageVehicule';
import { TypeCarosserie } from './entities/TypeCarosserie';
import { Modele } from './entities/Modele';
import { Marque } from './entities/Marque';
import { TypeVehicule } from './entities/TypeVehicule';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EnergieVehicule,
      UsageVehicule,
      TypeCarosserie,
      TypeVehicule,
      Modele,
      Marque,
    ]),
  ],
  controllers: [CodificationController],
  providers: [CodificationService],
})
export class CodificationModule {}
