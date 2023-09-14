import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusRole } from '../enums/statusRole.enum';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  code: number;
  @Column({
    type: 'enum',
    enum: StatusRole,
  })
  status: StatusRole;
  @Column()
  imported_t: Date;
  @Column()
  url: string;
  @Column()
  creator: string;
  @Column()
  created_t: Date;
  @Column()
  last_modified_t: Date;
  @Column()
  product_name: string;
  @Column()
  quantity: string;
  @Column()
  brands: string;
  @Column()
  categories: string;
  @Column()
  labels: string;
  @Column()
  cities: string;
  @Column()
  purchase_places: string;
  @Column()
  stores: string;
  @Column()
  ingredients_tex: string;
  @Column()
  traces: string;
  @Column()
  serving_size: string;
  @Column('float')
  serving_quantity: number;
  @Column('int')
  nutriscore_score: number;
  @Column()
  nutriscore_grade: string;
  @Column()
  main_category: string;
  @Column()
  image_url: string;
}
