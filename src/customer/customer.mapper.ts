import { JwtService } from "@nestjs/jwt";
import { CustomerDto } from "./controller/dto/customer.dto";
import { CustomerEntity } from "./entity/customer.entity";
import { CustomerDocument } from "./repository/customer.model";
import { CustomerRepository } from "./repository/customer.repository";

export class CustomerMapper {
  public static RepositoryToEntity(origin: CustomerDocument, context: CustomerRepository): CustomerEntity {
    const newCustomer = new CustomerEntity(context, new JwtService);

    newCustomer.id = origin.id;
    newCustomer.name = origin.name;
    newCustomer.email = origin.email;
    newCustomer.currency = origin.currency;
    newCustomer.balance = origin.balance;
    newCustomer.password= origin.password;

    return newCustomer;
  }

  public static EntityToDto(origin: CustomerEntity): CustomerDto {
    const dto = new CustomerDto();
    dto.name = origin.name;
    dto.email = origin.email;
    dto.balance = origin.balance;
    dto.currency = origin.currency;
    dto.password = origin.password;

    return dto;
  }
}