import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { StatusRole } from '../enums/statusRole.enum';
import { Transform } from 'class-transformer';

export class CreateProduct {
  @IsEnum(StatusRole)
  @IsNotEmpty()
  status: StatusRole;
  @IsDateString()
  imported_t: Date;
  @IsString()
  url: string;
  @IsString()
  creator: string;

  created_t: Date;

  last_modified_t: Date;
  @IsString()
  product_name: string;
  @IsString()
  quantity: string;
  @IsString()
  brands: string;
  @IsString()
  categories: string;
  @IsString()
  labels: string;
  @IsString()
  cities: string;
  @IsString()
  purchase_places: string;
  @IsString()
  stores: string;
  @IsString()
  ingredients_tex: string;
  @IsString()
  traces: string;
  @IsString()
  serving_size: string;
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  serving_quantity: number;
  @IsNumber()
  nutriscore_score: number;
  @IsString()
  nutriscore_grade: string;
  @IsString()
  main_category: string;
  @IsString()
  image_url: string;
}
