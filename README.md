Change the "android:value" with your google maps api key.
Add the following line to your android/app/src/main/AndroidManifest.xml file inside the <application> tag:

<meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="YOUR API KEY"/>
