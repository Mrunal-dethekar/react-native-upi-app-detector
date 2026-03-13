#import "UpiAppDetector.h"

@implementation UpiAppDetector
- (void)checkAppsInstalled:(NSArray<NSString *> *)packageNames resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    NSMutableDictionary<NSString *, NSNumber *> *result = [NSMutableDictionary new];
    
    for (NSString *packageName in packageNames) {
        NSURL *url = [NSURL URLWithString:packageName];
        if (url && [[UIApplication sharedApplication] canOpenURL:url]) {
            result[packageName] = @YES;
        } else {
            result[packageName] = @NO;
        }
    }
    
    resolve(result);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeUpiAppDetectorSpecJSI>(params);
}

+ (NSString *)moduleName
{
  return @"UpiAppDetector";
}

@end