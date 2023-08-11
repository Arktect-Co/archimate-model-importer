import { Model } from '@lib/models/Model';
import { expect, use } from 'chai';
import deepEqualInAnyOrder from 'deep-equal-in-any-order';

use(deepEqualInAnyOrder);

describe('Model', () => {
  describe('createViewElement', () => {
    const elementInput = {
      type: 'group',
      modelNodeId: '93d885b0',
      height: 100,
      width: 80,
      y: 30,
      x: 10,
      viewNodeId: 'ebc607cd',
    };
    it('should return a view element with the default name if the name is not defined', () => {
      const viewElement = Model.createViewElement(elementInput);

      expect(viewElement).to.deep.equalInAnyOrder({
        name: 'Unknown Name',
        ...elementInput,
        parent: undefined,
      });
    });

    it('should return a view element with parent', () => {
      const parent = '94d885b0';
      const viewElement = Model.createViewElement({ ...elementInput, parent });

      expect(viewElement).to.deep.equalInAnyOrder({
        name: 'Unknown Name',
        ...elementInput,
        parent,
      });
    });

    it('should return a view element', () => {
      const name = 'View Element 1';
      const viewElement = Model.createViewElement({ ...elementInput, name });

      expect(viewElement).to.deep.equalInAnyOrder({
        name,
        ...elementInput,
        parent: undefined,
      });
    });
  });
});
