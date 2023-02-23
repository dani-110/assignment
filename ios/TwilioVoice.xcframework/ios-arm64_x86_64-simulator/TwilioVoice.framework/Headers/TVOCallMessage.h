//
//  TVOCallMessage.h
//  TwilioVoice
//
//  Copyright © 2022 Twilio, Inc. All rights reserved.
//

/**
 * Enumeration of call message types.
 */
typedef NS_ENUM(NSUInteger, TVOCallMessageType) {
    TVOCallMessageUserDefinedMessage = 0    ///< User-defined message.
}
NS_SWIFT_NAME(Call.MessageType);


#pragma mark - TVOCallMessageBuilder

/**
 *  `TVOCallMessageBuilder` is a builder class for `TVOCallMessage`.
 */
NS_SWIFT_NAME(CallMessageBuilder)
@interface TVOCallMessageBuilder : NSObject

/**
 * @brief The type for the message.
 */
@property (nonatomic, assign) TVOCallMessageType messageType;

/**
 * @brief The MIME type for the message.
 *
 * @discussion Currently the only supported type is "application/json", which is also the default value.
 */
@property (nonatomic, copy, nullable) NSString *contentType;

/**
 * @brief The content body of the message.
 *
 * @discussion The format of the message body must match the content type. The size limit of the message content
 * is 10 KB. `[TVOCall sendMessage:]` with message content that exceeds the size limitation will result in the
 * `[TVOCallMessageDelegate call:didFailToSendMessage:error]` callback.
 *
 * @discussion A call message with content that does not match the content type will not result in the `[TVOCallMessageDelegate call:didFailToSendMessage:error]`
 * callback but will generate an error in your Twilio developer console. For example, a call message with content type "application/json" but
 * with the content "Hello World", which is not a valid JSON object, will result in such error.
 */
@property (nonatomic, copy, nonnull) NSString *content;

/**
 *  @brief You should not initialize `TVOCallMessageBuilder` directly, use a `TVOCallMessageBuilderBlock` instead.
 */
- (null_unspecified instancetype)init __attribute__((unavailable("Use the `TVOCallMessage` initializer instead.")));

@end


#pragma mark - TVOCallMessage

/**
 *  `TVOCallMessageBuilderBlock` allows you to construct `TVOCallMessage` using the builder pattern.
 *
 *  @param builder The builder
 */
typedef void (^TVOCallMessageBuilderBlock)(TVOCallMessageBuilder * _Nonnull builder)
NS_SWIFT_NAME(CallMessageBuilder.Block);

/**
   @brief `TVOCallMessage` represents the in-call message and its configuration.
 
   @discussion Message builder to use when using the `[TVOCall sendMessage:]` method. Example:
 
   ```
     let messageContent = "{\"foo\": \"bar\"}"
     let callMessage = CallMessage(content: messageContent)
 
     let voiceEventSid = call.sendMessage(callMessage)
   ```
 */
NS_SWIFT_NAME(CallMessage)
@interface TVOCallMessage : NSObject

/**
 * @brief The type for the message.
 */
@property (nonatomic, readonly, assign) TVOCallMessageType messageType;

/**
 * @brief The MIME type for the message.
 *
 * @discussion Currently the only supported type is "application/json", which is also the default value.
 */
@property (nonatomic, copy, readonly, nullable) NSString *contentType;

/**
 * @brief The content body of the message.
 *
 * @discussion The format of the message body must match the content type. The size limit of the message content
 * is 10 KB. `[TVOCall sendMessage:]` with message content that exceeds the size limitation will result in the
 * `[TVOCallMessageDelegate call:didFailToSendMessage:error]` callback.
 *
 * @discussion A call message with content that does not match the content type will not result in the `[TVOCallMessageDelegate call:didFailToSendMessage:error]`
 * callback but will generate an error in your Twilio developer console. For example, a call message with content type "application/json" but
 * with the content "Hello World", which is not a valid JSON object, will result in such error.
 */
@property (nonatomic, copy, readonly, nonnull) NSString *content;

/**
 * @brief The unique identifier of the message.
 */
@property (nonatomic, copy, readonly, nonnull) NSString *voiceEventSid;

/**
 *  @brief Developers shouldn't initialize this class directly.
 *
 *  @discussion Use the `TVOCallMessage`  builder method instead.
 */
- (null_unspecified instancetype)init __attribute__((unavailable("Use the `TVOCallMessage` initializer instead.")));

/**
 *  @brief Creates `TVOCallMessage` with the message content.
 *
 *  @param content The message content.
 *
 *  @discussion Default values will be used for both the message type (`TVOCallMessageUserDefinedMessage`) and the content type (`application/json`).
 *
 *  @return An instance of `TVOCallMessage`.
 */
+ (nonnull instancetype)messageWithContent:(nonnull NSString *)content;

@end
