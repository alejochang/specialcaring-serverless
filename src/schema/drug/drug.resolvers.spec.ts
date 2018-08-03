import 'mocha';
import { transformOpenFDA } from './drug.resolvers';
import { expect } from 'chai';

describe('Drug resolvers', () => {
  describe('transformOpenFDA', () => {
    it('should properly transform openfda', () => {
      const transformed = transformOpenFDA({
        openfda: {
          generic_name: ['generic_name'],
          pharm_class_epc: ['pharm_class_epc'],
          brand_name: ['brand_name'],
          manufacturer_name: ['manufacturer_name'],
          product_type: [],
          route: ['route', 'route']
        }
      });
      const expectedResult = {
        genericName: 'generic_name',
        pharmClass: 'pharm_class_epc',
        brandName: 'brand_name',
        manufacturerName: 'manufacturer_name',
        productType: '',
        route: 'route route'
      };
      expect(transformed).to.deep.equal(expectedResult);
    });
  });
});