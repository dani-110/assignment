//
//  Bridge.m
//  DaniyalTest
//
//  Created by Admin on 07/10/2022.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTBridge.h"
#import "React/RCTEventDispatcher.h"
@interface RCT_EXTERN_MODULE(Bridge, NSObject)
RCT_EXTERN_METHOD(setToken:(NSString *)token)
RCT_EXTERN_METHOD(sendCall:(NSString *)number shouldRecord: (BOOL)shouldRecord)
RCT_EXTERN_METHOD(notifyWhenDisconnect:(NSString *)message)
@end
