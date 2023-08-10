import chai from 'chai';
import deepEqualInAnyOrder from 'deep-equal-in-any-order';
import path from 'path';

import { modelResultArchi } from './modelResults/modelResultArchi';
import { modelResultVisualParadigm } from './modelResults/modelResultVisualParadigm';

import { InputProcessorDirector } from '@lib/processors/InputProcessingDirector/InputProcessorDirector';

chai.use(deepEqualInAnyOrder);

function removeFolderIds(folders) {
  for (let i = 0; i < folders.length; i++) {
    let folder = folders[i];

    if (folder.isDirectory) {
      delete folder.id;
    }

    if (folder.children && folder.children.length > 0) {
      removeFolderIds(folder.children);
    }
  }
}

function removeUndefinedValues(views) {
  for (let i = 0; i < views.length; i++) {
    let view = views[i];

    for (let j = 0; j < view.viewRelationships.length; j++) {
      let rel = view.viewRelationships[j];

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
      let inputProcessorDirector = new InputProcessorDirector({
        label: 'Archi Test',
        description: 'Test model for Archi Files',
      });

      await inputProcessorDirector.translateModelFile(
        path.join(path.dirname(__filename), '/models/migration_guide_3_1.archimate'),
      );

      let response = inputProcessorDirector.getOutputModel();

      delete response.modelsourceid;

      // Removing Folder ids
      removeFolderIds(response.model.landscape);

      // Removing [undefined] values in View Relationships for isBidirectional
      removeUndefinedValues(response.model.views);

      chai.expect(response).to.deep.equalInAnyOrder(modelResultArchi);
    });

    it('Importing Archi Model v4.6 Skipping Views', async () => {
      let inputProcessorDirector = new InputProcessorDirector({
        label: 'Archi Test',
        description: 'Test model for Archi Files',
        options: { skipViews: true },
      });

      await inputProcessorDirector.translateModelFile(
        path.join(path.dirname(__filename), '/models/migration_guide_3_1.archimate'),
      );

      let response = inputProcessorDirector.getOutputModel();

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
      let inputProcessorDirector = new InputProcessorDirector({
        label: 'Archi Test',
        description: 'Test model for Archi Files',
      });

      await inputProcessorDirector.translateModelFile(
        path.join(path.dirname(__filename), '/models/aoeff_3_1.xml'),
      );

      let response = inputProcessorDirector.getOutputModel();

      delete response.modelsourceid;

      // Removing Folder ids
      removeFolderIds(response.model.landscape);

      // Removing [undefined] values in View Relationships for isBidirectional
      removeUndefinedValues(response.model.views);

      // WARNING! Handling AOEFF limitations: Not presenting hided view relationships. This kind of situation isn't
      // exported in AOEFF, so in oder to test the import feature, the removal of this kind of relationships it is necessary
      let deepCopyModelResult = JSON.parse(JSON.stringify(modelResultArchi));

      // Finding view with hided relationships
      let index = deepCopyModelResult.model.views.findIndex(view => view.name === 'Relationships');

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

      chai.expect(response).to.deep.equalInAnyOrder(deepCopyModelResult);
    });

    it('Importing AOEFF for Archimate 3.1 - From Visual Paradigm', async () => {
      let inputProcessorDirector = new InputProcessorDirector({
        label: 'Archi Test',
        description: 'Test model for Archi Files',
      });

      await inputProcessorDirector.translateModelFile(
        path.join(path.dirname(__filename), '/models/aoeff_3_1_visual_paradigm.xml'),
      );

      let response = inputProcessorDirector.getOutputModel();

      delete response.modelsourceid;

      // Removing Folder ids
      removeFolderIds(response.model.landscape);

      // Removing [undefined] values in View Relationships for isBidirectional
      removeUndefinedValues(response.model.views);

      // WARNING! Handling AOEFF limitations: Not presenting hided view relationships. This kind of situation isn't
      // exported in AOEFF, so in oder to test the import feature, the removal of this kind of relationships it is necessary
      let deepCopyModelResult = JSON.parse(JSON.stringify(modelResultVisualParadigm));

      // Finding view with hided relationships
      let index = deepCopyModelResult.model.views.findIndex(view => view.name === 'Relationships');

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

      chai.expect(response).to.deep.equalInAnyOrder(deepCopyModelResult);
    });
  });

  describe('GRAFICO Import', () => {
    it('Importing GRAFICO for Archi 4.6', async () => {
      let inputProcessorDirector = new InputProcessorDirector({
        label: 'Archi Test',
        description: 'Test model for Archi Files',
      });

      await inputProcessorDirector.translateModelFolder(
        path.join(path.dirname(__filename), '/models/grafico'),
      );

      let response = inputProcessorDirector.getOutputModel();

      delete response.modelsourceid;

      // Removing Folder ids
      removeFolderIds(response.model.landscape);

      // Removing [undefined] values in View Relationships for isBidirectional
      removeUndefinedValues(response.model.views);

      chai.expect(response).to.deep.equalInAnyOrder(modelResultArchi);
    });
  });
});
