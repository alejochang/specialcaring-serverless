import {
  drug, 
  drugs, 
  openFDADrugs,
  addDrug, 
  deleteDrug
} from './drug/drug.resolvers';

export const resolvers = {
  Query: {
    drug,
    drugs,
    openFDADrugs
  },
  Mutation: {
    addDrug, 
    deleteDrug
  }
};