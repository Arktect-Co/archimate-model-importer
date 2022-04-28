const fs = require("fs");
const xml2js = require("xml2js");
const Model = require("../../models/Model");
const Grafico = require("../InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter");
const InputTranslator = require("../InputTranslator/InputTranslator");
const Archi4Interpreter = require("../InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter");
const AoeffInterpreter = require("../InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter");

const AOEFF_XML_CLASSIFIER = "http://www.opengroup.org/xsd/archimate/3.0/";

async function parseXml(fileString) {
    return new Promise((resolve, reject) => {
        let parser = new xml2js.Parser({explicitArray: true});

        parser.parseString(fileString, function (error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

class InputProcessorDirector {
    constructor({
                    label = "Archimate Model",
                    description = "",
                    options = {
                        skipViews: false
                    }
                }, logger) {
        if(options.skipViews === undefined){
            throw new Error(`Invalid options`);
        }

        this.model = new Model(label, description);
        this.options = options;
        this.log = logger && logger.info ? logger.info : () => {
        };
    }

    async translateModelFile(filePath) {
        let fileString = fs.readFileSync(filePath);

        let xmlFile = await parseXml(fileString);

        if (xmlFile !== null) {
            let interpreter = null;

            // Verifying if it's a AOEFF file
            if (xmlFile.model !== undefined) {
                let modelType = xmlFile.model.$.xmlns;

                if (modelType.localeCompare(AOEFF_XML_CLASSIFIER) === 0) {
                    interpreter = new AoeffInterpreter(xmlFile);
                }
            } else {
                // Verifying if it's an Archi 4 (Archimate 3) file
                if (xmlFile["archimate:model"] !== undefined) {
                    let modelVersion = xmlFile["archimate:model"].$.version;

                    if (xmlFile["archimate:model"].$["xmlns:archimate"].localeCompare("http://www.archimatetool.com/archimate") === 0 &&
                        (
                            modelVersion.startsWith("4.0") || // Tested
                            modelVersion.startsWith("4.1") ||
                            modelVersion.startsWith("4.2") ||
                            modelVersion.startsWith("4.3") ||
                            modelVersion.startsWith("4.4") || // Tested
                            modelVersion.startsWith("4.5") ||
                            modelVersion.startsWith("4.6") || // Tested
                            modelVersion.startsWith("4.7") ||
                            modelVersion.startsWith("4.8") ||
                            modelVersion.startsWith("4.9") // Tested
                        )
                    ) {
                        interpreter = new Archi4Interpreter(xmlFile);
                    } else {
                        throw new Error(`Archi file version not supported - Version ${xmlFile["archimate:model"].$.version}`);
                    }
                }
            }

            if (interpreter !== null) {
                try {
                    this.model.setModelId(interpreter.getModelId());

                    const translator = new InputTranslator(interpreter, this.model, this.options, this.log);

                    translator.translate();
                } catch (e) {
                    throw new Error(`Input model processing: ${e.message}`);
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
            throw new Error(`Input model processing: ${e.message}`);
        }
    }

    getOutputModel() {
        return this.model;
    }
}

module.exports = InputProcessorDirector;