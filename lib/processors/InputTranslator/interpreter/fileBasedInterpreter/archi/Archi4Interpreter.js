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

    getNodeDocumentation(node) {
        return node.documentation && node.documentation[0] ? node.documentation[0] : null;
    }

    getNodeJunctionType(node) {
        let type = node.$.type;

        if (type === undefined) { // AND junction
            return "AndJunction";
        } else {
            return "OrJunction";
        }
    }

    getNodeProperties(node) {
        return node.property;
    }

    getPropertyEntry(property) {
        if (property && property.$ && property.$.key && property.$.value) {
            return [property.$.key, property.$.value];
        } else {
            return [];
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
        const sourceBounds = sourceViewElement.bounds[0].$;
        const targetBounds = targetViewElement.bounds[0].$;
        const sourceXPosition = sourceBounds.x ? +sourceBounds.x : 0;
        const sourceYPosition = sourceBounds.y ? +sourceBounds.y : 0;
        const targetXPosition = targetBounds.x ? +targetBounds.x : 0;
        const targetYPosition = targetBounds.y ? +targetBounds.y : 0;
        const sourceParentPositionIncrement = this.calculateNestedPosition(viewNodes, sourceViewElement.$.id);
        const targetParentPositionIncrement = this.calculateNestedPosition(viewNodes, targetViewElement.$.id);
        const sx = bendpoint.$.startX ? +bendpoint.$.startX : 0;
        const sy = bendpoint.$.startY ? +bendpoint.$.startY : 0;
        const ex = bendpoint.$.endX ? +bendpoint.$.endX : 0;
        const ey = bendpoint.$.endY ? +bendpoint.$.endY : 0;
        let sourceIncrementX = 0;
        let sourceIncrementY = 0;
        let targetIncrementX = 0;
        let targetIncrementY = 0;

        let sourceWidth = sourceBounds.width ? +sourceBounds.width : 0;
        let sourceHeight = sourceBounds.height ? +sourceBounds.height : 0;
        let targetWidth = targetBounds.width ? +targetBounds.width : 0;
        let targetHeight = targetBounds.height ? +targetBounds.height : 0;

        if (sourceParentPositionIncrement !== null) {
            sourceIncrementX = sourceParentPositionIncrement.x;
            sourceIncrementY = sourceParentPositionIncrement.y;
        }

        if (targetParentPositionIncrement !== null) {
            targetIncrementX = targetParentPositionIncrement.x;
            targetIncrementY = targetParentPositionIncrement.y;
        }

        let sourcePositionX = sourceXPosition + sourceIncrementX;
        let sourcePositionY = sourceYPosition + sourceIncrementY;
        let targetPositionX = targetXPosition + targetIncrementX;
        let targetPositionY = targetYPosition + targetIncrementY;
        let weight = (bendpointIndex + 1) / (bendpointsLength + 1);

        let x = (sourcePositionX + sx + sourceWidth / 2) * (1.0 - weight) +
            weight * (targetPositionX + ex + targetWidth / 2);
        let y = (sourcePositionY + sy + sourceHeight / 2) * (1.0 - weight) +
            weight * (targetPositionY + ey + targetHeight / 2);

        return {x: parseInt(x, 0), y: parseInt(y, 0)};
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

                if (Array.isArray(modelElements)) {
                    modelElements.forEach(action);
                }
            }
        });
    }

    forEachModelRelationship(action) {
        this.modelFolders.forEach((folder) => {
            if (folder.$.type.localeCompare("relations") === 0) {
                let modelElements = folder.element;

                if (Array.isArray(modelElements)) {
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