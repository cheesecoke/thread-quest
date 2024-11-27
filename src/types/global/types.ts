export interface ClothingItemTypes {
  _id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  link: string;
  company: string;
  tags: string[];
}

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
