import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  checkAppsInstalled(packageNames: string[]): Promise<Record<string, boolean>>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('UpiAppDetector');
