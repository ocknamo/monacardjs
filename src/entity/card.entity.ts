import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  readonly id?: string;

  @Column('varchar', { unique: true })
  asset: string;

  @Column('varchar', { default: null })
  assetLongname: string | null;

  @Column('varchar', { default: null })
  assetGroup: string | null;

  @Column('varchar', { default: null })
  name: string | null;

  @Column('varchar', { default: null })
  issuer: string | null;

  @Column('varchar', { default: null })
  imgur: string | null;

  @Column('varchar', { length: 6000, default: null })
  description: string | null;

  @Column('varchar', {
    length: 100,
    default: 'good',
    comment: 'good or reason of ban',
  })
  status: string;

  @Column({ default: '' })
  tag: string;

  @Column()
  cid: string;

  @Column({ default: '1' })
  ver: string;

  @Column({ comment: '登録時のissuanceのtxハッシュ' })
  readonly txHash: string;

  @Column('bigint', { default: null, comment: '登録時のtx index' })
  readonly txIndex: number | null;

  @CreateDateColumn()
  readonly registTime?: Date;

  @UpdateDateColumn()
  readonly updateTime?: Date;

  constructor(
    asset: string,
    assetLongname: string | null,
    assetGroup: string | null,
    name: string | null,
    issuer: string | null,
    imgur: string | null,
    description: string | null,
    status: string,
    tag: string,
    cid: string,
    ver: string,
    txHash: string,
    txIndex: number | null,
  ) {
    this.asset = asset;
    this.assetLongname = assetLongname;
    this.assetGroup = assetGroup;
    this.name = name;
    this.issuer = issuer;
    this.imgur = imgur;
    this.description = description;
    this.status = status;
    this.tag = tag;
    this.cid = cid;
    this.ver = ver;
    this.txHash = txHash;
    this.txIndex = txIndex;
  }
}
