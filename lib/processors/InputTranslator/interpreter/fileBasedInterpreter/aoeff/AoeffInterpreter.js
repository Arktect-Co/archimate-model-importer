const _ = require("lodash");

const UNKNOWN = "Unknown Name";

/**
 *  AOEFF has a limitation when loading relationships of nested elements with its parents. The model
 *  ignores this type of relationship
 */
class AoeffInterpreter {

    constructor(model) {
        this.model = model.model;
        this.modelid = model["model"].$["identifier"];
        this.modelRoot = null;
        this.modelFolders = null;
        this.isNestedDiagramStructure = false;
        this.hasViewElementChildRelationships = false;
    }

    getModelId() {
        return this.modelid;
    }

    getNodeId(node) {
        return node.$.identifier.replace("id-", "");
    }

    getNodeName(node) {
        return node ? node.name[0]._ || node.name[0] : UNKNOWN;
    }

    getNodeType(node) {
        return node.$["xsi:type"];
    }

    getNodeJunctionType(node) {
        return node.$["xsi:type"];
    }

    getNodeProperties(node) {
        return node.properties ? node.properties[0].property : null;
    }

    getPropertyEntry(property) {
        if (property && property.$ && property.$.propertyDefinitionRef && property.value && property.value[0] && property.value[0]._) {
            return [property.$.propertyDefinitionRef, property.value[0]._];
        } else {
            return [];
        }
    }

    getRelationshipId(relationship) {
        return relationship.$.identifier.replace("id-", "");
    }

    getRelationshipName(relationship) {
        if (relationship !== undefined && relationship.name !== undefined) {
            return relationship.name[0]._;
        }

        return "";
    }

    getRelationshipSourceId(relationship) {
        return relationship.$.source.replace("id-", "");
    }

    getRelationshipTargetId(relationship) {
        return relationship.$.target.replace("id-", "");
    }

    getRelationshipType(relationship) {
        return `${relationship.$["xsi:type"]}relationship`;
    }

    getAccessRelationshipDirection(relationship) {
        if (relationship.$.accessType === undefined) {
            return {
                source: false,
                target: true
            }
        } else {
            switch (relationship.$.accessType) {
                case "Write":
                    return {
                        source: false,
                        target: true
                    };
                case "Read":
                    return {
                        source: true,
                        target: false
                    };
                case "Access":
                    return {
                        source: false,
                        target: false
                    };
                case "ReadWrite":
                    return {
                        source: true,
                        target: true
                    };
            }
        }
    }

    getAssociationRelationshipIsDirected(relationship) {
        let isDirected = relationship.$.isDirected;

        if (isDirected === undefined) {
            return false;
        } else {
            return typeof isDirected === "boolean" ? isDirected : isDirected === "true";
        }
    }

    getFolderName(folder) {
        if (folder.label[0]._) {
            return folder.label[0]._;
        } else if (folder.label[0]) {
            return folder.label[0];
        } else {
            return UNKNOWN;
        }
    }

    getSubFolders(folder) {
        let subFolders = [];

        folder.item.forEach((candidateFolder) => {
            if (candidateFolder.label !== undefined) {
                // typeof candidateFolder.label[0] === 'string' for compatibility with Sparx
                if (typeof candidateFolder.label[0] === 'string' || candidateFolder.label[0].$.identifierRef === undefined) {
                    subFolders.push(candidateFolder);
                }
            }
        });

        return subFolders;
    }

    getFolderViews(folder) {
        let folderViews = [];

        folder.item.forEach((candidateView) => {
            if (candidateView !== undefined) {
                if (candidateView.$ !== undefined) {
                    folderViews.push(candidateView);
                }
            }
        });

        return folderViews;
    }

    getViewElements(view) {
        return view.node;
    }

    getViewId(view) {
        if (view.$.identifier !== undefined) {
            return view.$.identifier.replace("id-", "");
        } else {
            return view.$.identifierRef.replace("id-", "");
        }
    }

    getViewName(view) {
        if (view !== undefined && view.name !== undefined) { // Its a view of the Views folder
            return view.name[0]._ ? view.name[0]._ : view.name[0];
        } else { // Its a view of the Organizations folder
            // Finding the view related with the ID indicated in the folder
            let el = _.find(this.model.views[0].diagrams[0].view, (v) => {
                return v.$.identifier.localeCompare(view.$.identifierRef) === 0;
            });

            if (el && el.name) {
                if (el.name[0]._) {
                    return el.name[0]._;
                } else {
                    return el.name[0];
                }
            } else {
                return UNKNOWN;
            }
        }
    }

    getViewElementViewId(viewElement) {
        return viewElement.$.identifier.replace("id-", "");
    }

    getViewElementModelId(viewElement) {
        return viewElement.$.elementRef.replace("id-", "");
    }

    getViewElementPositionX(viewElement, parentId, parentViewElements) {
        let x = parseInt(viewElement.$.x, 0);

        if (parentId !== null) {
            let parent = this.findViewElement(parentViewElements, parentId);

            x = x - parseInt(parent.$.x, 0);
        }

        return x;
    }

