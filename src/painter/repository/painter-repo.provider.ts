import { Provider } from "@nestjs/common";
import { PainterRepository } from "./painter.repository";



export const PainterRepoProvider: Provider = {
    provide: 'PainterRepo',
    useClass: PainterRepository,
}