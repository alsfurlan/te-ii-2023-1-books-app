import { NacionalidadeInterface } from "./nacionalidade.interface"

export interface AutorInterface {
    id: number
    nome: string
    genero: string
    dataNascimento?: string
    biografia?: string
    nacionalidade?: NacionalidadeInterface
}
