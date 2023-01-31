import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ICustomerRepository } from "./customer.interface";
import { Customer, CustomerDocument } from "./customer.model";

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(@InjectModel('Customer') private customerModel: Model<CustomerDocument>) {}

  public createCustomer(email: string, name: string): Promise<Customer> {
    return this.customerModel.create({ email, name });
  }
}