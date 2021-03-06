// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useContext, Fragment, useMemo, Suspense, useCallback, useEffect } from 'react';
import formatMessage from 'format-message';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { RouteComponentProps, Router } from '@reach/router';

import { StoreContext } from '../../store';
import { navigateTo } from '../../utils';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { TestController } from '../../components/TestController';
import { INavTreeItem } from '../../components/NavTree';
import { Page } from '../../components/Page';

import TableView from './table-view';
import { actionButton } from './styles';
const CodeEditor = React.lazy(() => import('./code-editor'));

interface LUPageProps extends RouteComponentProps<{}> {
  dialogId?: string;
  path: string;
}

const LUPage: React.FC<LUPageProps> = (props) => {
  const { state } = useContext(StoreContext);
  const { dialogs, projectId } = state;
  const path = props.location?.pathname ?? '';
  const { dialogId = '' } = props;
  const edit = /\/edit(\/)?$/.test(path);
  const isRoot = dialogId === 'all';

  const navLinks: INavTreeItem[] = useMemo(() => {
    const newDialogLinks: INavTreeItem[] = dialogs.map((dialog) => {
      return {
        id: dialog.id,
        url: `/bot/${projectId}/language-understanding/${dialog.id}`,
        name: dialog.displayName,
        ariaLabel: formatMessage('language understanding file'),
      };
    });
    const mainDialogIndex = newDialogLinks.findIndex((link) => link.id === 'Main');

    if (mainDialogIndex > -1) {
      const mainDialog = newDialogLinks.splice(mainDialogIndex, 1)[0];
      newDialogLinks.splice(0, 0, mainDialog);
    }
    newDialogLinks.splice(0, 0, {
      id: 'all',
      name: formatMessage('All'),
      ariaLabel: formatMessage('all language understanding files'),
      url: `/bot/${projectId}/language-understanding/all`,
    });
    return newDialogLinks;
  }, [dialogs]);

  useEffect(() => {
    const activeDialog = dialogs.find(({ id }) => id === dialogId);
    if (!activeDialog && dialogId !== 'all' && dialogs.length) {
      navigateTo(`/bot/${projectId}/language-understanding/all`);
    }
  }, [dialogId, dialogs, projectId]);

  const onToggleEditMode = useCallback(
    (_e, checked) => {
      let url = `/bot/${projectId}/language-understanding/${dialogId}`;
      if (checked) url += `/edit`;
      navigateTo(url);
    },
    [dialogId, projectId]
  );

  const toolbarItems = [
    {
      type: 'element',
      element: <TestController />,
      align: 'right',
    },
  ];

  const onRenderHeaderContent = () => {
    if (!isRoot || edit) {
      return (
        <Toggle
          checked={!!edit}
          className={'toggleEditMode'}
          css={actionButton}
          defaultChecked={false}
          offText={formatMessage('Edit mode')}
          onChange={onToggleEditMode}
          onText={formatMessage('Edit mode')}
        />
      );
    }

    return null;
  };

  return (
    <Page
      data-testid="LUPage"
      navLinks={navLinks}
      title={formatMessage('User Input')}
      toolbarItems={toolbarItems}
      onRenderHeaderContent={onRenderHeaderContent}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <Router component={Fragment} primary={false}>
          <CodeEditor dialogId={dialogId} path="/edit" />
          <TableView dialogId={dialogId} path="/" />
        </Router>
      </Suspense>
    </Page>
  );
};

export default LUPage;