    getViewElementPositionY(viewElement, parentId, parentViewElements) {
        let y = parseInt(viewElement.$.y, 0);

        if (parentId !== null) {
            let parent = this.findViewElement(parentViewElements, parentId);

            y = y - parseInt(parent.$.y, 0);
        }

        return y;
    }

    getViewElementWidth(viewElement) {
        return parseInt(viewElement.$.w, 0);
    }

    getViewElementHeight(viewElement) {
        return parseInt(viewElement.$.h, 0);
    }

    getViewElementSourceRelationships(viewElement) {
        return [];
    }

    getViewElementNestedElements(viewElement) {
        return viewElement.node;
    }

    findViewElement(viewElements, id) {
        for (let i = 0; i < viewElements.length; i++) {
            const element = viewElements[i];

            if (element.$.identifier.replace("id-", "").localeCompare(id) === 0) {
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
                for (let j = 0; j < child.length; j++) {
                    const childElement = child[j];

                    if (childElement.$.identifier.localeCompare(id) === 0) {
                        return element;
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

                        if (this.getViewElementViewId(childElement).localeCompare(id) === 0) {

                            return {x: this.getViewElementPositionX(element), y: this.getViewElementPositionY(element)};
                        }
                    }
                }
            }
        }

        return null;
    }

    getViewNoteContent(viewElement) {
        return viewElement.label[0] ? viewElement.label[0]._ || viewElement.label[0] : "No Content";
    }

    getViewGroupName(viewElement) {
        return viewElement.label[0] ? viewElement.label[0]._ || viewElement.label[0] : UNKNOWN;
    }

    getViewRelationshipBendpoints(viewRelationship) {
        return viewRelationship.bendpoint;
    }

    getViewRelationshipBendpoint(bendpoint, bendpointIndex, bendpointsLength, sourceViewElement, targetViewElement, viewNodes) {
        let x = parseInt(bendpoint.$.x, 0);
        let y = parseInt(bendpoint.$.y, 0);

        return {x, y};
    }

    getViewRelationshipModelId(viewRelationship) {
        return viewRelationship.$.relationshipRef ? viewRelationship.$.relationshipRef.replace("id-", "") : null;
    }

    getViewRelationshipId(viewRelationship) {
        return viewRelationship.$.identifier.replace("id-", "");
    }

    getViewRelationshipSourceElementId(viewRelationship) {
        return viewRelationship.$.source.replace("id-", "");
    }

    getViewRelationshipTargetElementId(viewRelationship) {
        return viewRelationship.$.target.replace("id-", "");
    }

    getOrganizationFolders() {
        let organizationFolders = [];

        if (this.model.organizations !== undefined && this.model.organizations[0].item) {
            this.model.organizations[0].item.forEach((folder) => {
                if (folder.label) {
                    let folderName = folder.label[0]._ ? folder.label[0]._ : folder.label[0];

                    if (folderName !== undefined) {
                        if (folderName.localeCompare("Business") !== 0 &&
                            folderName.localeCompare("Application") !== 0 &&
                            folderName.localeCompare("Technology & Physical") !== 0 &&
                            folderName.localeCompare("Motivation") !== 0 &&
                            folderName.localeCompare("Implementation & Migration") !== 0 &&
                            folderName.localeCompare("Strategy") !== 0 &&
                            folderName.localeCompare("Other") !== 0 &&
                            folderName.localeCompare("Relations") !== 0) {
                            organizationFolders.push(folder);
                        }
                    }
                }
            });
        }

        return organizationFolders;
    }

    validate() {
        return this.model.elements !== undefined &&
            this.model.name !== undefined &&
            this.model.views !== undefined;
    }

    forEachViewRelationship(view, action) {
        if (view.connection !== undefined) {
            view.connection.forEach(action);
        }
    }

    forEachModelNode(action) {
        if (this.model.elements !== undefined) {
            this.model.elements[0].element.forEach(action);
        }
    }

    forEachModelRelationship(action) {
        if (this.model.relationships !== undefined) {
            this.model.relationships[0].relationship.forEach(action);
        }
    }

    forEachDiagram(action) {
        this.model.views[0].diagrams[0].view.forEach(action);
    }

    isAccessRelationship(relationship) {
        return relationship.$["xsi:type"].localeCompare("Access") === 0;
    }

    isAssociationRelationship(relationship) {
        return relationship.$["xsi:type"].localeCompare("Association") === 0;
    }

    isViewObject(viewElement) {
        return viewElement.$["xsi:type"].localeCompare("Element") === 0;
    }

    isViewNote(viewElement) {
        return viewElement.$["xsi:type"].localeCompare("Label") === 0;
    }

    isViewGroup(viewElement) {
        return viewElement.$["xsi:type"].localeCompare("Container") === 0;
    }

    isJunctionNode(node) {
        return node.$["xsi:type"].localeCompare("OrJunction") === 0 || node.$["xsi:type"].localeCompare("AndJunction") === 0;
    }
}

module.exports = AoeffInterpreter;