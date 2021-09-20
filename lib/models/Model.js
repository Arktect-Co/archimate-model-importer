class Model {
    constructor(
        label,
        description
    ) {
        this.label = label;
        this.description = description;

        this.model = {
            nodes: {},
            relationships: {},
            views: [],
            landscape: [],
        };
        this.totalByType = {
            nodeTypes: {},
            relationshipTypes: {},
        };
        this.statistics = {
            totalNodes: 0,
            totalRelationships: 0,
            totalViews: 0,
        };
    }

    getNodes() {
        const nodes = [];

        for (const nodeType in this.model.nodes) {
            if (this.model.nodes.hasOwnProperty(nodeType)) {
                const nodeTypeSet = this.model.nodes[nodeType];

                for (let i = 0; i < nodeTypeSet.length; i++) {
                    const node = nodeTypeSet[i];

                    nodes.push({...node, type: nodeType});
                }
            }
        }

        return nodes;
    }

    getRelationships() {
        const relationships = [];

        for (const relType in this.model.relationships) {
            if (this.model.relationships.hasOwnProperty(relType)) {
                const relTypeSet = this.model.relationships[relType];

                for (let i = 0; i < relTypeSet.length; i++) {
                    const relationship = relTypeSet[i];

                    relationships.push({...relationship, type: relType});
                }
            }
        }

        return relationships;
    }

    getViews() {
        return this.model.views;
    }

    getLandscapeStructure() {
        return this.model.landscape;
    }

    static createViewBounds(minVert, maxVert, minHor, maxHor) {
        return {
            vertical: {
                min: minVert,
                max: maxVert,
            },
            horizontal: {
                min: minHor,
                max: maxHor,
            },
        };
    }

    static createViewElement(
        modelNodeId,
        viewNodeId,
        name,
        type,
        x,
        y,
        width,
        height,
        parent,
    ) {
        let elementName = 'Unknown Name';

        if (name !== undefined && name !== null && name !== "") {
            elementName = name;
        }

        return {
            modelNodeId,
            viewNodeId,
            name: elementName,
            type,
            x,
            y,
            width,
            height,
            parent,
        };
    }

    static createViewDocumentationElement(
        viewNodeId,
        name,
        type,
        x,
        y,
        width,
        height,
        parent
    ) {
        let elementName = ' ';

        if (name !== undefined && name !== null) {
            elementName = name;
        }

        return {
            modelNodeId: null,
            viewNodeId,
            name: elementName,
            type,
            x,
            y,
            width,
            height,
            parent,
        };
    }

    static createViewRelationship(
        modelRelationshipId,
        sourceId,
        targetId,
        viewRelationshipId,
        type,
        bendpoints,
        isBidirectional
    ) {
        return {
            modelRelationshipId,
            sourceId,
            targetId,
            viewRelationshipId,
            type,
            bendpoints,
            isBidirectional
        };
    }

    static createBendpoint(x, y) {
        return {
            x: x || 0,
            y: y || 0,
        };
    }

    static createNode(identifier, name, type) {
        return {
            identifier,
            name,
            type
        }
    }

    static createRelationship(type, sourceId, targetId, isBidirectional, identifier) {
        let relationship = {
            sourceId: sourceId,
            targetId: targetId,
            type: type ? type.toLowerCase() : "",
        };

        if (identifier) {
            relationship.identifier = identifier;
        }

        if (isBidirectional) {
            relationship.isBidirectional = isBidirectional;
        }

        return relationship;
    }

    setModelId(id) {
        this.modelsourceid = id;
    }

    static createNonCategorizedNode(identifier, name, type, properties, documentation) {
        let nodeName = name !== null ? name : 'Unknown Name';
        let nodeObj = {identifier, name: nodeName, type};

        if (properties) {
            nodeObj.properties = properties;
        }

        if (documentation) {
            nodeObj.documentation = documentation;
        }

        return nodeObj;
    }

    setManyNodes(nodeList) {
        let categorizedNodes = {};
        let totalNodes = 0;

        nodeList.forEach(node => {
            if (node.type && node.identifier) {
                let type = node.type.toLowerCase();
                let name = node.name || 'Unknown Name';
                let properties = node.properties;
                let documentation = node.documentation;

                if (categorizedNodes[type] === undefined) {
                    // its the first element of type
                    categorizedNodes[type] = [];
                }

                let nodeObj = {identifier: node.identifier, name};

                if (properties) {
                    nodeObj.properties = properties;
                }

                if (documentation) {
                    nodeObj.documentation = documentation;
                }

                categorizedNodes[type].push(nodeObj);

                totalNodes++;
            }
        });

        for (let nodeType in categorizedNodes) {
            if (categorizedNodes.hasOwnProperty(nodeType)) {
                this.totalByType["nodeTypes"][nodeType] = categorizedNodes[nodeType].length;
            }
        }

        this.statistics.totalNodes = totalNodes;
        this.model.nodes = categorizedNodes;
    }

    setManyRelationships(relationshipList) {
        let categorizedRelationships = {};
        let totalRelationships = 0;

        relationshipList.forEach(rel => {
            if (rel.type && rel.sourceId && rel.targetId) {
                let type = rel.type.toLowerCase();

                if (categorizedRelationships[type] === undefined) {
                    // its the first element of type
                    categorizedRelationships[type] = [];
                }

                let relationship = {
                    identifier: rel.identifier,
                    sourceId: rel.sourceId,
                    targetId: rel.targetId,
                };

                if (rel.isBidirectional) {
                    relationship.isBidirectional = rel.isBidirectional;
                }

                categorizedRelationships[type].push(relationship);

                totalRelationships++;
            }
        });

        for (let relType in categorizedRelationships) {
            if (categorizedRelationships.hasOwnProperty(relType)) {
                const sumarizedType = relType.replace("relationship", "");

                this.totalByType["relationshipTypes"][sumarizedType] = categorizedRelationships[relType].length;
            }
        }

        this.statistics.totalRelationships = totalRelationships;
        this.model.relationships = categorizedRelationships;
    }

    createFolder(folderid, foldername) {
        return {
            id: folderid,
            text: foldername,
            isDirectory: true,
            children: [],
        };
    }

    addFolder(parentfolder, folder) {
        if (parentfolder.children === undefined) {
            // Is the first level (root) of the landscape
            parentfolder.push(folder); // Model landscape its an simple array
        } else {
            // Its a folder
            if (parentfolder.isDirectory === true) {
                parentfolder.children.push(folder);
            }
        }
    }

    addView(viewid, viewname, bounds, viewNodes, viewRelationships) {
        this.model.views.push({
            id: viewid,
            name: viewname,
            bounds: bounds,
            viewNodes: viewNodes,
            viewRelationships: viewRelationships,
        });

        this.statistics.totalViews++;
    }

    addFolderView(folder, viewid, viewname) {
        if (folder !== null && folder !== undefined) {
            folder.children.push({
                id: viewid,
                text: viewname,
                isDirectory: false,
            });
        }
    }
}

module.exports = Model;
