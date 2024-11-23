import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    name!: string;

  @Column({ nullable: true })
    description!: string;

  @Column('money')
    price!: number;

  @Column('money')
    discountedPrice!: number;

  @Column()
    sku!: string;

  @Column({ nullable: true })
    photoSrc!: string;
}
