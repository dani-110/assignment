//
//  TwilioManager.swift
//  DaniyalTest
//
//  Created by Admin on 08/10/2022.
//

import Foundation
import UIKit
import AVFoundation
import PushKit
import CallKit
import TwilioVoice

class TwilioManager: NSObject {
  static let shared = TwilioManager()
  
  let accessToken = ""
  let twimlParamTo = "to"
  let kRegistrationTTLInDays = 365
  let kCachedDeviceToken = "CachedDeviceToken"
  let kCachedBindingDate = "CachedBindingDate"
  
  var callingNumber = ""
  var callKitCompletionCallback: ((Bool) -> Void)? = nil
  var audioDevice = DefaultAudioDevice()
  var activeCallInvites: [String: CallInvite]! = [:]
  var activeCalls: [String: Call]! = [:]
  
  var activeCall: Call? = nil

  var callKitProvider: CXProvider?
  let callKitCallController = CXCallController()
  var userInitiatedDisconnect: Bool = false
  
  var playCustomRingback = false
  var ringtonePlayer: AVAudioPlayer? = nil
  
  var incomingPushCompletionCallback: (() -> Void)?
  
  override init(){
    super.init()
    /* Please note that the designated initializer `CXProviderConfiguration(localizedName: String)` has been deprecated on iOS 14. */
    let configuration = CXProviderConfiguration(localizedName: "Voice Quickstart")
    configuration.maximumCallGroups = 1
    configuration.maximumCallsPerCallGroup = 1
    callKitProvider = CXProvider(configuration: configuration)
    if let provider = callKitProvider {
        provider.setDelegate(self, queue: nil)
    }
    
    TwilioVoiceSDK.audioDevice = audioDevice
  }
  
  func showMicrophoneAccessRequest(_ uuid: UUID, _ handle: String) {
      let alertController = UIAlertController(title: "Voice Quick Start",
                                              message: "Microphone permission not granted",
                                              preferredStyle: .alert)
      
      let continueWithoutMic = UIAlertAction(title: "Continue without microphone", style: .default) { [weak self] _ in
          self?.performStartCallAction(uuid: uuid, handle: handle)
      }
      
      let goToSettings = UIAlertAction(title: "Settings", style: .default) { _ in
        UIApplication.shared.open(URL(string: UIApplication.openSettingsURLString)!,
                                  options: [UIApplication.OpenExternalURLOptionsKey.universalLinksOnly: false],
                                    completionHandler: nil)
      }
      
      let cancel = UIAlertAction(title: "Cancel", style: .cancel) { [weak self] _ in
//          self?.toggleUIState(isEnabled: true, showCallControl: false)
//          self?.stopSpin()
      }
      
      [continueWithoutMic, goToSettings, cancel].forEach { alertController.addAction($0) }
      
//      present(alertController, animated: true, completion: nil)
  }
  
  func makeCall(number: String, shouldRecord: Bool) {
    callingNumber = number
      guard activeCall == nil else {
          userInitiatedDisconnect = true
          performEndCallAction(uuid: activeCall!.uuid!)
//          toggleUIState(isEnabled: false, showCallControl: false)
          
          return
      }
      
      checkRecordPermission { [weak self] permissionGranted in
          let uuid = UUID()
          let handle = "Voice Bot"
          
          guard !permissionGranted else {
              self?.performStartCallAction(uuid: uuid, handle: handle)
              return
          }
      
          self?.showMicrophoneAccessRequest(uuid, handle)
      }
  }
  
  func checkRecordPermission(completion: @escaping (_ permissionGranted: Bool) -> Void) {
    let permissionStatus = AVAudioSession.sharedInstance().recordPermission
      
      switch permissionStatus {
      case .granted:
          // Record permission already granted.
          completion(true)
      case .denied:
          // Record permission denied.
          completion(false)
      case .undetermined:
          // Requesting record permission.
          // Optional: pop up app dialog to let the users know if they want to request.
          AVAudioSession.sharedInstance().requestRecordPermission { granted in completion(granted) }
      default:
          completion(false)
      }
  }
  
  @IBAction func muteSwitchToggled(_ sender: UISwitch) {
      // The sample app supports toggling mute from app UI only on the last connected call.
      guard let activeCall = activeCall else { return }
      
      activeCall.isMuted = sender.isOn
  }
  
