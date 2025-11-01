import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
} from 'react-360';

export default class SpaceSceneVR extends React.Component {
  render() {
    return (
      <View>
        <Pano source={asset('textures/space.png')} />
        <Text
          style={{
            backgroundColor: '#777879',
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }}>
          Welcome to VR!
        </Text>
      </View>
    );
  }
};

AppRegistry.registerComponent('SpaceSceneVR', () => SpaceSceneVR);