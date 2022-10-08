//
//  Bridge.swift
//  DaniyalTest
//
//  Created by Admin on 07/10/2022.
//

import Foundation
import UIKit
import CoreMotion

@objc(Bridge)

class Bridge: RCTEventEmitter {
  public static var accessToken: String?
  public static var shared:Bridge?
  
  override init() {
    super.init()
    Bridge.shared = self
    notifyWhenDisconnect("")
  }
  
  @objc
  func notifyWhenDisconnect(_ message: String) {
    AppDelegate.sharedInstance()?.bridge.eventDispatcher().sendAppEvent( withName: "disconnect", body: message )
  }
  
  @objc
  func setToken(_ token: String) {
    print("[BRIDGE]: Set token \(token)")
    Bridge.accessToken = token
  }
  
  @objc
  func sendCall(_ number: String, shouldRecord: Bool) {
    TwilioManager.shared.makeCall(number: number, shouldRecord: shouldRecord)
    print("[BRIDGE]: Call event called from React Native to number \(number), should record? \(shouldRecord)")
  }
  
  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc
  override func supportedEvents() -> [String]! {
    return ["disconnect"]
  }
  
}
