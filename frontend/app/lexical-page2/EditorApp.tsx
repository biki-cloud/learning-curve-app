/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { $createLinkNode } from "@lexical/link";
import { $createListItemNode, $createListNode } from "@lexical/list";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import * as React from "react";

import { isDevPlayground } from "./appSettings";
import { FlashMessageContext } from "./context/FlashMessageContext";
import { SettingsContext, useSettings } from "./context/SettingsContext";
import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext";
import { SharedHistoryContext } from "./context/SharedHistoryContext";
import Editor from "./Editor";
import logo from "./images/logo.svg";
import PlaygroundNodes from "./nodes/PlaygroundNodes";
import DocsPlugin from "./plugins/DocsPlugin";
import PasteLogPlugin from "./plugins/PasteLogPlugin";
import { TableContext } from "./plugins/TablePlugin";
import TestRecorderPlugin from "./plugins/TestRecorderPlugin";
import TypingPerfPlugin from "./plugins/TypingPerfPlugin";
import Settings from "./Settings";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";

function EditorApp(): JSX.Element {
  const {
    settings: { isCollab, emptyEditor, measureTypingPerf },
  } = useSettings();

  const initialConfig = {
    editorState: isCollab ? null : emptyEditor ? undefined : "",
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <TableContext>
          <SharedAutocompleteContext>
            <div className="editor-shell">
              <Editor />
            </div>
            <Settings />
            {isDevPlayground ? <DocsPlugin /> : null}
            {isDevPlayground ? <PasteLogPlugin /> : null}
            {isDevPlayground ? <TestRecorderPlugin /> : null}

            {measureTypingPerf ? <TypingPerfPlugin /> : null}
          </SharedAutocompleteContext>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
}

export default function PlaygroundApp(): JSX.Element {
  return (
    <SettingsContext>
      <FlashMessageContext>
        <EditorApp />
      </FlashMessageContext>
    </SettingsContext>
  );
}