  @IBAction func speakerSwitchToggled(_ sender: UISwitch) {
      toggleAudioRoute(toSpeaker: sender.isOn)
  }
  
  
  // MARK: AVAudioSession
  
  func toggleAudioRoute(toSpeaker: Bool) {
      // The mode set by the Voice SDK is "VoiceChat" so the default audio route is the built-in receiver. Use port override to switch the route.
      audioDevice.block = {
          DefaultAudioDevice.DefaultAVAudioSessionConfigurationBlock()
          
          do {
              if toSpeaker {
                  try AVAudioSession.sharedInstance().overrideOutputAudioPort(.speaker)
              } else {
                  try AVAudioSession.sharedInstance().overrideOutputAudioPort(.none)
              }
          } catch {
              NSLog(error.localizedDescription)
          }
      }
      
      audioDevice.block()
  }
  
  
  // MARK: Icon spinning
  
//  func startSpin() {
//      guard !isSpinning else { return }
//
//      isSpinning = true
//      spin(options: UIViewAnimationOptions.curveEaseIn)
//  }
  
//  func stopSpin() {
//      isSpinning = false
//  }
  
//  func spin(options: UIViewAnimationOptions) {
//      UIView.animate(withDuration: 0.5, delay: 0.0, options: options, animations: { [weak iconView] in
//          if let iconView = iconView {
//              iconView.transform = iconView.transform.rotated(by: CGFloat(Double.pi/2))
//          }
//      }) { [weak self] finished in
//          guard let strongSelf = self else { return }
//
//          if finished {
//              if strongSelf.isSpinning {
//                  strongSelf.spin(options: UIViewAnimationOptions.curveLinear)
//              } else if options != UIViewAnimationOptions.curveEaseOut {
//                  strongSelf.spin(options: UIViewAnimationOptions.curveEaseOut)
//              }
//          }
//      }
//  }
}

extension TwilioManager: PushKitEventDelegate {
  func credentialsUpdated(_ credentials: PKPushCredentials) {
        guard
            (registrationRequired() || UserDefaults.standard.data(forKey: kCachedDeviceToken) != credentials.token)
        else {
            return
        }

        let cachedDeviceToken = credentials.token
        /*
         * Perform registration if a new device token is detected.
         */
        TwilioVoiceSDK.register(accessToken: accessToken, deviceToken: cachedDeviceToken) { error in
            if let error = error {
                NSLog("An error occurred while registering: \(error.localizedDescription)")
            } else {
                NSLog("Successfully registered for VoIP push notifications.")
                
                // Save the device token after successfully registered.
              UserDefaults.standard.set(cachedDeviceToken, forKey: self.kCachedDeviceToken)
                
                /**
                 * The TTL of a registration is 1 year. The TTL for registration for this device/identity
                 * pair is reset to 1 year whenever a new registration occurs or a push notification is
                 * sent to this device/identity pair.
                 */
              UserDefaults.standard.set(Date(), forKey: self.kCachedBindingDate)
            }
        }
    }
    
    /**
     * The TTL of a registration is 1 year. The TTL for registration for this device/identity pair is reset to
     * 1 year whenever a new registration occurs or a push notification is sent to this device/identity pair.
     * This method checks if binding exists in UserDefaults, and if half of TTL has been passed then the method
     * will return true, else false.
     */
    func registrationRequired() -> Bool {
        guard
            let lastBindingCreated = UserDefaults.standard.object(forKey: kCachedBindingDate)
        else { return true }
        
        let date = Date()
        var components = DateComponents()
        components.setValue(kRegistrationTTLInDays/2, for: .day)
        let expirationDate = Calendar.current.date(byAdding: components, to: lastBindingCreated as! Date)!

        if expirationDate.compare(date) == ComparisonResult.orderedDescending {
            return false
        }
        return true;
    }
    
