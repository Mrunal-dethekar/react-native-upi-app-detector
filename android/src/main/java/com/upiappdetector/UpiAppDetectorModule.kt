package com.upiappdetector

import com.facebook.react.bridge.ReactApplicationContext

class UpiAppDetectorModule(reactContext: ReactApplicationContext) :
  NativeUpiAppDetectorSpec(reactContext) {

  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  companion object {
    const val NAME = NativeUpiAppDetectorSpec.NAME
  }
}
