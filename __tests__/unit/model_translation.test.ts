import chai from 'chai';
import deepEqualInAnyOrder from 'deep-equal-in-any-order';
import path from 'path';

import { modelResultArchi } from './modelResults/modelResultArchi';
import { modelResultVisualParadigm } from './modelResults/modelResultVisualParadigm';
import { modelResultArchi5 } from './modelResults/modelResultArchi5';

import { InputProcessorDirector } from '@lib/processors/InputProcessingDirector/InputProcessorDirector';
import { Landscape, View } from '../../src/lib/common/interfaces/model';
import { Model } from '../../src/lib/models/Model';

chai.use(deepEqualInAnyOrder);

/**
 * Removes the relationship and return a model copy.
 * WARNING! Handling AOEFF limitations: Not presenting hided view relationships. This kind of situation isn't
 * exported in AOEFF, so in oder to test the import feature, the removal of this kind of relationships it is necessary
 * @param model model result
 */
function removeViewRelationship(model: Partial<Model>): Model {
  const deepCopyModelResult = JSON.parse(JSON.stringify(model));

  // Finding view with hided relationships
  const index = deepCopyModelResult.model.views.findIndex(view => view.name === 'Relationships');

  if (index !== -1) {
    // Finding and Removing Grouping -> Goal relationship
    deepCopyModelResult.model.views[index].viewRelationships = deepCopyModelResult.model.views[
      index
    ].viewRelationships.filter(rel => {
      return rel.viewRelationshipId !== '6ac44a09-fb7a-4d2f-94da-0a45854b63cb';
    });

    // Finding and Removing Grouping -> Driver relationship
    deepCopyModelResult.model.views[index].viewRelationships = deepCopyModelResult.model.views[
      index
    ].viewRelationships.filter(rel => {
      return rel.viewRelationshipId !== 'd45c553a-9a77-4ced-a77b-7b9ebfaa0743';
    });
  }

  return deepCopyModelResult;
}

/**
 * Removes folders Id
 * @param folders
 */
function removeFolderIds(folders: Array<Landscape>): void {
  for (const folder of folders) {
    if (folder.isDirectory) {
      delete folder.id;
    }

    if (folder.children && folder.children.length > 0) {
      removeFolderIds(folder.children);
    }
  }
}

/**
 * Remove undefined values of views
 * @param views
 */
function removeUndefinedValues(views: Array<View>): void {
  for (const view of views) {
    for (const rel of view.viewRelationships) {
      if (rel.isBidirectional === undefined) {
        delete rel.isBidirectional;
      }

      if (rel.modelRelationshipId === undefined) {
        delete rel.modelRelationshipId;
      }
    }
  }
}