    func credentialsInvalidated() {
        guard let deviceToken = UserDefaults.standard.data(forKey: kCachedDeviceToken) else { return }
        
        TwilioVoiceSDK.unregister(accessToken: accessToken, deviceToken: deviceToken) { error in
            if let error = error {
                NSLog("An error occurred while unregistering: \(error.localizedDescription)")
            } else {
                NSLog("Successfully unregistered from VoIP push notifications.")
            }
        }
        
        UserDefaults.standard.removeObject(forKey: kCachedDeviceToken)
        
        // Remove the cached binding as credentials are invalidated
        UserDefaults.standard.removeObject(forKey: kCachedBindingDate)
    }
    
  func incomingPushReceived(_ payload: PKPushPayload) {
        // The Voice SDK will use main queue to invoke `cancelledCallInviteReceived:error:` when delegate queue is not passed
        TwilioVoiceSDK.handleNotification(payload.dictionaryPayload, delegate: self, delegateQueue: nil)
    }
    
  func incomingPushReceived(_ payload: PKPushPayload, completion: @escaping () -> Void) {
        // The Voice SDK will use main queue to invoke `cancelledCallInviteReceived:error:` when delegate queue is not passed
        TwilioVoiceSDK.handleNotification(payload.dictionaryPayload, delegate: self, delegateQueue: nil)
        
        if let version = Float(UIDevice.current.systemVersion), version < 13.0 {
            // Save for later when the notification is properly handled.
            incomingPushCompletionCallback = completion
        }
    }

    func incomingPushHandled() {
        guard let completion = incomingPushCompletionCallback else { return }
        
        incomingPushCompletionCallback = nil
        completion()
    }
}

// MARK: - TVONotificaitonDelegate

extension TwilioManager: NotificationDelegate {
    func callInviteReceived(callInvite: CallInvite) {
        NSLog("callInviteReceived:")
        
        /**
         * The TTL of a registration is 1 year. The TTL for registration for this device/identity
         * pair is reset to 1 year whenever a new registration occurs or a push notification is
         * sent to this device/identity pair.
         */
        UserDefaults.standard.set(Date(), forKey: kCachedBindingDate)
        
        let callerInfo: TVOCallerInfo = callInvite.callerInfo
        if let verified: NSNumber = callerInfo.verified {
            if verified.boolValue {
                NSLog("Call invite received from verified caller number!")
            }
        }
        
        let from = (callInvite.from ?? "Voice Bot").replacingOccurrences(of: "client:", with: "")

        // Always report to CallKit
        reportIncomingCall(from: from, uuid: callInvite.uuid)
        activeCallInvites[callInvite.uuid.uuidString] = callInvite
    }
    
    func cancelledCallInviteReceived(cancelledCallInvite: CancelledCallInvite, error: Error) {
        NSLog("cancelledCallInviteCanceled:error:, error: \(error.localizedDescription)")

        guard let activeCallInvites = activeCallInvites, !activeCallInvites.isEmpty else {
            NSLog("No pending call invite")
            return
        }
        
        let callInvite = activeCallInvites.values.first { invite in invite.callSid == cancelledCallInvite.callSid }
        
        if let callInvite = callInvite {
            performEndCallAction(uuid: callInvite.uuid)
            self.activeCallInvites.removeValue(forKey: callInvite.uuid.uuidString)
        }
    }
}

// MARK: - TVOCallDelegate

extension TwilioManager: CallDelegate {
    func callDidStartRinging(call: Call) {
        NSLog("callDidStartRinging:")
        
//        placeCallButton.setTitle("Ringing", for: .normal)
        
        /*
         When [answerOnBridge](https://www.twilio.com/docs/voice/twiml/dial#answeronbridge) is enabled in the
         <Dial> TwiML verb, the caller will not hear the ringback while the call is ringing and awaiting to be
         accepted on the callee's side. The application can use the `AVAudioPlayer` to play custom audio files
         between the `[TVOCallDelegate callDidStartRinging:]` and the `[TVOCallDelegate callDidConnect:]` callbacks.
        */
        if playCustomRingback {
            playRingback()
        }
    }
    
    func callDidConnect(call: Call) {
        NSLog("callDidConnect:")
        
        if playCustomRingback {
            stopRingback()
        }
        
        if let callKitCompletionCallback = callKitCompletionCallback {
            callKitCompletionCallback(true)
        }
        
//        placeCallButton.setTitle("Hang Up", for: .normal)
//
//        toggleUIState(isEnabled: true, showCallControl: true)
//        stopSpin()
//        toggleAudioRoute(toSpeaker: true)
    }
    
