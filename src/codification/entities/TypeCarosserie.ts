/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */

import { Column, PrimaryColumn, Entity } from 'typeorm';
import { NomCodification } from 'src/enum/nomCodification';

@Entity('type_carosserie')
export class TypeCarosserie {
  @PrimaryColumn({
    primary: true,
    primaryKeyConstraintName: 'PK_CODE_TYPECAROSSERIE',
  })
  codeTC: string;

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

  @Column({ name: 'libelle', type: 'varchar', nullable: false })
  libelle: string;
}
