/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

/** Properties for a generic button. */
interface Properties {
  /** The text to be displayed on the button. */
  text: string;

  /** Whether or not the button should be enabled. */
  disabled: boolean;

  /** The action to execute when clicking the button. */
  onClick?: () => void;
}

/** A generic button element. */
const Button = (props: Properties) => {
  return (
    <button type="button" {...props}>
      {props.text}
    </button>
  );
};

export default Button;
