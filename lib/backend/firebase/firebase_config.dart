import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';

Future initFirebase() async {
  if (kIsWeb) {
    await Firebase.initializeApp(
        options: const FirebaseOptions(
            apiKey: "AIzaSyBYP4DizB75Ba8rVV6tsMlSyUyweG3uX8c",
            authDomain: "csce3615.firebaseapp.com",
            projectId: "csce3615",
            storageBucket: "csce3615.appspot.com",
            messagingSenderId: "11904564618",
            appId: "1:11904564618:web:9c6876c350034fcf31dc73",
            measurementId: "G-3GBTS269TG"));
  } else {
    await Firebase.initializeApp();
  }
}
