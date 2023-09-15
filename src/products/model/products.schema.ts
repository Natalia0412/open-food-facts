
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StatusRole } from '../enums/statusRole.enum';
import { Document } from 'mongoose';
@Schema()
export class Product extends Document {
  @Prop()
  code: number;
  @Prop({
    type: String,
    enum: StatusRole,
  })
  status: StatusRole;
  @Prop()
  imported_t: Date;
  @Prop()
  url: string;
  @Prop()
  creator: string;
  @Prop()
  created_t: Date;
  @Prop()
  last_modified_t: Date;
  @Prop()
  product_name: string;
  @Prop()
  quantity: string;
  @Prop()
  brands: string;
  @Prop()
  categories: string;
  @Prop()
  labels: string;
  @Prop()
  cities: string;
  @Prop()
  purchase_places: string;
  @Prop()
  stores: string;
  @Prop()
  ingredients_tex: string;
  @Prop()
  traces: string;
  @Prop()
  serving_size: string;
  @Prop()
  serving_quantity: number;
  @Prop()
  nutriscore_score: number;
  @Prop()
  nutriscore_grade: string;
  @Prop()
  main_category: string;
  @Prop()
  image_url: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);