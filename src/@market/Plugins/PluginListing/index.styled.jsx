import { rgba } from 'polished';
import styled from 'styled-components';

export const StyledPluginListView = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const StyledPluginListMainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 8px;
  width: 100%;
  background-color: ${({ theme }) =>
    rgba(theme.palette.background.default, 0.6)};
`;
