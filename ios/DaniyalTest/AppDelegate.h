#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <TwilioVoice/TwilioVoice.h>
#import <PushKit/PushKit.h>

@protocol PushKitEventDelegate
- (void)credentialsUpdated:(PKPushCredentials*) credentials;
- (void)credentialsInvalidated;
- (void)incomingPushReceived:(PKPushPayload*) payload;
- (void)incomingPushReceived:(PKPushPayload*) payload completion:(void (^)(void))completion;

@end

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, PKPushRegistryDelegate, PushKitEventDelegate>

+ (AppDelegate*)sharedInstance;
- (void) setDelegate:(id)newDelegate;
@property (nonatomic, strong) RCTBridge *bridge;
@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, strong) id delegate;
@property (nonatomic, strong) PKPushRegistry* voipRegistry;
@end
