# Radix UI Themes — basic component pattern

Reference snippet for wrapping the app in Radix's `Theme` provider and using
themed components (e.g. `Button`).

```tsx
import "@radix-ui/themes/styles.css";
import { Theme, Button } from "@radix-ui/themes";

export default () => (
    <Theme>
        <Button>Hey 👋</Button>
    </Theme>
);
```

Notes:
- Requires the `@radix-ui/themes` package once the app is scaffolded.
- `Theme` should wrap the app root; theme tokens (radius, accent color, etc.)
  are configured as props on `Theme`.
