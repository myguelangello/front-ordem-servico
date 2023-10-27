import styled, { keyframes } from "styled-components";
import * as Dialog from '@radix-ui/react-dialog';

export const overlayShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  } 
`;

export const contentShow = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const DialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1px);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

export const DialogContent = styled(Dialog.Content) <{ variant: 'lg' | 'md' | 'sm' }>`
  background-color: #fff;
  border-radius: 0.625rem;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${props => {
    switch (props.variant) {
      case 'lg':
        return '90vw';
      case 'md':
        return '75vw';
      case 'sm':
        return '50vw';
      default:
        return '100%';
    }
  }};
  max-width: 450px;
  max-height: 85vh;
  padding: 1.75rem;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);

  :focus {
    outline: none;
  }
`;

export const DialogTitle = styled(Dialog.Title)`
  margin: 0;
  font-weight: 500;
  color: #000;
  font-size: 1.25rem;
`;

export const DialogDescription = styled(Dialog.Description)`
  margin: 0.625rem 0 1.25rem;
  color: #000;
  font-size: 0.875rem;
	font-weight: 400;
  line-height: 1.5;
`;

export const Fieldset = styled.fieldset`
  display: flex; 
  justify-content: flex-end;
  border: none;
  height: 2.5rem;
  margin: 0.5rem 0;
`;

export const IconButton = styled.button`
	all: unset;
	cursor: pointer;
	font-family: inherit;
  border-radius: 100%;
  height: 1.5rem;
  width: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #000;
  position: absolute;
  top: 0.625rem;
  right:  0.625rem;

	:hover {
		background-color: #e4e4e7;
	}
	:focus {
		box-shadow: 0 0 0 1px #000;
	}
`;
