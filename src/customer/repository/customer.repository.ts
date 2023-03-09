import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document, Model, Types } from "mongoose";
import { CustomerEntity } from "../entity/customer.entity";
import { ICustomerRepository } from "../interface/repository.interface";
import { CustomerMapper } from "../customer.mapper";
import { Customer, CustomerDocument } from "./customer.model";
import { CustomerService } from "../service/customer.service";

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectModel('Customer') private customerModel: Model<Customer>,
    private customerService: CustomerService,
  ) {}

  async getMe(id: string): Promise<CustomerEntity> {
    let newCustomer;
    
    let exist = await this.customerModel.findOne({ auth_id: id });
    if (!exist) {
      newCustomer = await this.customerModel.create({ auth_id: id });
    } else {
      newCustomer = exist;
    }

    const customer = CustomerMapper.RepositoryToEntity(newCustomer, this, this.customerService);
    return customer;
  }

  async updateBalance(id: string, currentBalance: number): Promise<void> {
    try {
      await this.customerModel.updateOne({ auth_id: id }, { balance: currentBalance });  
    } catch (e) {
      throw new Error(e);
    }
    
  }
}