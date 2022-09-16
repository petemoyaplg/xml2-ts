import { TypeVehicule } from './../models/TypeVehicule';
import { EnergieVehicule } from './../models/EnergieVehicule';
import { UsageVehicule } from './../models/UsageVehicule';
import { TypeCarosserie } from './../models/TypeCarosserie';
import { Modele } from './../models/Modele';
import { Marque } from './../models/Marque';
import { NomCodification } from 'src/enum/nomCodification';
import { Injectable } from '@nestjs/common';
import * as codificationList from '../resources/codifications.json';

@Injectable()
export class AppService {
  index(): any {
    return this.getAllProductInJsonFile();
  }

  getAllProductInJsonFile(): any {
    const marques: Marque[] = [];
    const modeles: Modele[] = [];
    const typeCarosseries: TypeCarosserie[] = [];
    const uVehicules: UsageVehicule[] = [];
    const eVehicules: EnergieVehicule[] = [];
    const typeVehicules: TypeVehicule[] = [];

    for (const codification of codificationList) {
      for (const field in codification) {
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
              code,
              libelle,
              nomCodification: NomCodification.type_carosserie,
            };
            typeCarosseries.push(typeCarosserie);
            break;
          case 'usage_vehicule':
            const usageVehicule: UsageVehicule = {
              actif,
              dateModification,
              code,
              libelle,
              nomCodification: NomCodification.usage_vehicule,
            };
            uVehicules.push(usageVehicule);
            break;
          case 'energie_vehicule':
            const energieVehicule: EnergieVehicule = {
              actif,
              dateModification,
              code,
              libelle,
              nomCodification: NomCodification.energie_vehicule,
            };
            eVehicules.push(energieVehicule);
            break;
          case 'type_vehicule':
            const typeVehicule: TypeVehicule = {
              actif: new Boolean(actif),
              dateModification: new Date(dateModification),
              code,
              libelle,
              nomCodification: NomCodification.type_vehicule,
            };
            typeVehicules.push(typeVehicule);
            if (codification) {
              const codificationType = codification.codifications;
              if (codificationType) {
                for (const fieldMarque in codificationType) {
                  const codificationMarques = codificationType.codification;
                  for (const codificationMarque of codificationMarques) {
                    const marque: Marque = {
                      actif: new Boolean(codificationMarque.actif),
                      dateModification: new Date(
                        codificationMarque.dateModification,
                      ),
                      code: codificationMarque.code,
                      libelle: codificationMarque.libelle,
                      nomCodification: NomCodification.voiture_marque,
                      codeTypeVehicule: typeVehicule.code,
                    };
                    marques.push(marque);
                    const codificationModeles =
                      codificationMarque.codifications;
                    if (codificationModeles) {
                      const codificationModele =
                        codificationModeles.codification;
                      if (codificationModele)
                      {
                        
                        codificationModeles.codification
                      }
                    }
                  }
                }
              }
            }

            break;
          default:
            break;
        }
      }
    }

    return {
      type_carosserie: typeCarosseries.length,
      usage_vehicule: uVehicules.length,
      voiture_marque: marques.length,
      voiture_modele: modeles.length,
      type_vehicule: typeVehicules.length,
      energie_vehicule: eVehicules.length,
    };
  }
}
