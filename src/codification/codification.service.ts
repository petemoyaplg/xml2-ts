/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NomCodification } from 'src/enum/nomCodification';
import { EnergieVehicule } from './entities/EnergieVehicule';
import { Marque } from './entities/Marque';
import { Modele } from './entities/Modele';
import { TypeCarosserie } from './entities/TypeCarosserie';
import { TypeVehicule } from './entities/TypeVehicule';
import { UsageVehicule } from './entities/UsageVehicule';
import * as codificationList from '../resources/codifications.json';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Connection,
  getConnection,
  QueryRunner,
  Repository,
  UpdateResult,
} from 'typeorm';

@Injectable()
export class CodificationService {
  constructor(
    @InjectRepository(EnergieVehicule)
    private readonly eVehiculeRepo: Repository<EnergieVehicule>,
    @InjectRepository(UsageVehicule)
    private readonly uVehiculeRepo: Repository<UsageVehicule>,
    @InjectRepository(TypeVehicule)
    private readonly tVehiculeRepo: Repository<TypeVehicule>,
    @InjectRepository(TypeCarosserie)
    private readonly typeCarosserieRepo: Repository<TypeCarosserie>,
    @InjectRepository(Marque)
    private readonly marqueRepo: Repository<Marque>,
    @InjectRepository(Modele)
    private readonly modeleRepo: Repository<Modele>,
  ) {}

  // @Transactional()
  getAllProductInJsonFile(): any {
    const marques: Marque[] = [];
    let modeles: Modele[] = [];
    const typeCarosseries: TypeCarosserie[] = [];
    const uVehicules: UsageVehicule[] = [];
    const eVehicules: EnergieVehicule[] = [];
    const typeVehicules: TypeVehicule[] = [];

    // const connection: Connection = getConnection();
    // const queryRunner: QueryRunner = connection.createQueryRunner();

    // await queryRunner.connect();
    // await queryRunner.startTransaction();

    // try {
    //   await queryRunner.commitTransaction();
    // } catch (error) {
    //   await queryRunner.rollbackTransaction();
    //   throw new InternalServerErrorException(error.message);
    // } finally {
    //   await queryRunner.release();
    // }

    for (const codification of codificationList) {
      const nomCodification = codification.nomCodification;
      const actif = new Boolean(codification.actif);
      const dateModification = new Date(codification.dateModification);
      const code = codification.code;
      const libelle = codification.libelle;
      switch (nomCodification) {
        case 'type_carosserie':
          const typeCarosserie: TypeCarosserie = {
            actif,
            dateModification,
            codeTC: code,
            libelle,
            nomCodification: NomCodification.type_carosserie,
          };
          typeCarosseries.push(typeCarosserie);
          break;
        case 'usage_vehicule':
          const usageVehicule: UsageVehicule = {
            actif,
            dateModification,
            codeUV: code,
            libelle,
            nomCodification: NomCodification.usage_vehicule,
          };
          uVehicules.push(usageVehicule);
          break;
        case 'energie_vehicule':
          const energieVehicule: EnergieVehicule = {
            actif,
            dateModification,
            codeEnergie: code,
            libelle,
            nomCodification: NomCodification.energie_vehicule,
          };
          eVehicules.push(energieVehicule);
          break;
        case 'type_vehicule':
          const typeVehicule: TypeVehicule = {
            actif: new Boolean(actif),
            dateModification: new Date(dateModification),
            codeTV: code,
            libelle,
            nomCodification: NomCodification.type_vehicule,
          };
          typeVehicules.push(typeVehicule);
          const codificationsMarque = codification.codifications;
          const codificationMarques = codificationsMarque.codification;
          for (const codificationMarque of codificationMarques) {
            const marque: Marque = {
              actif: new Boolean(codificationMarque.actif),
              dateModification: new Date(codificationMarque.dateModification),
              codeMarque: codificationMarque.code,
              libelle: codificationMarque.libelle,
              nomCodification: NomCodification.voiture_marque,
              codeTypeVehicule: typeVehicule.codeTV,
            };
            marques.push(marque);
            const codificationsModeles = codificationMarque.codifications;
            if (codificationsModeles) {
              const codificationModeles = codificationsModeles.codification;
              const nomCodificationModele =
                codificationModeles['nomCodification'];
              if (nomCodificationModele) {
                const modele: Modele = {
                  nomCodification: NomCodification.voiture_modele,
                  actif: new Boolean(codificationModeles['actif']),
                  codeModele: codificationModeles['code'],
                  dateModification: new Date(
                    codificationModeles['dateModification'],
                  ),
                  libelle: codificationModeles['libelle'],
                  codeMarque: marque.codeMarque,
                };
                modeles.push(modele);
              } else {
                const json = JSON.stringify(codificationModeles);
                const array: Modele[] = JSON.parse(json);
                modeles = modeles.concat(array);
              }
            }
          }
        default:
          break;
      }
    }

    return {
      type_carosserie: typeCarosseries,
      usage_vehicule: uVehicules,
      voiture_marque: marques,
      voiture_modele: modeles,
      type_vehicule: typeVehicules,
      energie_vehicule: eVehicules,
    };
  }
}
