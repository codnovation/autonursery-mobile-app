import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Image, StyleSheet } from'react-native';


const WIDTH = Dimensions.get('window').width;

export class GalleryImage extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
    return (
        <Image
          source={this.props.imagesource}
          style={styles.image}
        />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
  }
});
