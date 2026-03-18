import {
  type ConfigPlugin,
  withInfoPlist,
  withAndroidManifest,
} from '@expo/config-plugins';
const UPI_APPS = require('../../lib/commonjs/upi-apps').default;

const withIosQueries: ConfigPlugin = (config) => {
  return withInfoPlist(config, (expoConfig) => {
    if (!expoConfig.modResults.LSApplicationQueriesSchemes) {
      expoConfig.modResults.LSApplicationQueriesSchemes = [];
    }

    const schemes = expoConfig.modResults.LSApplicationQueriesSchemes;

    UPI_APPS.forEach((app: any) => {
      if (!schemes.includes(app.iosScheme)) {
        schemes.push(app.iosScheme);
      }
    });

    return expoConfig;
  });
};

const withAndroidQueries: ConfigPlugin = (config) => {
  return withAndroidManifest(config, (expoConfig) => {
    return expoConfig;
  });
};

const withUpiAppDetector: ConfigPlugin = (config) => {
  config = withIosQueries(config);
  config = withAndroidQueries(config);
  return config;
};

export default withUpiAppDetector;
