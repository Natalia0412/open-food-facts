import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../enums/status.enum';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  code: number;
  @Column()
  status: Status;
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
  @Column()
  serving_quantity: number;
  @Column()
  nutriscore_score: number;
  @Column()
  nutriscore_grade: string;
  @Column()
  main_category: string;
  @Column()
  image_url: string;
}
