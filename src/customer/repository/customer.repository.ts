import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document, Model, Types } from "mongoose";
import { CustomerEntity } from "../entity/customer.entity";
import { ICustomerRepository } from "../interface/repository.interface";
import { CustomerMapper } from "../customer.mapper";
import { Customer, CustomerDocument } from "./customer.model";

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(@InjectModel('Customer') private customerModel: Model<Customer>) {}

  async getMe(id: string): Promise<CustomerEntity> {
    let newCustomer;
    
    let exist = await this.customerModel.findOne({ auth_id: id });
    if (!exist) {
      newCustomer = await this.customerModel.create({ auth_id: id })
    } else {
      newCustomer = exist;
    }

    const customer = CustomerMapper.RepositoryToEntity(newCustomer, this);
    return customer;
  }
}