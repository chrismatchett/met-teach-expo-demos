#!/bin/bash

path="/home/chris/code"

rm -Rf ${path}/pizza-app

npm install -g expo-cli
npm install -g yarn

cd $path 

expo init pizza-app --template expo-template-native-base

cd ${path}/pizza-app

yarn add @react-navigation/native
expo install react-native-screens react-native-safe-area-context
yarn add @react-navigation/native-stack

cp ${path}/installer/assets/pizza.jpg ${path}/pizza-app/assets/pizza.jpg
rm ${path}/pizza-app/App.js
cp ${path}/installer/assets/pizza-App.js ${path}/pizza-app/App.js



