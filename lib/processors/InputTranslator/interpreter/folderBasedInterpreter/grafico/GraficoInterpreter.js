const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

const UNKNOWN = "Unknown Name";

class GraficoInterpreter {

    constructor(modelPath) {
        this.modelPath = path.join(modelPath, "model");
        this.modelid = "";
        this.isNestedDiagramStructure = true;
        this.hasViewElementChildRelationships = true;
    }

    _getFirstPropertyName(jsonObj) {
        for (let key in jsonObj) {
            if (jsonObj.hasOwnProperty(key)) {
                return key;
            }
        }
    }

    getModelId() {
        return this.modelid;
    }

    getNodeId(node) {
        return node[this._getFirstPropertyName(node)].$.id;
    }

    getNodeName(node) {
        return node[this._getFirstPropertyName(node)].$.name || UNKNOWN;
    }

    getNodeType(node) {
        return this._getFirstPropertyName(node).replace("archimate\:", "");
    }

    getNodeDocumentation(node) {
        return node[this._getFirstPropertyName(node)].$.documentation || null;
    }

    getNodeJunctionType(node) {
        let type = node[this._getFirstPropertyName(node)].$.type;

        if (type === undefined) { // AND junction
            return "AndJunction";
        } else {
            return "OrJunction";
        }
    }

    getNodeProperties(node) {
        return node[this._getFirstPropertyName(node)].properties || [];
    }

    getPropertyEntry(property) {
        if (property && property.$ && property.$.key && property.$.value) {
            return [property.$.key, property.$.value];
        } else {
            return [];
        }
    }

    getRelationshipId(relationship) {
        return relationship[this._getFirstPropertyName(relationship)].$.id;
    }

    getRelationshipName(relationship) {
        let name = relationship[this._getFirstPropertyName(relationship)].$.name;

        if (name !== undefined) {
            return name;
        }

        return "";
    }

