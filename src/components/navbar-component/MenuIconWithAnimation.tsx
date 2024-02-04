import UseAnimation from "react-useanimations";
import menu from 'react-useanimations/lib/menu'

 const MenuIconWithAnimation = () => {
    return (
      <UseAnimation
        animation={menu}
        size={60}
        render={(eventProps, animationProps) => (
          <button style={{ padding: '20px' }} type="button" {...eventProps}>
            <div {...animationProps} />
          </button>
        )}
      />
    );
  };

  export default MenuIconWithAnimation