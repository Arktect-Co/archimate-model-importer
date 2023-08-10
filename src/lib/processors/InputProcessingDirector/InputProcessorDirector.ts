import fs from 'fs';
import Model from '@lib/models/Model';
import Grafico from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
import InputTranslator from '@lib/processors/InputTranslator/InputTranslator';
import Archi4Interpreter from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
import AoeffInterpreter from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
import { parseXml } from '@lib/utils/parseXml';

interface Option {
  skipViews: boolean;
}

const AOEFF_XML_CLASSIFIER = 'http://www.opengroup.org/xsd/archimate/3.0/';

export class InputProcessorDirector {
  private readonly model: any;
  private readonly options: Option;
  private readonly log: any;

  constructor(
    {
      label = 'Archimate Model',
      description = '',
      options = {
        skipViews: false,
      },
    },
    logger?: any,
  ) {
    if (options.skipViews === undefined) {
      throw new Error(`Invalid options`);
    }

    this.model = new Model(label, description);
    this.options = options;
    this.log = logger && logger.info ? logger.info : () => {};
  }

  async translateModelFile(filePath) {
    let fileString = fs.readFileSync(filePath);

    let xmlFile = await parseXml(fileString);

    if (xmlFile !== null) {
      let interpreter = null;

      // Verifying if it's a AOEFF file
      if ('model' in xmlFile && xmlFile.model !== undefined) {
        let modelType = xmlFile.model.$.xmlns;

        if (modelType.localeCompare(AOEFF_XML_CLASSIFIER) === 0) {
          interpreter = new AoeffInterpreter(xmlFile);
        }
      } else {
        // Verifying if it's an Archi 4 (Archimate 3) file
        if ('archimate:model' in xmlFile && xmlFile['archimate:model'] !== undefined) {
          let modelVersion = xmlFile['archimate:model'].$.version;

          if (
            xmlFile['archimate:model'].$['xmlns:archimate'].localeCompare(
              'http://www.archimatetool.com/archimate',
            ) === 0 &&
            (modelVersion.startsWith('4.0') || // Tested
              modelVersion.startsWith('4.1') ||
              modelVersion.startsWith('4.2') ||
              modelVersion.startsWith('4.3') ||
              modelVersion.startsWith('4.4') || // Tested
              modelVersion.startsWith('4.5') ||
              modelVersion.startsWith('4.6') || // Tested
              modelVersion.startsWith('4.7') ||
              modelVersion.startsWith('4.8') ||
              modelVersion.startsWith('4.9')) // Tested
          ) {
            interpreter = new Archi4Interpreter(xmlFile);
          } else {
            throw new Error(
              `Archi file version not supported - Version ${xmlFile['archimate:model'].$.version}`,
            );
          }
        }
      }

      if (interpreter !== null) {
        try {
          this.model.setModelId(interpreter.getModelId());

          const translator = new InputTranslator(interpreter, this.model, this.options, this.log);

          translator.translate();
        } catch (e) {
          const { message } = e as Error;
          throw new Error(`Input model processing: ${message}`);
        }
      } else {
        throw new Error(`Not compatible model`);
      }
    } else {
      throw new Error(`Invalid model format. Only XML models are accepted`);
    }
  }

  async translateModelFolder(folderPath) {
    // TODO: verify if really is a GRAFICO model
    try {
      let interpreter = new Grafico(folderPath);

      const translator = new InputTranslator(interpreter, this.model, this.log);

      translator.translate();
    } catch (e) {
      const { message } = e as Error;
      throw new Error(`Input model processing: ${message}`);
    }
  }

  getOutputModel() {
    return this.model;
  }
}
