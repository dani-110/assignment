package com.daniyaltest;

import static android.content.pm.PackageManager.PERMISSION_GRANTED;

import android.Manifest;
import android.content.Context;
import android.media.MediaPlayer;
import android.media.PlaybackParams;
import android.os.Build;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.material.snackbar.Snackbar;
import com.twilio.voice.Call;
import com.twilio.voice.CallException;
import com.twilio.voice.ConnectOptions;
import com.twilio.voice.Voice;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;


public class Bridge extends ReactContextBaseJavaModule {

    Context mContext;
    private static final String TAG = "ctivity";
    private Call activeCall;
    HashMap<String, String> params = new HashMap<>();
    Call.Listener callListener = callListener();

    Bridge(ReactApplicationContext context) {
        super(context);
        mContext= this.getReactApplicationContext();
    }

    @Override
    public String getName() {

        return "Bridge";

    }


    @ReactMethod
    public void sendCall(String number, Boolean shouldReact) {
        Log.d("Bridge", "Calling " + number + " with Recording status: " + shouldReact);

        ConnectCall(number);

    }
    public static boolean hasPermissions(Context context, String... permissions) {
        if (context != null && permissions != null) {
            for (String permission : permissions) {
                if (ActivityCompat.checkSelfPermission(context, permission) != PERMISSION_GRANTED) {
                    return false;
                }
            }
        }
        return true;
    }


    @ReactMethod
    public void setToken(String accessToken) {

        SingletonClass.getInstance().setAccessToken(accessToken);
        Log.d("Bridge", "Access Token is: "+ SingletonClass.getInstance().getAccessToken());
    }

    @ReactMethod
    public void testForEvent() {
        this.getReactApplicationContext().
                getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).
                emit("disconnect",null);
    }

    public void ConnectCall(String number){

        String accessToken = SingletonClass.getInstance().getAccessToken();
        params.put("to", number);
        ConnectOptions connectOptions = new ConnectOptions.Builder(accessToken)
                .params(params)
                .build();
        activeCall = Voice.connect(getReactApplicationContext(), connectOptions, callListener);

    }

    private Call.Listener callListener() {
        return new Call.Listener() {
            /*
             * This callback is emitted once before the Call.Listener.onConnected() callback when
             * the callee is being alerted of a Call. The behavior of this callback is determined by
             * the answerOnBridge flag provided in the Dial verb of your TwiML application
             * associated with this client. If the answerOnBridge flag is false, which is the
             * default, the Call.Listener.onConnected() callback will be emitted immediately after
             * Call.Listener.onRinging(). If the answerOnBridge flag is true, this will cause the
             * call to emit the onConnected callback only after the call is answered.
             * See answeronbridge for more details on how to use it with the Dial TwiML verb. If the
             * twiML response contains a Say verb, then the call will emit the
             * Call.Listener.onConnected callback immediately after Call.Listener.onRinging() is
             * raised, irrespective of the value of answerOnBridge being set to true or false
             */
            @Override
            public void onRinging(@NonNull Call call) {
                Log.d(TAG, "Ringing");
                /*
                 * When [answerOnBridge](https://www.twilio.com/docs/voice/twiml/dial#answeronbridge)
                 * is enabled in the <Dial> TwiML verb, the caller will not hear the ringback while
                 * the call is ringing and awaiting to be accepted on the callee's side. The application
                 * can use the `SoundPoolManager` to play custom audio files between the
                 * `Call.Listener.onRinging()` and the `Call.Listener.onConnected()` callbacks.
                 */
                if (BuildConfig.playCustomRingback) {
                    SoundPoolManager.getInstance(getReactApplicationContext()).playRinging();
                }
            }

            @Override
            public void onConnectFailure(@NonNull Call call, @NonNull CallException error) {
                //audioSwitch.deactivate();
                if (BuildConfig.playCustomRingback) {
                    SoundPoolManager.getInstance(getReactApplicationContext()).stopRinging();
                }
                Log.d(TAG, "Connect failure");
                String message = String.format(
                        Locale.US,
                        "Call Error: %d, %s",
                        error.getErrorCode(),
                        error.getMessage());
                Log.e(TAG, message);
                Toast.makeText(getReactApplicationContext(),message,Toast.LENGTH_LONG).show();
                //Snackbar.make(coordinatorLayout, message, Snackbar.LENGTH_LONG).show();
                //resetUI();
            }

            @Override
            public void onConnected(@NonNull Call call) {
                //audioSwitch.activate();
                if (BuildConfig.playCustomRingback) {
                    SoundPoolManager.getInstance(getReactApplicationContext()).stopRinging();
                }
                Log.d(TAG, "Connected");
                activeCall = call;
            }

            @Override
            public void onReconnecting(@NonNull Call call, @NonNull CallException callException) {
                //Log.d(TAG, "onReconnecting");
            }

            @Override
            public void onReconnected(@NonNull Call call) {
                Log.d(TAG, "onReconnected");
            }

            @Override
            public void onDisconnected(@NonNull Call call, CallException error) {
                //audioSwitch.deactivate();
                if (BuildConfig.playCustomRingback) {
                    SoundPoolManager.getInstance(getReactApplicationContext()).stopRinging();
                }
                Log.d(TAG, "Disconnected");

                if (error != null) {
                    String message = String.format(
                            Locale.US,
                            "Call Error: %d, %s",
                            error.getErrorCode(),
                            error.getMessage());
                    Log.e(TAG, message);
                    Toast.makeText(getReactApplicationContext(),message,Toast.LENGTH_LONG).show();
                    //Snackbar.make(coordinatorLayout, message, Snackbar.LENGTH_LONG).show();
                }
//                if (activeCall != null) {
//                    activeCall.disconnect();
//                    activeCall = null;
//                }
                getReactApplicationContext().
                        getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).
                        emit("disconnect",null);

                //resetUI();
            }
            /*
             * currentWarnings: existing quality warnings that have not been cleared yet
             * previousWarnings: last set of warnings prior to receiving this callback
             *
             * Example:
             *   - currentWarnings: { A, B }
             *   - previousWarnings: { B, C }
             *
             * Newly raised warnings = currentWarnings - intersection = { A }
             * Newly cleared warnings = previousWarnings - intersection = { C }
             */
            public void onCallQualityWarningsChanged(@NonNull Call call,
                                                     @NonNull Set<Call.CallQualityWarning> currentWarnings,
                                                     @NonNull Set<Call.CallQualityWarning> previousWarnings) {

                if (previousWarnings.size() > 1) {
                    Set<Call.CallQualityWarning> intersection = new HashSet<>(currentWarnings);
                    currentWarnings.removeAll(previousWarnings);
                    intersection.retainAll(previousWarnings);
                    previousWarnings.removeAll(intersection);
                }

                String message = String.format(
                        Locale.US,
                        "Newly raised warnings: " + currentWarnings + " Clear warnings " + previousWarnings);
                Log.e(TAG, message);
                Toast.makeText(getReactApplicationContext(),message,Toast.LENGTH_LONG).show();
                //Snackbar.make(coordinatorLayout, message, Snackbar.LENGTH_LONG).show();
            }
        };
    }

}
