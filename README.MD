# App Device Integrity Server
<a href="https://discord.gg/8GEp4dgM"><img src="https://img.shields.io/discord/765557403865186374.svg?logo=discord&color=blue" alt="Discord"></a>

<a align="center" href="https://www.buymeacoffee.com/erluan" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" height="50" width="183"></a>

<hr>
<hr>

This is the App Device Integrity Server. It can be used in conjunction with the [App Device Integrity](https://pub.dev/packages/app_device_integrity) for Flutter.

Note that this project is intended to be a reference on how we can implement this anti-fraud feature on the server side.</br>
For Apple App Attest, I have used the [appattest-checker-node](https://github.com/srinivas1729/appattest-checker-node) package, but feel free to adapt and use another one, like the [node-app-attest](https://github.com/uebelack/node-app-attest)


Here is an example of how we can make a post request data body after we receive the attestationToken and keyId on iOS:

```
{
    "challenge" : "challenge_generated_by_server",
    "attestToken" : "attest_token_in_base64_format",
    "platform" : "IOS",
    "keyId" : "keyid_from_app_attest"
}
```

It is recommended as a good practice to use a database like MongoDB to store challenges and, mainly, keyIds from iOS devices, to improve fraud attempts.
