const { withInfoPlist } = require('@expo/config-plugins');

const UPI_APPS = [
  {
    appName: 'PhonePe',
    androidPackage: 'com.phonepe.app',
    iosScheme: 'phonepe',
    identifier: 'phonepe',
  },
  {
    appName: 'Google Pay',
    androidPackage: 'com.google.android.apps.nbu.paisa.user',
    iosScheme: 'tez',
    identifier: 'gpay',
  },
  {
    appName: 'Paytm',
    androidPackage: 'net.one97.paytm',
    iosScheme: 'paytmmp',
    identifier: 'paytm',
  },
  {
    appName: 'BHIM',
    androidPackage: 'in.org.npci.upiapp',
    iosScheme: 'bhim',
    identifier: 'bhim',
  },
  {
    appName: 'CRED',
    androidPackage: 'com.dreamplug.androidapp',
    iosScheme: 'credpay',
    identifier: 'cred',
  },
];

const withUpiAppDetector = (config) => {
  return withInfoPlist(config, (expoConfig) => {
    if (!expoConfig.modResults.LSApplicationQueriesSchemes) {
      expoConfig.modResults.LSApplicationQueriesSchemes = [];
    }

    // Merge new schemes without duplicating
    UPI_APPS.map((app) => app.iosScheme).forEach((scheme) => {
      if (!expoConfig.modResults.LSApplicationQueriesSchemes.includes(scheme)) {
        expoConfig.modResults.LSApplicationQueriesSchemes.push(scheme);
      }
    });

    return expoConfig;
  });
};

module.exports = withUpiAppDetector;
module.exports.UPI_APPS = UPI_APPS;
