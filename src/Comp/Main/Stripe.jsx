import React, { useState, useRef, useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import "./StripeStyles.scss";
import { validateHexValue } from "../../Helpers/helperFn";

const Stripe = ({
  backgroundColour,
  isLocked,
  handleLockClick,
  handleColourChange,
  index,
}) => {
  const [colour, setColour] = useState(backgroundColour);

  useEffect(() => {
    setColour(backgroundColour);
  }, [backgroundColour]);

  const handleOnFocus = (e) => {
    e.target.focus();
    textInput.current.setSelectionRange(1, 7);
  };

  const textInput = useRef(null);

  const handleOnChange = (e) => {
    const regex = /[#0-9A-F]/i;

    if (e.nativeEvent.inputType === "deleteContentBackward") {
      setColour(e.target.value);
    }

    if (regex.test(e.nativeEvent.data)) {
      setColour(e.target.value);
    }
  };

  const submitColour = (currentValue) => {
    //To do: write tests for this, manual testing is not enough
    if (!validateHexValue(currentValue)) {
      setColour(backgroundColour);
    } else {
      if (currentValue[0] !== "#" && currentValue.length === 3) {
        currentValue = currentValue
          .split("")
          .map((hex) => {
            return hex + hex;
          })
          .join("");
        currentValue = "#" + currentValue;
      }
      if (currentValue[0] === "#" && currentValue.length === 4) {
        currentValue = currentValue
          .split("")
          .map((hex) => {
            return hex + hex;
          })
          .join("");
        currentValue = currentValue.substring(1, currentValue.length);
      }
      if (currentValue.length === 6) {
        currentValue = "#" + currentValue;
      }
      handleColourChange(index, currentValue);
    }
  };

  return (
    <div
      className="single-stripe"
      style={{ backgroundColor: backgroundColour }}
    >
      <Tooltip title="Alternative shades" arrow>
        <i className="fas fa-th" />
      </Tooltip>

      <Tooltip title="Drag" arrow>
        <i className="fas fa-arrows-alt-h" />
      </Tooltip>

      <Tooltip title="Adjust" arrow>
        <i className="fas fa-sliders-h" />
      </Tooltip>

      {isLocked ? (
        <Tooltip title="Unlock" arrow>
          <i
            className="fas fa-lock"
            onClick={() => handleLockClick(index)}
            style={{ visibility: "visible", opacity: 1 }}
          />
        </Tooltip>
      ) : (
        <Tooltip title="Lock" arrow>
          <i
            className="fas fa-lock-open"
            onClick={() => handleLockClick(index)}
          />
        </Tooltip>
      )}

      <Tooltip title="Edit" arrow>
        <input
          disabled={isLocked}
          ref={textInput}
          type="text"
          maxLength="7"
          value={colour}
          onFocus={handleOnFocus}
          onChange={handleOnChange}
          onBlur={(e) => submitColour(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              submitColour(e.target.value);
              textInput.current.blur();
            }
          }}
        />
      </Tooltip>
    </div>
  );
};
export default Stripe;
