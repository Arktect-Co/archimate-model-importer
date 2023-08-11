import fs from 'fs';
import { Model } from '@lib/models/Model';
import Grafico from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
import InputTranslator from '@lib/processors/InputTranslator/InputTranslator';
import Archi4Interpreter from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
import AoeffInterpreter from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
import { parseXml } from '@lib/common/utils/parseXml';
import { AoeffModel } from '@lib/interfaces/AoeffModel';
import { ArchiModel } from '@lib/interfaces/ArchiModel';

interface Option {
  skipViews: boolean;
}

interface InputProcessorDirectorSettings {
  label?: string;
  description?: string;
  options?: Option;
}

type Log = (message?: string) => void;

export class InputProcessorDirector {
  private readonly model: any; //TODO: Add Model Type
  private readonly options: Option;
  private readonly log: Log;

  /**
   * @param settings Input Processor Director Settings
   * @param [settings.label = 'Archimate Model'] Model label
   * @param [settings.description = ''] Model description
   * @param [settings.options = { skipViews: false }] Model options
   * @param logger Console object
   */
  constructor(settings: InputProcessorDirectorSettings, logger?: Console) {
    const {
      label = 'Archimate Model',
      description = '',
      options = {
        skipViews: false,
      },
    } = settings;

    if (options.skipViews === undefined) {
      throw new Error(`Invalid options`);
    }

    this.model = new Model(label, description);
    this.options = options;
    this.log = logger && logger.info ? logger.info : () => {};
  }

  /**
   * Returns a function to validate the model type based on a model key
   * @param xmlFile Xml file model
   * @private
   * @example
   * import fs from 'fs';
   * import { parseXml } from '@lib/utils/parseXml';
   *
   * let xmlFile;
   * const fileString = fs.readFileSync("<rootfolder>/file.aoeff_3_1.xml");
   * parseXml(fileString).then(model => {
   *   xmlFile = model
   * });
   *
   * const checkFileType = InputProcessorDirector.checkFileType(xmlFile);
   * const isAoeffFile = checkFileType('model');
   */
  private static checkFileType(xmlFile: AoeffModel | ArchiModel) {
    return (modelKey: string): boolean => modelKey in xmlFile && xmlFile[modelKey] !== undefined;
  }

  /**
   * Check that the model type is an AOEFF xml
   * @param modelType Model type
   * @private
   * @return boolean
   * @example
   * InputProcessorDirector.isAoeffXmlClassifier('http://www.opengroup.org/xsd/archimate/3.0/');
   */
  private static isAoeffXmlClassifier(modelType: string): boolean {
    const aoeffXmlClassifier = 'http://www.opengroup.org/xsd/archimate/3.0/';
    return modelType.localeCompare(aoeffXmlClassifier) === 0;
  }

  /**
   * Checks that the model type is an Archi xml and that the version is supported
   * @param archiModel Archi Model
   * @private
   * @return boolean
   * @example
   * import fs from 'fs';
   * import { parseXml } from '@lib/utils/parseXml';
   *
   * let xmlFile;
   * const fileString = fs.readFileSync("<rootfolder>/file.archimate") // Archi file;
   * parseXml(fileString).then(model => {
   *   xmlFile = model
   * });
   *
   * InputProcessorDirector.isArchiFileVersionSupported(xmlFile)
   */
  private static isArchiFileVersionSupported(archiModel: ArchiModel): boolean {
    const archimateXmlClassifier = 'http://www.archimatetool.com/archimate';
    const model = archiModel['archimate:model'];
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

  /**
   * Translates the model file into a form of an instance of the Model class.
   * @param filePath File path
   * @example
   * import { InputProcessorDirector } from '@lib/processors/InputProcessingDirector/InputProcessorDirector';
   * let inputProcessorDirector = new InputProcessorDirector({
   *         label: 'Archi Test',
   *         description: 'Test model for Archi Files',
   *       });
   *
   * await inputProcessorDirector.translateModelFile(
   *        "<rootfolder>/file.archimate"
   * );
   *
   * const response = inputProcessorDirector.getOutputModel();
   */
  async translateModelFile(filePath): Promise<void> {
    const fileString = fs.readFileSync(filePath);

    const xmlFile = await parseXml(fileString);

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

  /**
   * Translates the graphic model folder into a form of an instance of the Model class.
   * @param folderPath
   * @example
   * import { InputProcessorDirector } from '@lib/processors/InputProcessingDirector/InputProcessorDirector';
   *
   * const inputProcessorDirector = new InputProcessorDirector({
   *         label: 'Archi Test',
   *         description: 'Test model for Archi Files',
   *       });
   *
   * await inputProcessorDirector.translateModelFolder(
   *       "<rootfolder>/grafico",
   * );
   * const response = inputProcessorDirector.getOutputModel();
   */
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

  /**
   * Returns an instance of the Model class.
   */
  getOutputModel() {
    return this.model;
  }
}
