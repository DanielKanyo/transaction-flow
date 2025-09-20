import { ActionIcon, Button, createTheme, Input, Select } from "@mantine/core";

import buttonClasses from "./button.module.css";
import inputClasses from "./input.module.css";
import selectClasses from "./select.module.css";

export const theme = createTheme({
    components: {
        Input: Input.extend({ classNames: inputClasses }),
        InputWrapper: Input.Wrapper.extend({ classNames: inputClasses }),
        Select: Select.extend({ classNames: selectClasses }),
        Button: Button.extend({ classNames: buttonClasses }),
        ActionIcon: ActionIcon.extend({ classNames: buttonClasses }),
    },
});
