import axios from 'axios';

import { config } from '../../config/config';
import { reduceField } from '../../utils/transformUtils';
import { Drug } from './drug.model';

export const drug = async (obj, args) => {
  console.log(`AQUI DRUG ${args.id}`);
  try {
    return await Drug.findOne({  _id: args.id } ).lean();
  } catch (err) {
    throw new Error(err);
  }
};

const transformOpenFDA = (apiDrug) => ({
  genericName: reduceField(apiDrug.openfda.generic_name),
  pharmClass: reduceField(apiDrug.openfda.pharm_class_epc),
  brandName: reduceField(apiDrug.openfda.brand_name),
  manufacturerName: reduceField(apiDrug.openfda.manufacturer_name),
  productType: reduceField(apiDrug.openfda.product_type),
  route: reduceField(apiDrug.openfda.route)
});

export const drugs = async () => {
  try {
    return await Drug.find({}, function(err, drugs) {
      if (err) throw err;
      console.log(drugs);
    });
  } catch (err) {
    throw new Error(err);
  }
};



export const openFDADrugs = async (obj, args) => {
  try {
    const {url, apiKey} = config.openFDA;
    const { data } = await axios.get(`${url}?api_key=${apiKey}&search=openfda.generic_name:${args.genericName}&limit=100`);
    return data.results.map(transformOpenFDA);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export const addDrug = async ({ 
  name, 
  description,
  type,
  activeIngredient,
  unit,
  concentration,
  presentation,
  quantity }) => {
  
  try {
    const newDrug = new Drug(
      name, 
    description,
    type,
    activeIngredient,
    unit,
    concentration,
    presentation,
    quantity );
    await newDrug.save();
    return newDrug
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteDrug = async (_id) => {
  try {
    Drug.findOneAndRemove(_id, function(err) {
      if (err) throw err;
  });
  } catch (err) {
    throw new Error(err);
  }
};