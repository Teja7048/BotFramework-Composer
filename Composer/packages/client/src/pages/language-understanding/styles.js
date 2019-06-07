import { css } from '@emotion/core';

export const actionButton = css`
  font-size: 16px;
  margin-left: 15px;
`;

export const flexContentSpaceBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const flexContent = css`
  display: flex;
  align-items: center;
`;

export const ContentHeaderStyle = css`
  padding-left: 20px;
  padding-right: 20px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ContentStyle = css`
  display: flex;
  border-top: 1px solid #dddddd;
  flex: 1;
  nav {
    width: 200px;
    ul {
      margin-top: 0px;
    }
  }
`;

export const contentEditor = css`
  flex: 4;
  margin: 20px;
`;

export const codeEditorContainer = css`
  width: 100%;
`;

export const codeEditor = css`
  border: 1px solid #dddddd;
  height: calc(100vh - 200px);
`;