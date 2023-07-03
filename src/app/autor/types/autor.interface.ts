import { NacionalidadeInterface } from "./nacionalidade.interface"

export interface AutorInterface {
    id: string
    nome: string
    genero: string
    dataNascimento?: string
    biografia?: string
    nacionalidade?: NacionalidadeInterface
}
