import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CustomerEntity } from "src/domain/entity/customer.entity";
import { ICustomerRepository } from "./customer.interface";
import { CustomerMapper } from "../../mappers/customer.mapper";
import { Customer, CustomerDocument } from "./customer.model";

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(@InjectModel('Customer') private customerModel: Model<Customer>) {}

  public async createCustomer(email: string, name: string, password: string): Promise<CustomerEntity> {
    const newUser = await this.customerModel.create({ email, name, password });
    const entity = CustomerMapper.RepositoryToEntity(newUser, this);

    return entity;
  }

  public async getCustomerByEmail(email: string): Promise<CustomerEntity> | null{
    const newUser: CustomerDocument | null = await this.customerModel.findOne({ email });
    if (newUser === null) return null;
    const entity = CustomerMapper.RepositoryToEntity(newUser, this);

    return entity;
  }
}