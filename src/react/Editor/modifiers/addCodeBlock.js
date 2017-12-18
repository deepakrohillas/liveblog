import {
  EditorState,
  AtomicBlockUtils,
} from 'draft-js';

import moveBlock from './moveBlock';

export default (editorState, selection = false, data) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    'code-block',
    'IMMUTABLE',
    data,
  );

  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  const newEditorState = AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    ' ',
  );

  if (!selection) {
    return EditorState.forceSelection(
      newEditorState,
      newEditorState.getCurrentContent().getSelectionAfter(),
    );
  }

  const newAtomicBlock = newEditorState
    .getCurrentContent()
    .getBlockMap()
    .find(x => x.getEntityAt(0) === entityKey);

  return moveBlock(newEditorState, newAtomicBlock.getKey(), selection);
};