    func call(call: Call, isReconnectingWithError error: Error) {
        NSLog("call:isReconnectingWithError:")
        
//        placeCallButton.setTitle("Reconnecting", for: .normal)
//
//        toggleUIState(isEnabled: false, showCallControl: false)
    }
    
    func callDidReconnect(call: Call) {
        NSLog("callDidReconnect:")
        
//        placeCallButton.setTitle("Hang Up", for: .normal)
//
//        toggleUIState(isEnabled: true, showCallControl: true)
    }
    
    func callDidFailToConnect(call: Call, error: Error) {
        NSLog("Call failed to connect: \(error.localizedDescription)")
        
        if let completion = callKitCompletionCallback {
            completion(false)
        }
        
        if let provider = callKitProvider {
            provider.reportCall(with: call.uuid!, endedAt: Date(), reason: CXCallEndedReason.failed)
        }

        callDisconnected(call: call)
    }
    /////// REACT - Delegate
    func callDidDisconnect(call: Call, error: Error?) {
        if let error = error {
            NSLog("Call failed: \(error.localizedDescription)")
        } else {
            NSLog("Call disconnected")
        }
        
        if !userInitiatedDisconnect {
            var reason = CXCallEndedReason.remoteEnded
            
            if error != nil {
                reason = .failed
            }
            
            if let provider = callKitProvider {
                provider.reportCall(with: call.uuid!, endedAt: Date(), reason: reason)
            }
        }

        callDisconnected(call: call)
    }
    
    func callDisconnected(call: Call) {
        if call == activeCall {
            activeCall = nil
        }
        
        activeCalls.removeValue(forKey: call.uuid!.uuidString)
        
        userInitiatedDisconnect = false
        
        if playCustomRingback {
            stopRingback()
        }
      
      Bridge.shared?.notifyWhenDisconnect("Call disconnected")
//        stopSpin()
//        toggleUIState(isEnabled: true, showCallControl: false)
//        placeCallButton.setTitle("Call", for: .normal)
    }
    
    func callDidReceiveQualityWarnings(call: Call, currentWarnings: Set<NSNumber>, previousWarnings: Set<NSNumber>) {
        /**
        * currentWarnings: existing quality warnings that have not been cleared yet
        * previousWarnings: last set of warnings prior to receiving this callback
        *
        * Example:
        *   - currentWarnings: { A, B }
        *   - previousWarnings: { B, C }
        *   - intersection: { B }
        *
        * Newly raised warnings = currentWarnings - intersection = { A }
        * Newly cleared warnings = previousWarnings - intersection = { C }
        */
        var warningsIntersection: Set<NSNumber> = currentWarnings
        warningsIntersection = warningsIntersection.intersection(previousWarnings)
        
        var newWarnings: Set<NSNumber> = currentWarnings
        newWarnings.subtract(warningsIntersection)
        if newWarnings.count > 0 {
            qualityWarningsUpdatePopup(newWarnings, isCleared: false)
        }
        
        var clearedWarnings: Set<NSNumber> = previousWarnings
        clearedWarnings.subtract(warningsIntersection)
        if clearedWarnings.count > 0 {
            qualityWarningsUpdatePopup(clearedWarnings, isCleared: true)
        }
    }
    
    func qualityWarningsUpdatePopup(_ warnings: Set<NSNumber>, isCleared: Bool) {
        var popupMessage: String = "Warnings detected: "
        if isCleared {
            popupMessage = "Warnings cleared: "
        }
        
//        let mappedWarnings: [String] = warnings.map { number in warningString(Call.QualityWarning(rawValue: number.uintValue)!)}
//        popupMessage += mappedWarnings.joined(separator: ", ")
//
//        qualityWarningsToaster.alpha = 0.0
//        qualityWarningsToaster.text = popupMessage
//        UIView.animate(withDuration: 1.0, animations: {
//            self.qualityWarningsToaster.isHidden = false
//            self.qualityWarningsToaster.alpha = 1.0
//        }) { [weak self] finish in
//            guard let strongSelf = self else { return }
//            let deadlineTime = DispatchTime.now() + .seconds(5)
//            DispatchQueue.main.asyncAfter(deadline: deadlineTime, execute: {
//                UIView.animate(withDuration: 1.0, animations: {
//                    strongSelf.qualityWarningsToaster.alpha = 0.0
//                }) { (finished) in
//                    strongSelf.qualityWarningsToaster.isHidden = true
//                }
//            })
//        }
    }
    
