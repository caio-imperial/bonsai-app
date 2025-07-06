export interface Bonsai {
    _id: string
    name: string
    species: string
    createdAt: string
}

export type BonsResponse = Bonsai | null
