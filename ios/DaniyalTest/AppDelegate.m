#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>


#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>





static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

#if RCT_DEV
#import <React/RCTDevLoadingView.h>
#endif


@implementation AppDelegate
@synthesize bridge = _bridge;
@synthesize voipRegistry = _voipRegistry;
@synthesize delegate = _delegate;


+ (AppDelegate*)sharedInstance {
  static AppDelegate* sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [[self alloc] init];
  });
  return sharedInstance;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif
  AppDelegate.sharedInstance.bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
#if RCT_DEV
    [AppDelegate.sharedInstance.bridge moduleForClass:[RCTDevLoadingView class]];
#endif

//  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
//  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
//                                                   moduleName:@"DaniyalTest"
//                                            initialProperties:nil];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:AppDelegate.sharedInstance.bridge
                                                     moduleName:@"DaniyalTest"
                                              initialProperties:nil];

  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [self setDelegate:self];
  [self initializePushKit];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (void) initializePushKit {
  _voipRegistry.delegate = self;
  NSMutableArray* set = [[NSMutableArray alloc] init];
  [set addObject:PKPushTypeVoIP];
  _voipRegistry.desiredPushTypes = [[NSSet alloc] initWithArray:set];
}

- (void) setDelegate:(id)newDelegate {
   _delegate = newDelegate;
}

- (void)pushRegistry:(nonnull PKPushRegistry *)registry didUpdatePushCredentials:(nonnull PKPushCredentials *)pushCredentials forType:(nonnull PKPushType)type {
  NSLog(@"pushRegistry:didUpdatePushCredentials:forType:");
  [_delegate credentialsUpdated:pushCredentials];
}

- (void)pushRegistry:(PKPushRegistry *)registry didInvalidatePushTokenForType:(PKPushType)type {
  NSLog(@"pushRegistry:didInvalidatePushTokenForType:");
  [_delegate credentialsInvalidated];
}


- (void)pushRegistry:(PKPushRegistry *)registry didReceiveIncomingPushWithPayload:(PKPushPayload *)payload forType:(PKPushType)type withCompletionHandler:(void (^)(void))completion {
  NSLog(@"pushRegistry:didReceiveIncomingPushWithPayload:forType:");
  [_delegate incomingPushReceived:payload completion:completion];
  
  NSString* versionString = [[UIDevice currentDevice] systemVersion];
  CGFloat version = [versionString floatValue];
  
  if (version >= 13.0) {
//    [completion invoke];
  }
}



- (void)credentialsInvalidated {
  
}

- (void)credentialsUpdated:(PKPushCredentials *)credentials {
  
}

- (void)incomingPushReceived:(PKPushPayload *)payload {
  
}

- (void)incomingPushReceived:(PKPushPayload *)payload completion:(void (^)(void))completion {
  
}

@end
