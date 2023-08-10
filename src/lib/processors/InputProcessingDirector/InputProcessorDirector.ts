import fs from 'fs';
import Model from '@lib/models/Model';
import Grafico from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
import InputTranslator from '@lib/processors/InputTranslator/InputTranslator';
import Archi4Interpreter from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
import AoeffInterpreter from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
import { parseXml } from '@lib/utils/parseXml';
import { AoeffModel } from '@lib/interfaces/AoeffModel';
import { ArchiModel } from '@lib/interfaces/ArchiModel';

interface Option {
  skipViews: boolean;
}

type Log = (message?: string, ...optionalParams: Array<any>) => void;

export class InputProcessorDirector {
  private readonly model: any; //TODO: Add Model Type
  private readonly options: Option;
  private readonly log: Log;

  constructor(
    {
      label = 'Archimate Model',
      description = '',
      options = {
        skipViews: false,
      },
    },
    logger?: Console,
  ) {
    if (options.skipViews === undefined) {
      throw new Error(`Invalid options`);
    }

    this.model = new Model(label, description);
    this.options = options;
    this.log = logger && logger.info ? logger.info : () => {};
  }

  private static checkFileType(xmlFile: AoeffModel | ArchiModel) {
    return (modelKey: string): boolean => modelKey in xmlFile && xmlFile[modelKey] !== undefined;
  }

  private static isAoeffXmlClassifier(modelType: string): boolean {
    const aoeffXmlClassifier = 'http://www.opengroup.org/xsd/archimate/3.0/';
    return modelType.localeCompare(aoeffXmlClassifier) === 0;
  }

  private static isArchiFileVersionSupported(archimateModel: ArchiModel): boolean {
    const archimateXmlClassifier = 'http://www.archimatetool.com/archimate';
    const model = archimateModel['archimate:model'];
    const modelVersion = model.$.version;

    return (
      model.$['xmlns:archimate'].localeCompare(archimateXmlClassifier) === 0 &&
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
    );
  }

  async translateModelFile(filePath): Promise<void> {
    let fileString = fs.readFileSync(filePath);

    let xmlFile = await parseXml(fileString);

    if (xmlFile !== null) {
      let interpreter = null;
      const checkFileType = InputProcessorDirector.checkFileType(xmlFile);
      const isAoeffFile = checkFileType('model');

      // Verifying if it's a AOEFF file
      if (isAoeffFile) {
        const aoeffModel = xmlFile as AoeffModel;
        const modelType = aoeffModel.model.$.xmlns;

        if (InputProcessorDirector.isAoeffXmlClassifier(modelType)) {
          interpreter = new AoeffInterpreter(aoeffModel);
        }
      } else {
        const modelKey = 'archimate:model';
        const isArchiFile = checkFileType(modelKey);

        // Verifying if it's an Archi 4 (Archimate 3) file
        if (isArchiFile) {
          const archimateModel = xmlFile as ArchiModel;

          if (InputProcessorDirector.isArchiFileVersionSupported(archimateModel)) {
            interpreter = new Archi4Interpreter(archimateModel);
          } else {
            throw new Error(
              `Archi file version not supported - Version ${archimateModel[modelKey].$.version}`,
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

  async translateModelFolder(folderPath): Promise<void> {
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
