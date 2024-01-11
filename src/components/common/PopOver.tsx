import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

type PopOverProp = {
  trigger: ReactNode;
  content: ReactNode;
};

const PopOver = ({ trigger, content }: PopOverProp) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button style={{ border: 'none', cursor: 'pointer' }}>{trigger}</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          style={{
            backgroundColor: '#ffffff',
            width: 200,
            height: 70,
          }}
        >
          <PopoverBody>{content}</PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default PopOver;
