import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ICustomerRepository } from "./customer.interface";
import { Customer, CustomerDocument } from "./customer.model";

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(@InjectModel('Customer') private customerModel: Model<Customer>) {}

  public async createCustomer(email: string, name: string, password: string): Promise<CustomerDocument> {
    return this.customerModel.create({ email, name, password });
  }

  public async getCustomerByEmail(email: string): Promise<CustomerDocument> {
    return this.customerModel.findOne({ email });
  }
}