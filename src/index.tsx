import { Platform } from 'react-native';
import UpiAppDetector from './NativeUpiAppDetector';
import type { UPIAppResult } from './types';

const { UPI_APPS } = require('../app.plugin');

export async function getUPIApps(): Promise<UPIAppResult[]> {
  const isAndroid = Platform.OS === 'android';

  const packageNames = UPI_APPS.map((app: UPIAppResult) =>
    isAndroid ? app.androidPackage : `${app.iosScheme}://`
  );

  try {
    const results = await UpiAppDetector.checkAppsInstalled(packageNames);

    return UPI_APPS.map((app: UPIAppResult) => {
      const key = isAndroid ? app.androidPackage : `${app.iosScheme}://`;
      return {
        ...app,
        isPresent: !!results[key],
      };
    });
  } catch (error) {
    console.warn('Failed to check installed apps', error);
    return UPI_APPS.map((app: UPIAppResult) => ({ ...app, isPresent: false }));
  }
}

export * from './types';
