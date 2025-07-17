export interface Bonsai {
  _id: string
  name: string
  species: string
  favorite: boolean
  createdAt: Date
}

export type CreateBonsai = Omit<Bonsai, '_id' | 'createdAt'>

export type BonsaisResponse = {
  data: Bonsai[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
    nextPage: number
    previousPage: number
  }
}
