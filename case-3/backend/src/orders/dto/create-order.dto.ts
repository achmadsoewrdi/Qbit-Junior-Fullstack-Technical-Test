import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  productId!: string;

  @IsString()
  @IsIn(['Whole bean', 'Espresso', 'Filter', 'French press'])
  grind!: 'Whole bean' | 'Espresso' | 'Filter' | 'French press';

  @IsInt()
  @IsIn([250, 340, 1000])
  weightGrams!: number;

  @IsBoolean()
  isSubscription!: boolean;

  @IsInt()
  @Min(1)
  @Max(20)
  quantity!: number;

  @IsString()
  @IsNotEmpty()
  customerName!: string;

  @IsEmail()
  customerEmail!: string;
}
