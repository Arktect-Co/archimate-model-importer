import { Model, ArchiModel } from '@lib/common/interfaces/archiModel/ArchiModel';
import { ChildFolder } from '@lib/common/interfaces/archiModel/ChildFolder';
import { ChildElement, Bounds } from '@lib/common/interfaces/archiModel/ChildElement';
import { Element, Property } from '@lib/common/interfaces/archiModel/Element';
import { Folder as FolderModel } from '@lib/common/interfaces/archiModel/Folder';
import { Relationship, BendpointModel } from '@lib/common/interfaces/archiModel/Relationship';

type View = ChildElement | Element;
type Folder = FolderModel | ChildFolder;

export {
  View,
  Folder,
  Relationship,
  Property,
  Bounds,
  BendpointModel,
  Model,
  ArchiModel,
  Element,
  ChildFolder,
  ChildElement,
  FolderModel,
};
