const UNKNOWN = "Unknown Name";

class Archi4Interpreter {

    constructor(model) {
        this.model = model;
        this.modelid = model["archimate:model"].$["id"];
        this.modelRoot = model["archimate:model"];
        this.modelFolders = null;
        this.isNestedDiagramStructure = true;
        this.hasViewElementChildRelationships = true;
    }

    getModelId() {
        return this.modelid;
    }

    getNodeId(node) {
        return node.$.id;
    }

    getNodeName(node) {
        return node.$.name || UNKNOWN;
    }

    getNodeType(node) {
        return node.$["xsi:type"].replace("archimate\:", "");
    }

    getNodeJunctionType(node) {
        let type = node.$.type;

        if (type === undefined) { // AND junction
            return "AndJunction";
        } else {
            return "OrJunction";
        }
    }

    getRelationshipId(relationship) {
        return relationship.$.id;
    }

    getRelationshipName(relationship) {
        if (relationship.$.name !== undefined) {
            return relationship.$.name;
        }

        return "";
    }

    getRelationshipSourceId(relationship) {
        return relationship.$.source;
    }

    getRelationshipTargetId(relationship) {
        return relationship.$.target;
    }

    getRelationshipType(relationship) {
        return relationship.$["xsi:type"].replace("archimate\:", "");
    }

    getAccessRelationshipDirection(relationship) {
        if (relationship.$.accessType === undefined) {
            return {
                source: false,
                target: true
            }
        } else {
            switch (relationship.$.accessType) {
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
        let isDirected = relationship.$.directed;

        if (isDirected === undefined) {
            return false;
        } else {
            return isDirected;
        }
    }

    getFolderName(folder) {
        return folder.$.name || UNKNOWN;
    }

    getSubFolders(folder) {
        return folder.folder;
    }

    getFolderViews(folder) {
        return folder.element;
    }

    getViewElements(view) {
        return view.child;
    }

    getViewId(view) {
        return view.$.id;
    }

    getViewName(view) {
        return view.$.name || UNKNOWN;
    }

    getViewElementViewId(viewElement) {
        return viewElement.$.id;
    }

    getViewElementModelId(viewElement) {
        return viewElement.$.archimateElement;
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
        return viewElement.sourceConnection;
    }

    getViewElementNestedElements(viewElement) {
        return viewElement.child;
    }

    findViewElement(viewElements, id) {
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

        return null;
    }

    findViewElementParent(viewElements, id) {
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

        return null;
    }

    calculateNestedPosition(viewElements, id) {
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
                            
                            return { x: this.getViewElementPositionX(element), y: this.getViewElementPositionY(element) };
                        }
                    }
                }
            }
        }

        return null;
    }

    getViewNoteContent(viewElement) {
        if (viewElement.content !== undefined) {
            if (typeof viewElement.content === "string") {
                return viewElement.content;
            } else {
                return viewElement.content[0];
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
        return viewRelationship.bendpoint;
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

        return { x: parseInt(x, 0), y: parseInt(y, 0) };
    }

    getViewRelationshipModelId(viewRelationship) {
        return viewRelationship.$.archimateRelationship ? viewRelationship.$.archimateRelationship : null;
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

    getOrganizationFolders() { // Archi allows folder creation just inside the predefined folders
        let organizationFolder = null;

        this.modelFolders.forEach((folder) => {
            if (folder.$.type.localeCompare("diagrams") === 0) {
                organizationFolder = folder;
            }
        });

        return [organizationFolder];
    }

    validate() {
        if (this.modelRoot !== undefined) {
            if (this.modelRoot.folder !== undefined) {
                this.modelFolders = this.modelRoot.folder;

                return true;
            }
        }

        return false;
    }

    forEachViewRelationship(view, action) {

    }

    // TODO: Get elements in Subfolders
    forEachModelNode(action) {
        this.modelFolders.forEach((folder) => {
            if (folder.$.type.localeCompare("relations") !== 0 && folder.$.type.localeCompare("diagrams") !== 0) {
                let modelElements = folder.element;

                if (modelElements !== undefined) {
                    modelElements.forEach(action);
                }
            }
        });
    }

    forEachModelRelationship(action) {
        this.modelFolders.forEach((folder) => {
            if (folder.$.type.localeCompare("relations") === 0) {
                let modelElements = folder.element;

                if (modelElements !== undefined) {
                    modelElements.forEach(action);
                }
            }
        });
    }

    forEachDiagram(action) {
        return null;
    }

    isAccessRelationship(relationship) {
        return relationship.$["xsi:type"].localeCompare("archimate:AccessRelationship") === 0;
    }

    isAssociationRelationship(relationship) {
        return relationship.$["xsi:type"].localeCompare("archimate:AssociationRelationship") === 0;
    }

    isViewObject(viewElement) {
        return viewElement.$["xsi:type"].localeCompare("archimate:DiagramObject") === 0;
    }

    isViewNote(viewElement) {
        return viewElement.$["xsi:type"].localeCompare("archimate:Note") === 0;
    }

    isViewGroup(viewElement) {
        return viewElement.$["xsi:type"].localeCompare("archimate:Group") === 0;
    }

    isJunctionNode(node) {
        return node.$["xsi:type"].localeCompare("archimate:Junction") === 0;
    }

    hasViewElementWithChildRelationships() {
        return this.hasViewElementChildRelationships;
    }
}

module.exports = Archi4Interpreter;