    getRelationshipSourceId(relationship) {
        return relationship[this._getFirstPropertyName(relationship)].source[0].$.href.replace(/.*#(.*)/g, '$1');
    }

    getRelationshipTargetId(relationship) {
        return relationship[this._getFirstPropertyName(relationship)].target[0].$.href.replace(/.*#(.*)/g, '$1');
    }

    getRelationshipType(relationship) {
        return this._getFirstPropertyName(relationship).replace("archimate\:", "");
    }

    getAccessRelationshipDirection(relationship) {
        if (relationship[this._getFirstPropertyName(relationship)].$.accessType === undefined) {
            return {
                source: false,
                target: true
            }
        } else {
            switch (relationship[this._getFirstPropertyName(relationship)].$.accessType) {
                case "1":
                    return {
                        source: true,
                        target: false
                    };
                case "2":
                    return {
                        source: false,
                        target: false
                    };
                case "3":
                    return {
                        source: true,
                        target: true
                    }
            }
        }
    }

    getAssociationRelationshipIsDirected(relationship) {
        let isDirected = relationship[this._getFirstPropertyName(relationship)].$.directed;

        if (isDirected === undefined) {
            return false;
        } else {
            return isDirected;
        }
    }

    getFolderName(folder) {
        let folderName = null;
        let _self = this;
        const filePath = path.join(folder, "folder.xml");

        if (fs.existsSync(filePath)) {
            let data = fs.readFileSync(filePath);

            let parser = new xml2js.Parser({explicitArray: true});

            parser.parseString(data, function (err, folderData) {
                folderName = folderData[_self._getFirstPropertyName(folderData)].$.name; // Seems to be wrong (async), but actually is sync behaviour
            });
        }

        return folderName || UNKNOWN;
    }

    getSubFolders(folder) {
        let folders = [];

        if (fs.existsSync(folder) && fs.lstatSync(folder).isDirectory()) {
            fs.readdirSync(folder).map(name => {
                if (fs.statSync(path.join(folder, name)).isDirectory()) {
                    folders.push(path.join(folder, name));
                }
            });
        }

        return folders;
    }

    getFolderViews(folder) {
        let diagrams = [];

        if (fs.existsSync(folder) && fs.lstatSync(folder).isDirectory()) {
            fs.readdirSync(folder).map(name => {
                if (name.localeCompare("folder.xml") !== 0 && fs.statSync(path.join(folder, name)).isFile()) {
                    let data = fs.readFileSync(path.join(folder, name));

                    let parser = new xml2js.Parser({explicitArray: true});

                    parser.parseString(data, function (err, diagramData) {
                        diagrams.push(diagramData);
                    });
                }
            });
        }

        return diagrams;
    }

    getViewElements(view) {
        return view[this._getFirstPropertyName(view)].children;
    }

    getViewId(view) {
        return view[this._getFirstPropertyName(view)].$.id;
    }

    getViewName(view) {
        return view[this._getFirstPropertyName(view)].$.name || UNKNOWN;
    }

    getViewElementViewId(viewElement) {
        return viewElement.$.id;
    }

    getViewElementModelId(viewElement) {
        return viewElement.archimateElement[0].$.href.replace(/.*#(.*)/g, '$1');
    }

    getViewElementPositionX(viewElement, parentId, parentViewElements) {
        return parseInt(viewElement.bounds[0].$.x, 0);
    }

    getViewElementPositionY(viewElement, parentId, parentViewElements) {
        return parseInt(viewElement.bounds[0].$.y, 0);
    }

    getViewElementWidth(viewElement) {
        return parseInt(viewElement.bounds[0].$.width, 0);
    }

    getViewElementHeight(viewElement) {
        return parseInt(viewElement.bounds[0].$.height, 0);
    }

    getViewElementSourceRelationships(viewElement) {
        return viewElement.sourceConnections;
    }

    getViewElementNestedElements(viewElement) {
        return viewElement.children || [];
    }

    findViewElement(viewElements, id) {
        if (Array.isArray(viewElements)) {
            for (let i = 0; i < viewElements.length; i++) {
                const element = viewElements[i];

                if (element.$.id.localeCompare(id) === 0) {
                    return element;
                }

                const child = this.getViewElementNestedElements(element);

                if (child !== undefined) {
                    let result = this.findViewElement(child, id);

                    if (result !== null) {
                        return result;
                    }
                }
            }
        }

        return null;
    }

    findViewElementParent(viewElements, id) {
        if (Array.isArray(viewElements)) {
            for (let i = 0; i < viewElements.length; i++) {
                const element = viewElements[i];

                const child = this.getViewElementNestedElements(element);

                if (child !== undefined) {
                    let response = this.findViewElementParent(child, id);

                    if (response !== null) {
                        return response;
                    } else {
                        for (let j = 0; j < child.length; j++) {
                            const childElement = child[j];

                            if (childElement.$.id.localeCompare(id) === 0) {
                                return element;
                            }
                        }
                    }
                }
            }
        }

        return null;
    }

    calculateNestedPosition(viewElements, id) {
        if (Array.isArray(viewElements)) {
            for (let i = 0; i < viewElements.length; i++) {
                const element = viewElements[i];

                const child = this.getViewElementNestedElements(element);

                if (child !== undefined) {
                    let response = this.calculateNestedPosition(child, id);

                    if (response !== null) {
                        let x = this.getViewElementPositionX(element) || 0;
                        let y = this.getViewElementPositionY(element) || 0;

                        response.x += x;
                        response.y += y;

                        return response;
                    } else {
                        for (let j = 0; j < child.length; j++) {
                            const childElement = child[j];

                            if (childElement.$.id.localeCompare(id) === 0) {

                                return {x: this.getViewElementPositionX(element), y: this.getViewElementPositionY(element)};
                            }
                        }
                    }
                }
            }
        }

        return null;
    }

    getViewNoteContent(viewElement) {
        if (viewElement.$.content !== undefined) {
            if (typeof viewElement.$.content === "string") {
                return viewElement.$.content;
            } else {
                return viewElement.$.content[0];
            }
        }

        return "No Content";
    }

    getViewGroupName(viewElement) {
        if (viewElement.$.name !== undefined) {
            return viewElement.$.name;
        }

        return UNKNOWN;
    }

    getViewRelationshipBendpoints(viewRelationship) {
        return viewRelationship.bendpoints;
    }

    getViewRelationshipBendpoint(bendpoint, bendpointIndex, bendpointsLength, sourceViewElement, targetViewElement, viewNodes) {
        let sourceParentPositionIncrement = this.calculateNestedPosition(viewNodes, sourceViewElement.$.id);
        let targetParentPositionIncrement = this.calculateNestedPosition(viewNodes, targetViewElement.$.id);
        let sourceIncrementX = 0;
        let sourceIncrementY = 0;
        let targetIncrementX = 0;
        let targetIncrementY = 0;
        let sx = parseInt(bendpoint.$.startX, 0) || 0;
        let sy = parseInt(bendpoint.$.startY, 0) || 0;
        let ex = parseInt(bendpoint.$.endX, 0) || 0;
        let ey = parseInt(bendpoint.$.endY, 0) || 0;

        let sourceWidth = parseInt(sourceViewElement.bounds[0].$.width, 0);
        let sourceHeight = parseInt(sourceViewElement.bounds[0].$.height, 0);
        let targetWidth = parseInt(targetViewElement.bounds[0].$.width, 0);
        let targetHeight = parseInt(targetViewElement.bounds[0].$.height, 0);

        if (sourceParentPositionIncrement !== null) {
            sourceIncrementX = sourceParentPositionIncrement.x;
            sourceIncrementY = sourceParentPositionIncrement.y;
        }

        if (targetParentPositionIncrement !== null) {
            targetIncrementX = targetParentPositionIncrement.x;
            targetIncrementY = targetParentPositionIncrement.y;
        }

        let sourcePositionX = parseInt(sourceViewElement.bounds[0].$.x, 0) + sourceIncrementX;
        let sourcePositionY = parseInt(sourceViewElement.bounds[0].$.y, 0) + sourceIncrementY;
        let targetPositionX = parseInt(targetViewElement.bounds[0].$.x, 0) + targetIncrementX;
        let targetPositionY = parseInt(targetViewElement.bounds[0].$.y, 0) + targetIncrementY;
        let weight = (bendpointIndex + 1) / (bendpointsLength + 1);

        let x = (sourcePositionX + sx + sourceWidth / 2) * (1.0 - weight) +
            weight * (targetPositionX + ex + targetWidth / 2);
        let y = (sourcePositionY + sy + sourceHeight / 2) * (1.0 - weight) +
            weight * (targetPositionY + ey + targetHeight / 2);

        return {x: parseInt(x, 0), y: parseInt(y, 0)};
    }

    getViewRelationshipModelId(viewRelationship) {
        return viewRelationship.archimateRelationship ? viewRelationship.archimateRelationship[0].$.href.replace(/.*#(.*)/g, '$1') : null;
    }

    getViewRelationshipId(viewRelationship) {
        return viewRelationship.$.id;
    }

    getViewRelationshipSourceElementId(viewRelationship) {
        return viewRelationship.$.source;
    }

    getViewRelationshipTargetElementId(viewRelationship) {
        return viewRelationship.$.target;
    }

    getOrganizationFolders() {
        return [path.join(this.modelPath, "diagrams")];
    }

    validate() {
        return fs.existsSync(path.join(this.modelPath, "diagrams")) &&
            fs.existsSync(path.join(this.modelPath, "relations")) &&
            fs.existsSync(path.join(this.modelPath, "folder.xml"));
    }

    forEachViewRelationship(view, action) {

    }

    forEachModelNode(action) {
        let nodeFolders = ["strategy", "motivation", "business", "application", "technology", "implementation_migration", "other"];

        nodeFolders.forEach((folder) => {
            let nodeDirectory = path.join(this.modelPath, folder);

            if (fs.existsSync(nodeDirectory) && fs.lstatSync(nodeDirectory).isDirectory()) {
                fs.readdirSync(nodeDirectory).map(name => {
                    const filePath = path.join(nodeDirectory, name);

                    if (name.localeCompare("folder.xml") !== 0 && fs.lstatSync(filePath).isFile()) {
                        let data = fs.readFileSync(filePath);

                        let parser = new xml2js.Parser({explicitArray: true});

                        parser.parseString(data, function (err, nodeData) {
                            action(nodeData);
                        });
                    }
                });
            }
        });
    }

    forEachModelRelationship(action) {
        let relationshipDirectory = path.join(this.modelPath, "relations");

        if (fs.existsSync(relationshipDirectory) && fs.lstatSync(relationshipDirectory).isDirectory()) {
            fs.readdirSync(relationshipDirectory).map(name => {
                const filePath = path.join(relationshipDirectory, name);

                if (name.localeCompare("folder.xml") !== 0 && fs.lstatSync(filePath).isFile()) {
                    let data = fs.readFileSync(filePath);

                    let parser = new xml2js.Parser({explicitArray: true});

                    parser.parseString(data, function (err, relationshipData) {
                        action(relationshipData);
                    });
                }
            });
        }
    }

    forEachDiagram(action) {
        return null;
    }

    isAccessRelationship(relationship) {
        return this._getFirstPropertyName(relationship).localeCompare("archimate:AccessRelationship") === 0;
    }

    isAssociationRelationship(relationship) {
        return this._getFirstPropertyName(relationship).localeCompare("archimate:AssociationRelationship") === 0;
    }

    isViewObject(viewElement) {
        return viewElement.$["xsi:type"].localeCompare("archimate:DiagramModelArchimateObject") === 0;
    }

    isViewNote(viewElement) {
        return viewElement.$["xsi:type"].localeCompare("archimate:DiagramModelNote") === 0;
    }

    isViewGroup(viewElement) {
        return viewElement.$["xsi:type"].localeCompare("archimate:DiagramModelGroup") === 0;
    }

    isJunctionNode(node) {
        return this._getFirstPropertyName(node).localeCompare("archimate:Junction") === 0;
    }

    hasViewElementWithChildRelationships() {
        return this.hasViewElementChildRelationships;
    }
}

module.exports = GraficoInterpreter;