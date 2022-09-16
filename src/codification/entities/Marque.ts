/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import { Column, PrimaryColumn, Entity } from 'typeorm';
import { NomCodification } from 'src/enum/nomCodification';

@Entity('marque')
export class Marque {
  @PrimaryColumn({ primary: true, primaryKeyConstraintName: 'PK_CODE_MARQUE' })
  codeMarque: string;

  @Column({
    name: 'nom_codification',
    type: 'enum',
    enum: NomCodification,
    nullable: false,
  })
  nomCodification: NomCodification;

  @Column({ name: 'code', type: 'boolean', nullable: false })
  actif: Boolean;

  @Column({
    name: 'date_modification',
    type: 'time without time zone',
    nullable: false,
  })
  dateModification: Date;

  @Column({ name: 'libelle', type: 'varchar' })
  libelle: string;

  @Column({ name: 'codeTV', type: 'varchar', nullable: false })
  codeTypeVehicule: string;
}