    func warningString(_ warning: Call.QualityWarning) -> String {
        switch warning {
        case .highRtt: return "high-rtt"
        case .highJitter: return "high-jitter"
        case .highPacketsLostFraction: return "high-packets-lost-fraction"
        case .lowMos: return "low-mos"
        case .constantAudioInputLevel: return "constant-audio-input-level"
        default: return "Unknown warning"
        }
    }
    
    
    // MARK: Ringtone
    
    func playRingback() {
        let ringtonePath = URL(fileURLWithPath: Bundle.main.path(forResource: "ringtone", ofType: "wav")!)
        
        do {
            ringtonePlayer = try AVAudioPlayer(contentsOf: ringtonePath)
            ringtonePlayer?.delegate = self
            ringtonePlayer?.numberOfLoops = -1
            
            ringtonePlayer?.volume = 1.0
            ringtonePlayer?.play()
        } catch {
            NSLog("Failed to initialize audio player")
        }
    }
    
    func stopRingback() {
        guard let ringtonePlayer = ringtonePlayer, ringtonePlayer.isPlaying else { return }
        
        ringtonePlayer.stop()
    }
}

// MARK: - CXProviderDelegate

extension TwilioManager: CXProviderDelegate {
    func providerDidReset(_ provider: CXProvider) {
        NSLog("providerDidReset:")
        audioDevice.isEnabled = false
    }

    func providerDidBegin(_ provider: CXProvider) {
        NSLog("providerDidBegin")
    }

    func provider(_ provider: CXProvider, didActivate audioSession: AVAudioSession) {
        NSLog("provider:didActivateAudioSession:")
        audioDevice.isEnabled = true
    }

    func provider(_ provider: CXProvider, didDeactivate audioSession: AVAudioSession) {
        NSLog("provider:didDeactivateAudioSession:")
        audioDevice.isEnabled = false
    }

    func provider(_ provider: CXProvider, timedOutPerforming action: CXAction) {
        NSLog("provider:timedOutPerformingAction:")
    }

    func provider(_ provider: CXProvider, perform action: CXStartCallAction) {
        NSLog("provider:performStartCallAction:")
        
        
        provider.reportOutgoingCall(with: action.callUUID, startedConnectingAt: Date())
        
        performVoiceCall(uuid: action.callUUID, client: "") { success in
            if success {
                NSLog("performVoiceCall() successful")
                provider.reportOutgoingCall(with: action.callUUID, connectedAt: Date())
            } else {
                NSLog("performVoiceCall() failed")
            }
        }
        
        action.fulfill()
    }

    func provider(_ provider: CXProvider, perform action: CXAnswerCallAction) {
        NSLog("provider:performAnswerCallAction:")
        
        performAnswerVoiceCall(uuid: action.callUUID) { success in
            if success {
                NSLog("performAnswerVoiceCall() successful")
            } else {
                NSLog("performAnswerVoiceCall() failed")
            }
        }
        
        action.fulfill()
    }

    func provider(_ provider: CXProvider, perform action: CXEndCallAction) {
        NSLog("provider:performEndCallAction:")
        
        if let invite = activeCallInvites[action.callUUID.uuidString] {
            invite.reject()
            activeCallInvites.removeValue(forKey: action.callUUID.uuidString)
        } else if let call = activeCalls[action.callUUID.uuidString] {
            call.disconnect()
        } else {
            NSLog("Unknown UUID to perform end-call action with")
        }

        action.fulfill()
    }
    
    func provider(_ provider: CXProvider, perform action: CXSetHeldCallAction) {
        NSLog("provider:performSetHeldAction:")
        
        if let call = activeCalls[action.callUUID.uuidString] {
            call.isOnHold = action.isOnHold
            action.fulfill()
        } else {
            action.fail()
        }
    }
    
