// components/BottomCurve.tsx
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const BottomCurve = () => {
return <View style={styles.curve} />;
};

const styles = StyleSheet.create({
curve: {
position: 'absolute',
backgroundColor: 'white',
width: 750,
height: 900,
borderRadius: 700,
top: Dimensions.get('window').height - 400, 
right: -350, // curvatura pro lado direito
zIndex: 1, //deixa a curva pra baixo dos botões
},
});

export default BottomCurve;