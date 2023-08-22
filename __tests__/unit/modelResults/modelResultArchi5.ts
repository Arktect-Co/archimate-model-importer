export const modelResultArchi5 = {
  label: 'Archi Test v5',
  description: 'Test model for Archi Files',
  model: {
    nodes: {
      businessactor: [
        {
          identifier: '2b9a81919a0b491693d389fc926b00b7',
          name: 'a',
          properties: [],
        },
      ],
      businessprocess: [
        {
          identifier: '0e57864dd9db4e62b59d82fe13e4bf45',
          name: 'c',
          properties: [],
        },
      ],
      material: [
        {
          identifier: 'ee5455565a74421cbea5d9e64f69342c',
          name: 'Material',
          properties: [],
        },
      ],
      equipment: [
        {
          identifier: 'd6924092a5ff4d809bb1f186c4cf29ae',
          name: 'Equipment',
          properties: [],
        },
        {
          identifier: 'c66f4f1de7ef4b28a5aafdbd497a2aff',
          name: 'Equipment',
          properties: [],
        },
      ],
      node: [
        {
          identifier: '4ff521e69d724ae88c5a2324008613e7',
          name: 'Node',
          properties: [],
        },
      ],
      systemsoftware: [
        {
          identifier: '19fa020f3e6b42f79fcfb8a880795720',
          name: 'System Software',
          properties: [],
        },
      ],
      device: [
        {
          identifier: 'c9ca897b441643b5b37d44057140f3d7',
          name: 'Device',
          properties: [],
        },
      ],
      facility: [
        {
          identifier: 'ae53fd955f984d3f8bc2d42a1cda2b62',
          name: 'Facility',
          properties: [],
        },
      ],
      outcome: [
        {
          identifier: 'ed2cd63dc6a149e7ab019b9acc2e16e3',
          name: 'Outcome',
          properties: [],
        },
        {
          identifier: '5aed61f0dc7a4525b903410b8a99403a',
          name: 'Outcome (copy)',
          properties: [],
        },
      ],
      plateau: [
        {
          identifier: 'd5738b8896e1475da7d141b113e54865',
          name: 'Plateau',
          properties: [],
        },
        {
          identifier: 'bd8645aacb0345a9abc8591e61d4c38d',
          name: 'Plateau (copy)',
          properties: [],
        },
      ],
      grouping: [
        {
          identifier: 'dfe7ca36f17346e6808ad39d1322e963',
          name: 'b',
          properties: [],
        },
      ],
    },
    relationships: {
      aggregationrelationship: [
        {
          identifier: 'aa1a389779154b3f993d26e07d528183',
          sourceId: 'bd8645aacb0345a9abc8591e61d4c38d',
          targetId: '5aed61f0dc7a4525b903410b8a99403a',
        },
        {
          identifier: 'd20f9ccac6324418a7b7709c13e84c53',
          sourceId: 'dfe7ca36f17346e6808ad39d1322e963',
          targetId: '2b9a81919a0b491693d389fc926b00b7',
        },
        {
          identifier: '01062ab50d59499fb4c383809878602c',
          sourceId: '4ff521e69d724ae88c5a2324008613e7',
          targetId: '19fa020f3e6b42f79fcfb8a880795720',
        },
        {
          identifier: '52044c60d08e4cfb8773e18ac78bcb62',
          sourceId: '4ff521e69d724ae88c5a2324008613e7',
          targetId: 'c9ca897b441643b5b37d44057140f3d7',
        },
        {
          identifier: '790f2145455347d089d7afc34f6fba45',
          sourceId: '4ff521e69d724ae88c5a2324008613e7',
          targetId: 'c66f4f1de7ef4b28a5aafdbd497a2aff',
        },
        {
          identifier: '0bc9288e6251493da6c227c52221a853',
          sourceId: '4ff521e69d724ae88c5a2324008613e7',
          targetId: 'ae53fd955f984d3f8bc2d42a1cda2b62',
        },
      ],
      compositionrelationship: [
        {
          identifier: '9e9ec00dee43427494e70f75244e1171',
          sourceId: 'd5738b8896e1475da7d141b113e54865',
          targetId: 'ed2cd63dc6a149e7ab019b9acc2e16e3',
        },
        {
          identifier: '4852f6767b844eed8b54f8b3808acf99',
          sourceId: '4ff521e69d724ae88c5a2324008613e7',
          targetId: '19fa020f3e6b42f79fcfb8a880795720',
        },
        {
          identifier: '03890a07844742e2b08acf48145a9c28',
          sourceId: '4ff521e69d724ae88c5a2324008613e7',
          targetId: 'c9ca897b441643b5b37d44057140f3d7',
        },
        {
          identifier: '5e7652aba0fc4f60b165a4fbcb019188',
          sourceId: '4ff521e69d724ae88c5a2324008613e7',
          targetId: 'c66f4f1de7ef4b28a5aafdbd497a2aff',
        },
        {
          identifier: '62ccb529bf14458790fe1c89acc7f851',
          sourceId: '4ff521e69d724ae88c5a2324008613e7',
          targetId: 'ae53fd955f984d3f8bc2d42a1cda2b62',
        },
      ],
      realizationrelationship: [
        {
          identifier: '246513ab10e9404593e7f7d8f84d0f89',
          sourceId: 'ee5455565a74421cbea5d9e64f69342c',
          targetId: 'd6924092a5ff4d809bb1f186c4cf29ae',
        },
      ],
      assignmentrelationship: [
        {
          identifier: 'da2c5ffbdd914a98b3eec600234fdceb',
          sourceId: 'dfe7ca36f17346e6808ad39d1322e963',
          targetId: '0e57864dd9db4e62b59d82fe13e4bf45',
        },
      ],
    },
    views: [
      {
        id: '79117d9769cd489a878d72bf7ea910fa',
        name: 'novidades',
        bounds: {
          vertical: {
            min: 36,
            max: 440,
          },
          horizontal: {
            min: 12,
            max: 481,
          },
        },
        viewNodes: [
          {
            modelNodeId: 'd5738b8896e1475da7d141b113e54865',
            viewNodeId: '2b57ca41ea4242088c50343ca9877ea6',
            name: 'Plateau',
            type: 'plateau',
            x: 50,
            y: 36,
            width: 120,
            height: 55,
            parent: null,
          },
          {
            modelNodeId: 'ed2cd63dc6a149e7ab019b9acc2e16e3',
            viewNodeId: '5df8cff0072d400ab725cff8be47f173',
            name: 'Outcome',
            type: 'outcome',
            x: 216,
            y: 36,
            width: 120,
            height: 55,
            parent: null,
          },
          {
            modelNodeId: 'bd8645aacb0345a9abc8591e61d4c38d',
            viewNodeId: '6c41b3e2427b481ca48a20b875611f8c',
            name: 'Plateau (copy)',
            type: 'plateau',
            x: 50,
            y: 111,
            width: 120,
            height: 55,
            parent: null,
          },
          {
            modelNodeId: '5aed61f0dc7a4525b903410b8a99403a',
            viewNodeId: '00fa8e0021304f91b5520c3099ad231a',
            name: 'Outcome (copy)',
            type: 'outcome',
            x: 216,
            y: 111,
            width: 120,
            height: 55,
            parent: null,
          },
          {
            modelNodeId: 'ee5455565a74421cbea5d9e64f69342c',
            viewNodeId: 'ae7ebe133b7345b48b604b9fcc798857',
            name: 'Material',
            type: 'material',
            x: 50,
            y: 204,
            width: 120,
            height: 55,
            parent: null,
          },
          {
            modelNodeId: 'd6924092a5ff4d809bb1f186c4cf29ae',
            viewNodeId: '7a744f6988aa426aae276143b839fe2b',
            name: 'Equipment',
            type: 'equipment',
            x: 228,
            y: 204,
            width: 120,
            height: 55,
            parent: null,
          },
          {
            modelNodeId: 'dfe7ca36f17346e6808ad39d1322e963',
            viewNodeId: 'd56c44665abd41c4bc30d9b6c0efd4b3',
            name: 'b',
            type: 'grouping',
            x: 132,
            y: 300,
            width: 232,
            height: 140,
            parent: null,
          },
          {
            modelNodeId: '2b9a81919a0b491693d389fc926b00b7',
            viewNodeId: '2f1998df237b4c4c85e837c03d17e29d',
            name: 'a',
            type: 'businessactor',
            x: 12,
            y: 312,
            width: 61,
            height: 49,
            parent: null,
          },
          {
            modelNodeId: '0e57864dd9db4e62b59d82fe13e4bf45',
            viewNodeId: '301f0d0b260d4873ba4d0f89735e9abb',
            name: 'c',
            type: 'businessprocess',
            x: 408,
            y: 312,
            width: 73,
            height: 73,
            parent: null,
          },
        ],
        viewRelationships: [
          {
            modelRelationshipId: '9e9ec00dee43427494e70f75244e1171',
            sourceId: '2b57ca41ea4242088c50343ca9877ea6',
            targetId: '5df8cff0072d400ab725cff8be47f173',
            viewRelationshipId: '385f1cc1892d4c11b922ec233bf0e0fa',
            type: 'composition',
            bendpoints: [],
          },
          {
            modelRelationshipId: 'aa1a389779154b3f993d26e07d528183',
            sourceId: '6c41b3e2427b481ca48a20b875611f8c',
            targetId: '00fa8e0021304f91b5520c3099ad231a',
            viewRelationshipId: 'c043610d85574bc6b6e31dfd6e798bf4',
            type: 'aggregation',
            bendpoints: [],
          },
          {
            modelRelationshipId: '246513ab10e9404593e7f7d8f84d0f89',
            sourceId: 'ae7ebe133b7345b48b604b9fcc798857',
            targetId: '7a744f6988aa426aae276143b839fe2b',
            viewRelationshipId: '3ad4a53cfe64448e8d516b5fb8cd71c9',
            type: 'realization',
            bendpoints: [],
          },
          {
            modelRelationshipId: 'da2c5ffbdd914a98b3eec600234fdceb',
            sourceId: 'd56c44665abd41c4bc30d9b6c0efd4b3',
            targetId: '301f0d0b260d4873ba4d0f89735e9abb',
            viewRelationshipId: 'b6590b3309e3439b93227dee877ac0b4',
            type: 'assignment',
            bendpoints: [],
          },
          {
            modelRelationshipId: 'd20f9ccac6324418a7b7709c13e84c53',
            sourceId: 'd56c44665abd41c4bc30d9b6c0efd4b3',
            targetId: '2f1998df237b4c4c85e837c03d17e29d',
            viewRelationshipId: '13cd6988332f463f826bf37a2dab924f',
            type: 'aggregation',
            bendpoints: [],
          },
        ],
      },
      {
        id: '0c7e4a0d3f684014b9422fd005e489af',
        name: 'default',
        bounds: {
          vertical: {
            min: 60,
            max: 421,
          },
          horizontal: {
            min: 36,
            max: 385,
          },
        },
        viewNodes: [
          {
            modelNodeId: '4ff521e69d724ae88c5a2324008613e7',
            viewNodeId: '222f9942c68e47d5a7167e64cc435b8a',
            name: 'Node',
            type: 'node',
            x: 240,
            y: 180,
            width: 145,
            height: 85,
            parent: null,
          },
          {
            modelNodeId: '19fa020f3e6b42f79fcfb8a880795720',
            viewNodeId: 'df982b338a04467289ab71d4574bce8d',
            name: 'System Software',
            type: 'systemsoftware',
            x: 240,
            y: 360,
            width: 97,
            height: 61,
            parent: null,
          },
          {
            modelNodeId: 'c9ca897b441643b5b37d44057140f3d7',
            viewNodeId: 'e4883761d7864a77a7ff00304a7a793f',
            name: 'Device',
            type: 'device',
            x: 240,
            y: 60,
            width: 97,
            height: 61,
            parent: null,
          },
          {
            modelNodeId: 'ae53fd955f984d3f8bc2d42a1cda2b62',
            viewNodeId: '209fc8ce78a34485ba5cdc426489d4e1',
            name: 'Facility',
            type: 'facility',
            x: 48,
            y: 252,
            width: 109,
            height: 73,
            parent: null,
          },
          {
            modelNodeId: 'c66f4f1de7ef4b28a5aafdbd497a2aff',
            viewNodeId: 'ea00a3ff03f541fabc96f78348b55955',
            name: 'Equipment',
            type: 'equipment',
            x: 36,
            y: 84,
            width: 109,
            height: 85,
            parent: null,
          },
        ],
        viewRelationships: [
          {
            modelRelationshipId: '01062ab50d59499fb4c383809878602c',
            sourceId: '222f9942c68e47d5a7167e64cc435b8a',
            targetId: 'df982b338a04467289ab71d4574bce8d',
            viewRelationshipId: '80412dcfe0cb4171ab4c4d4650c5d8c3',
            type: 'aggregation',
            bendpoints: [
              {
                x: 276,
                y: 303,
              },
            ],
          },
          {
            modelRelationshipId: '4852f6767b844eed8b54f8b3808acf99',
            sourceId: '222f9942c68e47d5a7167e64cc435b8a',
            targetId: 'df982b338a04467289ab71d4574bce8d',
            viewRelationshipId: 'efa63424f84a4c77887d064486601504',
            type: 'composition',
            bendpoints: [
              {
                x: 324,
                y: 315,
              },
            ],
          },
          {
            modelRelationshipId: '52044c60d08e4cfb8773e18ac78bcb62',
            sourceId: '222f9942c68e47d5a7167e64cc435b8a',
            targetId: 'e4883761d7864a77a7ff00304a7a793f',
            viewRelationshipId: 'ccdb37dd23534a6d82c9ea80b12825a2',
            type: 'aggregation',
            bendpoints: [
              {
                x: 324,
                y: 147,
              },
            ],
          },
          {
            modelRelationshipId: '03890a07844742e2b08acf48145a9c28',
            sourceId: '222f9942c68e47d5a7167e64cc435b8a',
            targetId: 'e4883761d7864a77a7ff00304a7a793f',
            viewRelationshipId: '05cb14677aa64777ac608b7545f6cdbc',
            type: 'composition',
            bendpoints: [
              {
                x: 276,
                y: 147,
              },
            ],
          },
          {
            modelRelationshipId: '5e7652aba0fc4f60b165a4fbcb019188',
            sourceId: '222f9942c68e47d5a7167e64cc435b8a',
            targetId: 'ea00a3ff03f541fabc96f78348b55955',
            viewRelationshipId: '3b89af47ca5f43f29748ffa8260bf52d',
            type: 'composition',
            bendpoints: [
              {
                x: 192,
                y: 219,
              },
            ],
          },
          {
            modelRelationshipId: '790f2145455347d089d7afc34f6fba45',
            sourceId: '222f9942c68e47d5a7167e64cc435b8a',
            targetId: 'ea00a3ff03f541fabc96f78348b55955',
            viewRelationshipId: 'c8684fc5137444c09ce193268abfcb97',
            type: 'aggregation',
            bendpoints: [
              {
                x: 204,
                y: 195,
              },
            ],
          },
          {
            modelRelationshipId: '62ccb529bf14458790fe1c89acc7f851',
            sourceId: '222f9942c68e47d5a7167e64cc435b8a',
            targetId: '209fc8ce78a34485ba5cdc426489d4e1',
            viewRelationshipId: 'd42c47dfe8114c4585d50268e9caab4e',
            type: 'composition',
            bendpoints: [
              {
                x: 204,
                y: 240,
              },
            ],
          },
          {
            modelRelationshipId: '0bc9288e6251493da6c227c52221a853',
            sourceId: '222f9942c68e47d5a7167e64cc435b8a',
            targetId: '209fc8ce78a34485ba5cdc426489d4e1',
            viewRelationshipId: '154077e626f04f67a02fd5e88868ee4f',
            type: 'aggregation',
            bendpoints: [],
          },
        ],
      },
    ],
    landscape: [
      {
        text: 'Views',
        isDirectory: true,
        children: [
          {
            id: '79117d9769cd489a878d72bf7ea910fa',
            text: 'novidades',
            isDirectory: false,
          },
          {
            id: '0c7e4a0d3f684014b9422fd005e489af',
            text: 'default',
            isDirectory: false,
          },
        ],
      },
    ],
  },
  totalByType: {
    nodeTypes: {
      businessactor: 1,
      businessprocess: 1,
      material: 1,
      equipment: 2,
      node: 1,
      systemsoftware: 1,
      device: 1,
      facility: 1,
      outcome: 2,
      plateau: 2,
      grouping: 1,
    },
    relationshipTypes: {
      aggregation: 6,
      composition: 5,
      realization: 1,
      assignment: 1,
    },
  },
  statistics: {
    totalNodes: 14,
    totalRelationships: 13,
    totalViews: 2,
  },
};
