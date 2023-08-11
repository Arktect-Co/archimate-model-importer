import { Model } from '@lib/models/Model';
import { expect, use } from 'chai';
import deepEqualInAnyOrder from 'deep-equal-in-any-order';

use(deepEqualInAnyOrder);

describe('Model', () => {
  describe('createViewElement', () => {
    const viewElementInput = {
      type: 'group',
      modelNodeId: '93d885b0',
      height: 100,
      width: 80,
      y: 30,
      x: 10,
      viewNodeId: 'ebc607cd',
    };
    it('should return a view element with the default name if the name is not defined', () => {
      const viewElement = Model.createViewElement(viewElementInput);

      expect(viewElement).to.deep.equalInAnyOrder({
        name: 'Unknown Name',
        ...viewElementInput,
        parent: undefined,
      });
    });
  });
});
