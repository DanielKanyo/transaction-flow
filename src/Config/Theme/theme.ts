import { ActionIcon, Button, Checkbox, createTheme, Input, Select, UnstyledButton } from "@mantine/core";

import buttonClasses from "./button.module.css";
import checkboxClasses from "./checkbox.module.css";
import inputClasses from "./input.module.css";
import selectClasses from "./select.module.css";

export const theme = createTheme({
    components: {
        Input: Input.extend({ classNames: inputClasses }),
        InputWrapper: Input.Wrapper.extend({ classNames: inputClasses }),
        Select: Select.extend({ classNames: selectClasses }),
        Button: Button.extend({ classNames: buttonClasses }),
        ActionIcon: ActionIcon.extend({ classNames: buttonClasses }),
        Checkbox: Checkbox.extend({ classNames: checkboxClasses }),
        UnstyledButton: UnstyledButton.extend({ classNames: buttonClasses }),
    },
});
