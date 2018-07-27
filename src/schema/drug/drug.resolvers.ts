import axios from 'axios';
import { Drug } from './drug.model';

export const drug = async (_id) => {
  try {
    return await Drug.findOne(_id).lean();
  } catch (err) {
    throw new Error(err);
  }
};

const transformOpenFDA = (apiDrug) => ({
  genericName: apiDrug.openfda.generic_name.join(' '),
  pharmClass: apiDrug.openfda.pharm_class_epc.join(' '),
  brandName: apiDrug.openfda.brand_name.join(' '),
  manufacturerName: apiDrug.openfda.manufacturer_name.join(' '),
  productType: apiDrug.openfda.product_type.join(' '),
  route: apiDrug.openfda.route.join(' ')
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



export const openFDADrugs = async () => {
  try {
    const { data } = await axios.get('https://api.fda.gov/drug/label.json?api_key=1zqk60G3uwAtGelalCTHTV1sHbesgrFfaFzTW7Z7&search=openfda.generic_name:lorazepam&limit=100');
    console.log(data.results);
    console.log(data.results.map(transformOpenFDA));
    return data.results.map(transformOpenFDA); // (Or whatever)
  } catch (err) {
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