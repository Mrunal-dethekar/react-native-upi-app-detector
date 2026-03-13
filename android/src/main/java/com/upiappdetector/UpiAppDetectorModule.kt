package com.upiappdetector

import com.facebook.react.bridge.ReactApplicationContext
import android.content.pm.PackageManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableNativeMap
class UpiAppDetectorModule(reactContext: ReactApplicationContext) :
  NativeUpiAppDetectorSpec(reactContext) {

  override fun checkAppsInstalled(packageNames: ReadableArray, promise: Promise) {
    val pm: PackageManager = reactApplicationContext.packageManager
    val result = WritableNativeMap()
    
    for (i in 0 until packageNames.size()) {
      val packageName = packageNames.getString(i)
      if (packageName != null) {
        try {
          pm.getPackageInfo(packageName, PackageManager.GET_ACTIVITIES)
          result.putBoolean(packageName, true)
        } catch (e: PackageManager.NameNotFoundException) {
          result.putBoolean(packageName, false)
        }
      }
    }
    
    promise.resolve(result)
  }

  companion object {
    const val NAME = NativeUpiAppDetectorSpec.NAME
  }
}
