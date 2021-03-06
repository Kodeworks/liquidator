import styled from 'styled-components';

interface IOutlinedButtonProps {
  className?: string;
  variant?: 'error' | 'success';
}

const OutlinedButton = styled.button<IOutlinedButtonProps>`
  /* Sizing */
  height: 2.5em;
  margin: 0.5em calc(0.5em + 5px) calc(0.5em + 5px) 0.5em; /* We need to factor in
                                                          the box-shadow. */
  padding: 0.5em 2em;

  /* Positioning */
  position: relative;
  top: 0;
  left: 0;

  /* Remove defaults */
  outline: none;

  /* Variables */
  --box-shadow-background: ${props => props.theme.palette.background.default};
  --main-color: ${props =>
    props.variant
      ? props.theme.palette[props.variant].contast
      : props.theme.palette.primary.contrast};
  /* Border */
  border: 2px solid var(--main-color);
  border-radius: 3px;

  /* Shadow of Mordor */
  box-shadow: 5px 5px 0px -2px var(--box-shadow-background),
    5px 5px 0px 0px var(--main-color);

  /* Other */
  cursor: pointer;

  /* Color */
  background: ${props => props.theme.palette.background.default};
  color: var(--main-color);

  /* Font */
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  font-weight: 800;

  /* Transition */
  transition: top 0.1s, left 0.1s, box-shadow 0.1s, color 0.1s;

  &:hover {
    top: 2px;
    left: 2px;
    box-shadow: 3px 3px 0px -2px var(--box-shadow-background),
      3px 3px 0px 0px var(--main-color);
  }

  &:active {
    top: 5px;
    left: 5px;
    box-shadow: 0px 0px 0px -2px var(--box-shadow-background),
      0px 0px 0px 0px var(--main-color);
  }
`;

export default OutlinedButton;
