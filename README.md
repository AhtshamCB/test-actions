# TeeFi App

## Installation

### Clone this repo

```
git clone https://github.com/TeeFuture/teefi-mobile.git
```

### Open project folder and install dependencies

```
cd teefi-mobile
yarn

cd ios
pod install
```

### Run the project

```
yarn android:dev
```

or

```
yarn ios:dev
```

### ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types

```
check if you have installed deprecated-react-native-prop-types package if not run the below command first.

1. yarn add deprecated-react-native-prop-types
inside node_modules/react-native/index.js

2. replace these functions with the below lines

// Deprecated Prop Types
get ColorPropType(): $FlowFixMe {
  return require('deprecated-react-native-prop-types').ColorPropType;
},

get EdgeInsetsPropType(): $FlowFixMe {
  return require('deprecated-react-native-prop-types').EdgeInsetsPropType;
},

get PointPropType(): $FlowFixMe {
  return require('deprecated-react-native-prop-types').PointPropType;
},

get ViewPropTypes(): $FlowFixMe {
  return require('deprecated-react-native-prop-types').ViewPropTypes;
},

3. Save and run npx patch-package react-native to save the patch.

4. Rebuild and the app should launch.

```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
