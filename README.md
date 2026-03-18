# react-native-upi-app-detector

Detect which specific popular UPI payment apps are installed on Android and iOS devices. This library is pre-configured to detect **PhonePe, Google Pay, Paytm, BHIM, and CRED**.

## Installation

```sh
npm install react-native-upi-app-detector
```

## Configuration

### Expo (Recommended)

If you are using Expo, simply add the plugin to your `app.json` or `app.config.js`. The plugin automatically handles the required `LSApplicationQueriesSchemes` for iOS.

```json
{
  "expo": {
    "plugins": ["react-native-upi-app-detector"]
  }
}
```

### iOS (Bare React Native)

You must add the UPI app schemes to your `Info.plist` inside the `<dict>` block to allow querying for installed apps:

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>phonepe</string>
  <string>tez</string>
  <string>paytmmp</string>
  <string>bhim</string>
  <string>credpay</string>
</array>
```

### Android

No manual configuration is required. The library automatically merges the necessary `<queries>` into your `AndroidManifest.xml`.

## Usage

```tsx
import { getUPIApps } from 'react-native-upi-app-detector';
import type { UPIAppResult } from 'react-native-upi-app-detector';

// ...

const checkApps = async () => {
  const apps: UPIAppResult[] = await getUPIApps();

  apps.forEach((app) => {
    if (app.isPresent) {
      console.log(`${app.appName} is installed!`);
    }
  });
};
```

### API Reference

#### `getUPIApps()`

Returns a promise that resolves to an array of `UPIAppResult` objects.

#### `UPIAppResult` Type

| Property         | Type      | Description                                |
| :--------------- | :-------- | :----------------------------------------- |
| `appName`        | `string`  | Human-readable name (e.g., "PhonePe")      |
| `identifier`     | `string`  | Short identifier (e.g., "phonepe", "gpay") |
| `androidPackage` | `string`  | Android package name                       |
| `iosScheme`      | `string`  | iOS URL scheme                             |
| `isPresent`      | `boolean` | Whether the app is installed on the device |

## Supported Apps

The library currently detects the following UPI apps:

- PhonePe
- Google Pay (Tez)
- Paytm
- BHIM
- CRED

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
