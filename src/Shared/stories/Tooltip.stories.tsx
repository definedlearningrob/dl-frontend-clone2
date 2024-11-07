import React from 'react';

import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';

export default {
  component: DeprecatedTooltip,
  title: 'Tooltip',
  parameters: {
    componentSubtitle: 'shared tooltip component',
  },
};

export const DefaultLight = () => (
  <div
    style={{
      alignContent: 'center',
      display: 'grid',
      justifyContent: 'center',
      width: '300px',
      height: '300px',
      backgroundColor: '#000000',
    }}>
    <div id='portal' />
    <DeprecatedTooltip message='I am super fancy tooltip!'>
      <span
        style={{
          border: '1px solid white',
          borderRadius: '8px',
          color: 'white',
          padding: '8px',
        }}>
        Tooltip placeholder
      </span>
    </DeprecatedTooltip>
  </div>
);

export const LightBottom = () => (
  <div
    style={{
      alignContent: 'center',
      display: 'grid',
      justifyContent: 'center',
      width: '300px',
      height: '300px',
      backgroundColor: '#000000',
    }}>
    <div id='portal' />
    <DeprecatedTooltip message='I am super fancy tooltip!' position='bottom'>
      <span
        style={{
          border: '1px solid white',
          borderRadius: '8px',
          color: 'white',
          padding: '8px',
        }}>
        Tooltip placeholder
      </span>
    </DeprecatedTooltip>
  </div>
);

export const Dark = () => (
  <>
    <div id='portal' />
    <DeprecatedTooltip message='I am super fancy tooltip!' variant='dark'>
      <span
        style={{
          border: '1px solid black',
          borderRadius: '8px',
          padding: '8px',
        }}>
        Tooltip placeholder
      </span>
    </DeprecatedTooltip>
  </>
);

export const DarkBottom = () => (
  <>
    <div id='portal' />
    <DeprecatedTooltip message='I am super fancy tooltip!' position='bottom' variant='dark'>
      <span
        style={{
          border: '1px solid black',
          borderRadius: '8px',
          padding: '8px',
        }}>
        Tooltip placeholder
      </span>
    </DeprecatedTooltip>
  </>
);

export const Controlled = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const handleClick = () => {
    setIsVisible(true);

    setTimeout(() => setIsVisible(false), 2000);
  };

  return (
    <div
      style={{
        alignContent: 'center',
        display: 'grid',
        justifyContent: 'center',
        width: '300px',
        height: '300px',
        backgroundColor: '#000000',
      }}>
      <button
        style={{
          margin: '24px auto 96px',
          backgroundColor: 'white',
          padding: '12px',
          borderRadius: '8px',
        }}
        onClick={handleClick}>
        Click me
      </button>
      <div id='portal' />
      <DeprecatedTooltip
        controlled={true}
        isVisible={isVisible}
        message='I am super fancy tooltip!'>
        <span
          style={{
            border: '1px solid white',
            borderRadius: '8px',
            color: 'white',
            padding: '8px',
          }}>
          Tooltip placeholder
        </span>
      </DeprecatedTooltip>
    </div>
  );
};