describe('Model Translation', () => {
  describe('Archi Import', () => {
    it('Importing Archi Model v4.6', async () => {
      const inputProcessorDirector = new InputProcessorDirector({
        label: 'Archi Test',
        description: 'Test model for Archi Files',
      });

      await inputProcessorDirector.translateModelFile(
        path.join(path.dirname(__filename), '/models/migration_guide_3_1.archimate'),
      );

      const response = inputProcessorDirector.getOutputModel();

      delete response.modelsourceid;

      // Removing Folder ids
      removeFolderIds(response.model.landscape);

      // Removing [undefined] values in View Relationships for isBidirectional
      removeUndefinedValues(response.model.views);

      chai.expect(response).to.deep.equalInAnyOrder(modelResultArchi);
    });

    it('Importing Archi Model v5.0', async () => {
      const inputProcessorDirector = new InputProcessorDirector({
        label: 'Archi Test v5',
        description: 'Test model for Archi Files',
      });

      await inputProcessorDirector.translateModelFile(
        path.join(path.dirname(__filename), '/models/archi_v5.archimate'),
      );

      const response = inputProcessorDirector.getOutputModel();

      delete response.modelsourceid;

      // Removing Folder ids
      removeFolderIds(response.model.landscape);

      // Removing [undefined] values in View Relationships for isBidirectional
      removeUndefinedValues(response.model.views);

      chai.expect(response).to.deep.equalInAnyOrder(modelResultArchi5);
    });

    it('Importing Archi Model v5.0 Skipping Views', async () => {
      const inputProcessorDirector = new InputProcessorDirector({
        label: 'Archi Test v5',
        description: 'Test model for Archi Files',
        options: { skipViews: true },
      });

      await inputProcessorDirector.translateModelFile(
        path.join(path.dirname(__filename), '/models/archi_v5.archimate'),
      );

      const response = inputProcessorDirector.getOutputModel();

      delete response.modelsourceid;

      chai.expect(response.model.nodes).to.deep.equalInAnyOrder(modelResultArchi5.model.nodes);
      chai
        .expect(response.model.relationships)
        .to.deep.equalInAnyOrder(modelResultArchi5.model.relationships);
      chai.expect(response.model.views).to.be.empty;
      chai.expect(response.model.landscape).to.be.empty;
    });

    it('Importing Archi Model v4.6 Skipping Views', async () => {
      const inputProcessorDirector = new InputProcessorDirector({
        label: 'Archi Test',
        description: 'Test model for Archi Files',
        options: { skipViews: true },
      });

      await inputProcessorDirector.translateModelFile(
        path.join(path.dirname(__filename), '/models/migration_guide_3_1.archimate'),
      );

      const response = inputProcessorDirector.getOutputModel();

      delete response.modelsourceid;

      chai.expect(response.model.nodes).to.deep.equalInAnyOrder(modelResultArchi.model.nodes);
      chai
        .expect(response.model.relationships)
        .to.deep.equalInAnyOrder(modelResultArchi.model.relationships);
      chai.expect(response.model.views).to.be.empty;
      chai.expect(response.model.landscape).to.be.empty;
    });
  });

  describe('AOEFF Import', () => {
    it('Importing AOEFF for Archimate 3.1 - From Archi', async () => {
      const inputProcessorDirector = new InputProcessorDirector({
        label: 'Archi Test',
        description: 'Test model for Archi Files',
      });

      await inputProcessorDirector.translateModelFile(
        path.join(path.dirname(__filename), '/models/aoeff_3_1.xml'),
      );

      const response = inputProcessorDirector.getOutputModel();

      delete response.modelsourceid;

      // Removing Folder ids
      removeFolderIds(response.model.landscape);

      // Removing [undefined] values in View Relationships for isBidirectional
      removeUndefinedValues(response.model.views);

      // WARNING! Handling AOEFF limitations: Not presenting hided view relationships. This kind of situation isn't
      // exported in AOEFF, so in oder to test the import feature, the removal of this kind of relationships it is necessary
      const deepCopyModelResult = removeViewRelationship(modelResultArchi);

      chai.expect(response).to.deep.equalInAnyOrder(deepCopyModelResult);
    });

    it('Importing AOEFF for Archimate 3.1 - From Archi v5', async () => {
      const inputProcessorDirector = new InputProcessorDirector({
        label: 'Archi Test v5',
        description: 'Test model for Archi Files',
      });

      await inputProcessorDirector.translateModelFile(
        path.join(path.dirname(__filename), '/models/aoeff_3_1_archi_5_0_2.xml'),
      );

      const response = inputProcessorDirector.getOutputModel();

      delete response.modelsourceid;

      // Removing Folder ids
      removeFolderIds(response.model.landscape);

      // Removing [undefined] values in View Relationships for isBidirectional
      removeUndefinedValues(response.model.views);

      // WARNING! Handling AOEFF limitations: Not presenting hided view relationships. This kind of situation isn't
      // exported in AOEFF, so in oder to test the import feature, the removal of this kind of relationships it is necessary
      const deepCopyModelResult = removeViewRelationship(modelResultArchi5);

      chai.expect(response).to.deep.equalInAnyOrder(deepCopyModelResult);
    });

    it('Importing AOEFF for Archimate 3.1 - From Visual Paradigm', async () => {
      const inputProcessorDirector = new InputProcessorDirector({
        label: 'Archi Test',
        description: 'Test model for Archi Files',
      });

      await inputProcessorDirector.translateModelFile(
        path.join(path.dirname(__filename), '/models/aoeff_3_1_visual_paradigm.xml'),
      );

      const response = inputProcessorDirector.getOutputModel();

      delete response.modelsourceid;

      // Removing Folder ids
      removeFolderIds(response.model.landscape);

      // Removing [undefined] values in View Relationships for isBidirectional
      removeUndefinedValues(response.model.views);

      // WARNING! Handling AOEFF limitations: Not presenting hided view relationships. This kind of situation isn't
      // exported in AOEFF, so in oder to test the import feature, the removal of this kind of relationships it is necessary
      const deepCopyModelResult = removeViewRelationship(modelResultVisualParadigm);

      chai.expect(response).to.deep.equalInAnyOrder(deepCopyModelResult);
    });
  });

  describe('GRAFICO Import', () => {
    it('Importing GRAFICO for Archi 4.6', async () => {
      const inputProcessorDirector = new InputProcessorDirector({
        label: 'Archi Test',
        description: 'Test model for Archi Files',
      });

      await inputProcessorDirector.translateModelFolder(
        path.join(path.dirname(__filename), '/models/grafico'),
      );

      const response = inputProcessorDirector.getOutputModel();

      delete response.modelsourceid;

      // Removing Folder ids
      removeFolderIds(response.model.landscape);

      // Removing [undefined] values in View Relationships for isBidirectional
      removeUndefinedValues(response.model.views);

      chai.expect(response).to.deep.equalInAnyOrder(modelResultArchi);
    });
  });
});