    func provider(_ provider: CXProvider, perform action: CXSetMutedCallAction) {
        NSLog("provider:performSetMutedAction:")

        if let call = activeCalls[action.callUUID.uuidString] {
            call.isMuted = action.isMuted
            action.fulfill()
        } else {
            action.fail()
        }
    }

    
    // MARK: Call Kit Actions
    func performStartCallAction(uuid: UUID, handle: String) {
        guard let provider = callKitProvider else {
            NSLog("CallKit provider not available")
            return
        }
        
        let callHandle = CXHandle(type: .generic, value: handle)
        let startCallAction = CXStartCallAction(call: uuid, handle: callHandle)
        let transaction = CXTransaction(action: startCallAction)

        callKitCallController.request(transaction) { error in
            if let error = error {
                NSLog("StartCallAction transaction request failed: \(error.localizedDescription)")
                return
            }

            NSLog("StartCallAction transaction request successful")

            let callUpdate = CXCallUpdate()
            
            callUpdate.remoteHandle = callHandle
            callUpdate.supportsDTMF = true
            callUpdate.supportsHolding = true
            callUpdate.supportsGrouping = false
            callUpdate.supportsUngrouping = false
            callUpdate.hasVideo = false

            provider.reportCall(with: uuid, updated: callUpdate)
        }
    }

    func reportIncomingCall(from: String, uuid: UUID) {
        guard let provider = callKitProvider else {
            NSLog("CallKit provider not available")
            return
        }

        let callHandle = CXHandle(type: .generic, value: from)
        let callUpdate = CXCallUpdate()
        
        callUpdate.remoteHandle = callHandle
        callUpdate.supportsDTMF = true
        callUpdate.supportsHolding = true
        callUpdate.supportsGrouping = false
        callUpdate.supportsUngrouping = false
        callUpdate.hasVideo = false

        provider.reportNewIncomingCall(with: uuid, update: callUpdate) { error in
            if let error = error {
                NSLog("Failed to report incoming call successfully: \(error.localizedDescription).")
            } else {
                NSLog("Incoming call successfully reported.")
            }
        }
    }

    func performEndCallAction(uuid: UUID) {

        let endCallAction = CXEndCallAction(call: uuid)
        let transaction = CXTransaction(action: endCallAction)

        callKitCallController.request(transaction) { error in
            if let error = error {
                NSLog("EndCallAction transaction request failed: \(error.localizedDescription).")
            } else {
                NSLog("EndCallAction transaction request successful")
            }
        }
    }
    
    func performVoiceCall(uuid: UUID, client: String?, completionHandler: @escaping (Bool) -> Void) {
      let connectOptions = ConnectOptions(accessToken: Bridge.accessToken ?? "") { builder in
          builder.params = [self.twimlParamTo: self.callingNumber]
            builder.uuid = uuid
        }
        
        let call = TwilioVoiceSDK.connect(options: connectOptions, delegate: self)
        activeCall = call
        activeCalls[call.uuid!.uuidString] = call
        callKitCompletionCallback = completionHandler
    }
    
    func performAnswerVoiceCall(uuid: UUID, completionHandler: @escaping (Bool) -> Void) {
        guard let callInvite = activeCallInvites[uuid.uuidString] else {
            NSLog("No CallInvite matches the UUID")
            return
        }
        
        let acceptOptions = AcceptOptions(callInvite: callInvite) { builder in
            builder.uuid = callInvite.uuid
        }
        
        let call = callInvite.accept(options: acceptOptions, delegate: self)
        activeCall = call
        activeCalls[call.uuid!.uuidString] = call
        callKitCompletionCallback = completionHandler
        
        activeCallInvites.removeValue(forKey: uuid.uuidString)
        
        guard #available(iOS 13, *) else {
            incomingPushHandled()
            return
        }
    }
}

// MARK: - AVAudioPlayerDelegate

extension TwilioManager: AVAudioPlayerDelegate {
    func audioPlayerDidFinishPlaying(_ player: AVAudioPlayer, successfully flag: Bool) {
        if flag {
            NSLog("Audio player finished playing successfully");
        } else {
            NSLog("Audio player finished playing with some error");
        }
    }
    
    func audioPlayerDecodeErrorDidOccur(_ player: AVAudioPlayer, error: Error?) {
        if let error = error {
            NSLog("Decode error occurred: \(error.localizedDescription)")
        }
    }
}
