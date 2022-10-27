package com.daniyaltest;

import android.Manifest;
import android.os.Build;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;

import com.facebook.react.ReactActivity;
import com.google.android.material.snackbar.Snackbar;

public class MainActivity extends ReactActivity {

  private static final int MIC_PERMISSION_REQUEST_CODE = 1;
  private static final int PERMISSIONS_REQUEST_CODE = 100;

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {

    return "DaniyalTest";
  }



  private void requestPermissionForMicrophone() {
    if (ActivityCompat.shouldShowRequestPermissionRationale(this, Manifest.permission.RECORD_AUDIO)) {

    } else {
      ActivityCompat.requestPermissions(
              this,
              new String[]{Manifest.permission.RECORD_AUDIO},
              MIC_PERMISSION_REQUEST_CODE);
    }
  }

  @RequiresApi(api = Build.VERSION_CODES.M)
  private void requestPermissionForMicrophoneAndBluetooth() {
    {
      requestPermissions(
              new String[]{Manifest.permission.RECORD_AUDIO,
                      Manifest.permission.BLUETOOTH_CONNECT},
              PERMISSIONS_REQUEST_CODE);
    }
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
    /*
     * Check if required permissions are granted
     */
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {

      /*
       * Due to bluetooth permissions being requested at the same time as mic
       * permissions, AudioSwitch should be started after providing the user the option
       * to grant the necessary permissions for bluetooth.
       */


    }
  }

}
