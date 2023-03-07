import { UserFromJwt } from "src/userFromJwt";
import { CustomerDto } from "./controller/dto/customer.dto";
import { CustomerEntity } from "./entity/customer.entity";
import { CustomerDocument } from "./repository/customer.model";
import { CustomerRepository } from "./repository/customer.repository";
import { CustomerService } from "./service/customer.service";

export class CustomerMapper {
  public static RepositoryToEntity(
    origin: CustomerDocument,
    context: CustomerRepository,
    service: CustomerService
    ): CustomerEntity {
    const newCustomer = new CustomerEntity(context, service);

    newCustomer.id = origin.id;
    newCustomer.auth_id = origin.auth_id;
    newCustomer.currency = origin.currency;
    newCustomer.balance = origin.balance;

    return newCustomer;
  }

  public static EntityToDto(origin: CustomerEntity, userJwt: UserFromJwt): CustomerDto {
    const dto = new CustomerDto();
    dto.auth_id = origin.auth_id;
    dto.balance = origin.balance;
    dto.currency = origin.currency;
    dto.name = userJwt.name;
    dto.email = userJwt.email;
    
    return dto;
  }
}