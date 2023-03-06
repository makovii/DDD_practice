import { Provider } from "@nestjs/common";
import { CustomerRepository } from "./customer.repository";


export const CustomerRepoProvider: Provider = {
    provide: 'CustomerRepo',
    useClass: CustomerRepository,
}