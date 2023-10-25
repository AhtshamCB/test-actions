#import <React/RCTLinkingManager.h>
#import "AppDelegate.h"
#import "Firebase.h"
#import "FirebaseCore.h"
#import "FirebaseAuth.h"
#import <React/RCTBridge.h>
#import <React/RCTRootView.h>
#import <React/RCTBundleURLProvider.h>
#import "RNBootSplash.h"
//[Dev] appcenter
#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>

//[Dev] codepush
#import <CodePush/CodePush.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  self.moduleName = @"teefiapp";
  NSMutableDictionary *appSettings = [[[NSBundle mainBundle] objectForInfoDictionaryKey:@"RASettings"] mutableCopy];
  NSString *scheme = [appSettings objectForKey:@"scheme"];
  NSString *filePath;
  //Firebase setup run
   if([scheme isEqualToString:@"dev"]){
      NSLog(@"[FIREBASE] Dev mode.");
      filePath = [[NSBundle mainBundle] pathForResource:@"GoogleService-Info" ofType:@"plist" inDirectory:@"Dev"];
    }else {
      NSLog(@"[FIREBASE] Production mode.");
      filePath = [[NSBundle mainBundle] pathForResource:@"GoogleService-Info" ofType:@"plist" inDirectory:@"Production"];
    }
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  //[Dev] appcenter
  [AppCenterReactNative register];
  [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
  [AppCenterReactNativeCrashes registerWithAutomaticProcessing];

  bool didFinish=[super application:application didFinishLaunchingWithOptions:launchOptions];
  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:self.window.rootViewController.view];
  return didFinish;
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge

{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [CodePush bundleURL];
#endif
}
- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}
/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

@end

